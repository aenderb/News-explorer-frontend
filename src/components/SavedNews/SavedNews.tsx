import SavedNewsHeader from "./SavedNewsHeader";
import NewsCard from "../NewsCard/NewsCard";
import imageGridExample from "../../images/image_grid_example.png";

interface SavedNewsProps {
  handleLogout?: () => void;
  handleSigninClick?: () => void;
  isLoggedIn?: boolean;
}

function SavedNews({
  handleLogout,
  handleSigninClick,
  isLoggedIn,
}: SavedNewsProps) {
  // Dados mockados - substituir por dados reais da API
  const savedArticlesCount = 3;
  const keywords = ["Natureza", "Yellowstone", "Lago"];

  const savedArticles = [
    {
      url: "https://example.com/article-1",
      urlToImage: imageGridExample,
      title: "Primeiro artigo salvo sobre natureza",
      keyword: "Natureza"
    },
    {
      url: "https://example.com/article-2",
      urlToImage: imageGridExample,
      title: "Segundo artigo sobre Yellowstone",
      keyword: "Yellowstone"
    },
    {
      url: "https://example.com/article-3",
      urlToImage: imageGridExample,
      title: "Terceiro artigo sobre lagos",
      keyword: "Lago"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5F6F7]">
      <SavedNewsHeader
        handleLogout={handleLogout}
        handleSigninClick={handleSigninClick}
        isLoggedIn={isLoggedIn}
        savedArticlesCount={savedArticlesCount}
        keywords={keywords}
      />
      <div className="max-w-container mx-auto px-4 md:px-10 lg:px-[104px] py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {savedArticles.map((article) => (
            <NewsCard 
              key={article.url} 
              article={article} 
              isLoggedIn={isLoggedIn}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SavedNews;
