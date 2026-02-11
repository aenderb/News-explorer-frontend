import { useContext } from "react";
import SavedNewsHeader from "./SavedNewsHeader";
import NewsCard from "../NewsCard/NewsCard";
import CurrentUserContext from "../contexts/CurrentUserContext";
import type { ArticleData } from "../../utils/MainApi";

interface SavedNewsProps {
  handleLogout?: () => void;
  handleSigninClick?: () => void;
  isLoggedIn?: boolean;
  savedArticles?: ArticleData[];
  onDeleteArticle?: (articleId: string) => void;
}

function SavedNews({
  handleLogout,
  handleSigninClick,
  isLoggedIn,
  savedArticles = [],
  onDeleteArticle,
}: SavedNewsProps) {
  const { currentUser } = useContext(CurrentUserContext);

  const keywords = [...new Set(savedArticles.map((a) => a.keyword))];

  return (
    <div className="min-h-screen bg-[#F5F6F7]">
      <SavedNewsHeader
        handleLogout={handleLogout}
        handleSigninClick={handleSigninClick}
        isLoggedIn={isLoggedIn}
        savedArticlesCount={savedArticles.length}
        keywords={keywords}
        userName={currentUser?.name}
      />
      <div className="max-w-container mx-auto px-4 md:px-10 lg:px-[104px] py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {savedArticles.map((article) => (
            <NewsCard
              key={article._id}
              article={{
                url: article.link,
                urlToImage: article.image,
                title: article.title,
                description: article.text,
                publishedAt: article.date,
                source: { id: null, name: article.source },
                author: null,
                content: article.text,
                keyword: article.keyword,
                _id: article._id,
              }}
              isLoggedIn={isLoggedIn}
              isSavedPage={true}
              onDeleteArticle={() => onDeleteArticle?.(article._id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SavedNews;
