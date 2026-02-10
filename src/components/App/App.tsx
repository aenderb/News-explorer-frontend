import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import LoginPopup from "../LoginPopup/LoginPopup";
import RegisterPopup from "../RegisterPopup/RegisterPopup";
import SuccessRegisterPopup from "../SuccessRegisterPopup/SuccessRegisterPopup";
import SavedNews from "../SavedNews/SavedNews";
import searchNews, { Article } from "../../utils/ThirdPartyApi";

const PAGE_SIZE = 3;
const MAX_PAGES_PER_CLICK = 3;

function App() {
  const isLoggedIn = false; // somente para mockar estado de login - substituir por estado real
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentQuery, setCurrentQuery] = useState("");

  const loadChunk = async (
    query: string,
    startPage: number,
    existing: Article[],
    existingTotal: number
  ) => {
    let page = startPage;
    let total = existingTotal;
    const combined = [...existing];
    const seen = new Set(existing.map((article) => article.url));
    let added = 0;
    let pagesFetched = 0;

    while (added < PAGE_SIZE && (total === 0 || combined.length < total)) {
      if (pagesFetched >= MAX_PAGES_PER_CLICK) {
        break;
      }
      const data = await searchNews(query, page, PAGE_SIZE);
      pagesFetched += 1;
      total = data.totalResults;

      if (data.articles.length === 0) {
        break;
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
    }

    return { combined, page, total };
  };
  
  const handleSigninClick = () => {
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
    setIsLoginPopupOpen(false);
    setIsRegisterPopupOpen(true);
  };

  const handleOpenLogin = () => {
    setIsRegisterPopupOpen(false);
    setIsLoginPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsLoginPopupOpen(false);
    setIsRegisterPopupOpen(false);
    setIsSuccessPopupOpen(false);
  };

  const handleLogin = (email: string, password: string) => {
    console.log("Login:", email, password);
    setIsLoginPopupOpen(false);
  };

  const handleRegister = (email: string, password: string, username: string) => {
    console.log("Register:", email, password, username);
    setIsRegisterPopupOpen(false);
    setIsSuccessPopupOpen(true);
  };

  const handleSearch = async (query: string) => {
    try {
      setHasSearched(true);
      setHasError(false);
      setErrorMessage("");
      setIsLoading(true);
      setIsLoadingMore(false);
      setCurrentQuery(query);
      setCurrentPage(1);
      setArticles([]);
      const filled = await loadChunk(query, 1, [], 0);
      setArticles(filled.combined);
      setTotalResults(filled.total);
      setCurrentPage(filled.page);
      console.log('Artigos encontrados:', filled.combined.length);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erro ao buscar noticias.";
      setHasError(true);
      setErrorMessage(message);
      console.error('Erro ao buscar notícias:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = async () => {
    try {
      if (isLoadingMore || !currentQuery) return;
      setIsLoadingMore(true);
      const nextPage = currentPage + 1;
      const filled = await loadChunk(currentQuery, nextPage, articles, totalResults);
      setArticles(filled.combined);
      setCurrentPage(filled.page);
      setTotalResults(filled.total);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erro ao carregar mais noticias.";
      setHasError(true);
      setErrorMessage(message);
      console.error('Erro ao carregar mais notícias:', error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const hasMore = articles.length < totalResults;
  
  return (
    <div className="page">
      <Routes>
        <Route 
          path="/" 
          element={
            <>
              <Header 
                isLoggedIn={isLoggedIn} 
                handleSigninClick={handleSigninClick}
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
      />
      <RegisterPopup
        isOpen={isRegisterPopupOpen}
        onClose={handleClosePopup}
        onSwitchToLogin={handleOpenLogin}
        onRegister={handleRegister}
      />
      <SuccessRegisterPopup
        isOpen={isSuccessPopupOpen}
        onClose={handleClosePopup}
        onGoToLogin={handleOpenLogin}
      />
    </div>
  );
}

export default App;
