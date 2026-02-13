import { useState, useEffect, useCallback } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import LoginPopup from "../LoginPopup/LoginPopup";
import RegisterPopup from "../RegisterPopup/RegisterPopup";
import SuccessRegisterPopup from "../SuccessRegisterPopup/SuccessRegisterPopup";
import SavedNews from "../SavedNews/SavedNews";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import searchNews, { Article } from "../../utils/ThirdPartyApi";
import {
  signup,
  signin,
  signout,
  getUserInfo,
  getSavedArticles,
  saveArticle,
  deleteArticle,
} from "../../utils/MainApi";
import type { UserData, ArticleData } from "../../utils/MainApi";

const CARDS_PER_PAGE = 3;

function App() {
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [visibleCount, setVisibleCount] = useState(CARDS_PER_PAGE);
  const [savedArticles, setSavedArticles] = useState<ArticleData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentQuery, setCurrentQuery] = useState("");
  const [authError, setAuthError] = useState("");

  // ─── Verificar sessão ao montar (cookie httpOnly) ───
  useEffect(() => {
    getUserInfo()
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .catch(() => {
        // Cookie ausente ou expirado — usuário não logado
      });
  }, []);

  // ─── Carregar artigos salvos quando logado ───
  const fetchSavedArticles = useCallback(() => {
    getSavedArticles()
      .then((articles) => setSavedArticles(articles))
      .catch((err) => console.error("Erro ao buscar artigos salvos:", err));
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      fetchSavedArticles();
    } else {
      setSavedArticles([]);
    }
  }, [isLoggedIn, fetchSavedArticles]);


  
  const handleSigninClick = () => {
    setAuthError("");
    setIsLoginPopupOpen(true);
  };

  const handleGoHome = () => {
    setAllArticles([]);
    setVisibleCount(CARDS_PER_PAGE);
    setHasSearched(false);
    setHasError(false);
    setErrorMessage("");
    setCurrentQuery("");
    setIsLoading(false);
  };

  const handleOpenRegister = () => {
    setAuthError("");
    setIsLoginPopupOpen(false);
    setIsRegisterPopupOpen(true);
  };

  const handleOpenLogin = () => {
    setAuthError("");
    setIsRegisterPopupOpen(false);
    setIsLoginPopupOpen(true);
  };

  const handleClosePopup = () => {
    setAuthError("");
    setIsLoginPopupOpen(false);
    setIsRegisterPopupOpen(false);
    setIsSuccessPopupOpen(false);
  };

  const handleLogin = (email: string, password: string) => {
    setAuthError("");
    signin(email, password)
      .then(() => getUserInfo())
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        setIsLoginPopupOpen(false);
      })
      .catch((err) => {
        setAuthError(err.message || "Erro ao fazer login.");
      });
  };

  const handleRegister = (email: string, password: string, username: string) => {
    setAuthError("");
    signup(email, password, username)
      .then(() => {
        setIsRegisterPopupOpen(false);
        setIsSuccessPopupOpen(true);
      })
      .catch((err) => {
        setAuthError(err.message || "Erro ao cadastrar.");
      });
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    signout()
      .catch(() => {})
      .finally(() => {
        setCurrentUser(null);
        setIsLoggedIn(false);
        setSavedArticles([]);
        navigate("/");
      });
  };

  const handleSaveArticle = (article: Article) => {
    if (!isLoggedIn) return;
    saveArticle({
      keyword: currentQuery || "geral",
      title: article.title || "Sem título",
      text: article.description || article.content || "Sem descrição",
      date: article.publishedAt || new Date().toISOString(),
      source: article.source?.name || "Desconhecido",
      link: article.url,
      image: article.urlToImage || "",
    })
      .then((saved) => {
        setSavedArticles((prev) => [...prev, saved]);
      })
      .catch((err) => console.error("Erro ao salvar artigo:", err));
  };

  const handleDeleteArticle = (articleId: string) => {
    if (!isLoggedIn) return;
    deleteArticle(articleId)
      .then(() => {
        setSavedArticles((prev) => prev.filter((a) => a._id !== articleId));
      })
      .catch((err) => console.error("Erro ao remover artigo:", err));
  };

  const handleSearch = (query: string) => {
    setHasSearched(true);
    setHasError(false);
    setErrorMessage("");
    setIsLoading(true);
    setCurrentQuery(query);
    setAllArticles([]);
    setVisibleCount(CARDS_PER_PAGE);

    searchNews(query)
      .then((data) => {
        setAllArticles(data.articles);
      })
      .catch((error) => {
        const message = error instanceof Error ? error.message : "Erro ao buscar noticias.";
        setHasError(true);
        setErrorMessage(message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + CARDS_PER_PAGE);
  };

  const articles = allArticles.slice(0, visibleCount);
  const hasMore = visibleCount < allArticles.length;
  
  return (
    <CurrentUserContext.Provider value={{ currentUser, isLoggedIn }}>
    <div className="page">
      <Routes>
        <Route 
          path="/" 
          element={
            <>
              <Header 
                isLoggedIn={isLoggedIn} 
                handleSigninClick={handleSigninClick}
                handleLogout={handleLogout}
                onSearch={handleSearch}
                onHomeClick={handleGoHome}
              />
              <Main 
                isLoggedIn={isLoggedIn}
                showingSavedArticles={false}
                articles={articles}
                isLoading={isLoading}
                hasSearched={hasSearched}
                hasMore={hasMore}
                onLoadMore={handleLoadMore}
                hasError={hasError}
                errorMessage={errorMessage}
                savedArticles={savedArticles}
                onSaveArticle={handleSaveArticle}
                onDeleteArticle={handleDeleteArticle}
              />
            </>
          } 
        />
        <Route 
          path="/saved-news" 
          element={
            <>
              <SavedNews
                isLoggedIn={isLoggedIn}
                handleSigninClick={handleSigninClick}
                handleLogout={handleLogout}
                savedArticles={savedArticles}
                onDeleteArticle={handleDeleteArticle}
              />
            </>
          } 
        />
      </Routes>
      <Footer />
      {isLoginPopupOpen && (
        <LoginPopup 
          isOpen={isLoginPopupOpen} 
          onClose={handleClosePopup}
          onLogin={handleLogin}
          onSwitchToRegister={handleOpenRegister}
          errorMessage={authError}
        />
      )}
      {isRegisterPopupOpen && (
        <RegisterPopup
          isOpen={isRegisterPopupOpen}
          onClose={handleClosePopup}
          onSwitchToLogin={handleOpenLogin}
          onRegister={handleRegister}
          errorMessage={authError}
        />
      )}
      {isSuccessPopupOpen && (
        <SuccessRegisterPopup
          isOpen={isSuccessPopupOpen}
          onClose={handleClosePopup}
          onGoToLogin={handleOpenLogin}
        />
      )}
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
