import About from "../About/About";
import ApiError from "../ApiError/ApiError";
import NewsCardList from "../NewsCardList/NewsCardList";
import NotFound from "../NotFound/NotFound";
import Preloader from "../Preloader/Preloader";
import { Article } from "../../utils/ThirdPartyApi";

interface MainProps {
  isLoggedIn?: boolean;
  showingSavedArticles?: boolean;
  articles?: Article[];
  isLoading?: boolean;
  hasSearched?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
  isLoadingMore?: boolean;
  hasError?: boolean;
  errorMessage?: string;
}

function Main({
  isLoggedIn,
  showingSavedArticles,
  articles,
  isLoading,
  hasSearched,
  hasMore,
  onLoadMore,
  isLoadingMore,
  hasError,
  errorMessage,
}: MainProps) {
  const hasArticles = Boolean(articles && articles.length > 0);
  const showNotFound = Boolean(hasSearched && !isLoading && !hasArticles && !showingSavedArticles);
  const showInitialLoader = Boolean(isLoading && !hasArticles && !showingSavedArticles);
  const showError = Boolean(hasError && !showingSavedArticles);
  
  return (
    <main >
      <section>
        {/* Mostra Preloader durante o carregamento */}
        {showInitialLoader && <Preloader />}

        {showError && <ApiError message={errorMessage} />}
        
        {/* Mostra NewsGrid quando tem artigos OU está na página de Artigos Salvos */}
        {(hasArticles || showingSavedArticles) && (
          <NewsCardList
            isLoggedIn={isLoggedIn}
            articles={articles}
            hasMore={hasMore}
            onLoadMore={onLoadMore}
            isLoadingMore={isLoadingMore}
          />
        )}

        {showNotFound && !showError && <NotFound />}
        
        {/* Mostra About sempre que não estiver na página de artigos salvos */}
        {!showingSavedArticles && <About />}
      </section>
    </main>
  );
}

export default Main;
