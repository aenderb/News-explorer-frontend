import { useState, useEffect, useCallback } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import LoginPopup from "../LoginPopup/LoginPopup";
import RegisterPopup from "../RegisterPopup/RegisterPopup";
import SuccessRegisterPopup from "../SuccessRegisterPopup/SuccessRegisterPopup";
import SavedNews from "../SavedNews/SavedNews";
import CurrentUserContext from "../contexts/CurrentUserContext";
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

const PAGE_SIZE = 3;
const MAX_PAGES_PER_CLICK = 3;

function App() {
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [savedArticles, setSavedArticles] = useState<ArticleData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
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

  const loadChunk = (
    query: string,
    startPage: number,
    existing: Article[],
    existingTotal: number
  ): Promise<{ combined: Article[]; page: number; total: number }> => {
    let page = startPage;
    let total = existingTotal;
    const combined = [...existing];
    const seen = new Set(existing.map((article) => article.url));
    let added = 0;
    let pagesFetched = 0;

    const fetchNext = (): Promise<{ combined: Article[]; page: number; total: number }> => {
      if (added >= PAGE_SIZE || pagesFetched >= MAX_PAGES_PER_CLICK) {
        return Promise.resolve({ combined, page, total });
      }
      if (total !== 0 && combined.length >= total) {
        return Promise.resolve({ combined, page, total });
      }

      return searchNews(query, page, PAGE_SIZE).then((data) => {
        pagesFetched += 1;
        total = data.totalResults;

        if (data.articles.length === 0) {
          return { combined, page, total };
        }

        for (const article of data.articles) {
          if (!seen.has(article.url)) {
            combined.push(article);
            seen.add(article.url);
            added += 1;
            if (added >= PAGE_SIZE) break;
          }
        }

        if (added < PAGE_SIZE) {
          page += 1;
        }

        return fetchNext();
      });
    };

    return fetchNext();
  };
  
  const handleSigninClick = () => {
    setAuthError("");
    setIsLoginPopupOpen(true);
  };

  const handleGoHome = () => {
    setArticles([]);
    setHasSearched(false);
    setHasError(false);
    setErrorMessage("");
    setTotalResults(0);
    setCurrentPage(1);
    setCurrentQuery("");
    setIsLoading(false);
    setIsLoadingMore(false);
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
    setIsLoadingMore(false);
    setCurrentQuery(query);
    setCurrentPage(1);
    setArticles([]);

    loadChunk(query, 1, [], 0)
      .then((filled) => {
        setArticles(filled.combined);
        setTotalResults(filled.total);
        setCurrentPage(filled.page);
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
    if (isLoadingMore || !currentQuery) return;
    setIsLoadingMore(true);
    const nextPage = currentPage + 1;

    loadChunk(currentQuery, nextPage, articles, totalResults)
      .then((filled) => {
        setArticles(filled.combined);
        setCurrentPage(filled.page);
        setTotalResults(filled.total);
      })
      .catch((error) => {
        const message = error instanceof Error ? error.message : "Erro ao carregar mais noticias.";
        setHasError(true);
        setErrorMessage(message);
      })
      .finally(() => {
        setIsLoadingMore(false);
      });
  };

  const hasMore = articles.length < totalResults;
  
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
                showingSavedArticles={false}
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
                isLoadingMore={isLoadingMore}
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
      <LoginPopup 
        isOpen={isLoginPopupOpen} 
        onClose={handleClosePopup}
        onLogin={handleLogin}
        onSwitchToRegister={handleOpenRegister}
        errorMessage={authError}
      />
      <RegisterPopup
        isOpen={isRegisterPopupOpen}
        onClose={handleClosePopup}
        onSwitchToLogin={handleOpenLogin}
        onRegister={handleRegister}
        errorMessage={authError}
      />
      <SuccessRegisterPopup
        isOpen={isSuccessPopupOpen}
        onClose={handleClosePopup}
        onGoToLogin={handleOpenLogin}
      />
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
