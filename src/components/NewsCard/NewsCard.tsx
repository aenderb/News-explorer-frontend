import { useState } from "react";

import deleteButtonDefault from "../../images/trash.svg";
import deleteButtonHover from "../../images/trash-hover.svg";
import bookmarknormal from "../../images/bookmark.svg";
import bookmarkhover from "../../images/bookmark-hover.svg";
import bookmarkBlue from "../../images/bookmark-blue.svg";

interface NewsCardArticle {
  title: string;
  description?: string;
  content?: string;
  url: string;
  urlToImage?: string;
  image?: string;
  publishedAt?: string;
  source?: { id: string | null; name: string };
  author?: string | null;
  keyword?: string;
  _id?: string;
}

interface NewsCardProps {
  article: NewsCardArticle;
  isLoggedIn: boolean;
  isSavedPage?: boolean;
  isSaved?: boolean;
  onSaveArticle?: () => void;
  onDeleteArticle?: () => void;
}

function NewsCard({
  article,
  isLoggedIn,
  isSavedPage = false,
  isSaved = false,
  onSaveArticle,
  onDeleteArticle,
}: NewsCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isDeleteHovered, setIsDeleteHovered] = useState(false);

  // Formatar data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const handleBookmarkClick = () => {
    if (!isLoggedIn) return;
    if (isSaved) {
      onDeleteArticle?.();
    } else {
      onSaveArticle?.();
    }
  };

  return (
    <article className="relative flex flex-col bg-white rounded-2xl h-full">
      <img
        src={article.urlToImage || article.image || ''}
        alt={article.title}
        className="w-full h-[196px] md:h-[272px] object-cover rounded-t-2xl bg-[#f5f6f7]"
        onError={(e) => {
          e.currentTarget.src = '';
          e.currentTarget.alt = 'Imagem indisponível';
        }}
      />
      <div className="p-4 md:p-6 flex-1 flex flex-col">
        <p className="font-roboto font-normal text-base md:text-lg leading-6 text-[#b6bcbf] m-0 mb-3">
          {article.publishedAt ? formatDate(article.publishedAt) : ''}
        </p>
        <h3 className="font-roboto-slab text-[22px] md:text-[26px] leading-[26px] md:leading-[30px] text-[#1a1b22] m-0 mb-4 md:mb-5 overflow-hidden line-clamp-3">
          {article.title}
        </h3>
        <p className="font-roboto font-normal text-sm md:text-base leading-[20px] md:leading-[22px] text-[#1a1b22] m-0 mb-4 md:mb-[18px] overflow-hidden line-clamp-4">
          {article.description || article.content || ''}
        </p>
        <p className="font-roboto-slab font-bold text-sm md:text-base leading-5 uppercase text-[#b6bcbf] overflow-hidden text-ellipsis m-0 mt-auto">
          {article.source?.name || article.author || ''}
        </p>

        {isSavedPage ? (
          <>
            <p className="absolute top-[10px] left-[10px] py-[11px] px-5 m-0 text-sm font-roboto font-medium rounded-2xl bg-white text-black">
              {article.keyword}
            </p>
            <button
              onMouseEnter={() => setIsDeleteHovered(true)}
              onMouseLeave={() => setIsDeleteHovered(false)}
              onClick={onDeleteArticle}
              className="absolute top-[10px] right-[10px] bg-white border-none w-10 h-10 rounded-lg flex items-center justify-center cursor-pointer"
            >
              <img
                className="cursor-pointer"
                src={isDeleteHovered ? deleteButtonHover : deleteButtonDefault}
                alt="Remover artigo"
              />
              {isDeleteHovered && (
                <span className="absolute top-0 right-[50px] py-[11px] px-5 text-xs font-roboto font-medium rounded-2xl w-[182px] bg-white transition-opacity duration-600 z-10">
                  Remover artigo salvo
                </span>
              )}
            </button>
          </>
        ) : (
          <button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleBookmarkClick}
            className="absolute top-[10px] right-[10px] bg-white border-none w-10 h-10 rounded-lg flex items-center justify-center cursor-pointer disabled:cursor-not-allowed"
          >
            <img
              className="cursor-pointer"
              src={isSaved ? bookmarkBlue : isHovered ? bookmarkhover : bookmarknormal}
              alt="Salvar artigo"
            />
            {isHovered && !isLoggedIn && (
              <span className="absolute top-0 right-[45px] w-40 h-10 flex items-center px-4 text-xs font-roboto font-medium text-left rounded-lg bg-white shadow-md z-10">
                Faça o login para salvar
              </span>
            )}
          </button>
        )}
      </div>
    </article>
  );
};

export default NewsCard;