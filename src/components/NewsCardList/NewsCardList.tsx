
import NewsCard from "../NewsCard/NewsCard";
import { Article } from "../../utils/ThirdPartyApi";
import type { ArticleData } from "../../utils/MainApi";

interface NewsCardListProps {
  isLoggedIn?: boolean;
  articles?: Article[];
  hasMore?: boolean;
  onLoadMore?: () => void;
  savedArticles?: ArticleData[];
  onSaveArticle?: (article: Article) => void;
  onDeleteArticle?: (articleId: string) => void;
}

function NewsCardList({
  isLoggedIn = false,
  articles = [],
  hasMore = false,
  onLoadMore,
  savedArticles = [],
  onSaveArticle,
  onDeleteArticle,
}: NewsCardListProps) {

  const findSavedArticle = (article: Article): ArticleData | undefined => {
    return savedArticles.find((saved) => saved.link === article.url);
  };
  return (
    <section className="mx-auto py-12 md:py-20 px-4 md:px-10 lg:px-[104px] bg-[#f5f6f7] max-w-container">
      <h2 className="font-roboto-slab text-[28px] leading-[32px] md:text-[40px] md:leading-[46px] font-normal text-[#1a1b22] m-0 mb-8 md:mb-16">
        Procurar Resultados
      </h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 list-none m-0 p-0">
        {articles.map((article, index) => {
          const savedVersion = findSavedArticle(article);
          return (
            <li key={`${article.url}-${article.publishedAt}-${index}`}>
              <NewsCard 
                article={article} 
                isLoggedIn={isLoggedIn}
                isSaved={Boolean(savedVersion)}
                onSaveArticle={() => onSaveArticle?.(article)}
                onDeleteArticle={() => savedVersion && onDeleteArticle?.(savedVersion._id)}
              />
            </li>
          );
        })}
      </ul>
        
     
      {hasMore && onLoadMore && (
        <div className="text-center">
          <button 
            onClick={onLoadMore} 
            className="font-roboto font-medium text-base md:text-lg leading-6 text-[#1a1b22] py-4 md:py-5 px-10 md:px-[99px] bg-[#e8e8e8] border-none rounded-[80px] mt-10 md:mt-14 hover:bg-white cursor-pointer transition-colors"
          >
            Mostrar mais
          </button>
        </div>
      )}
    </section>
  );
};

export default NewsCardList;