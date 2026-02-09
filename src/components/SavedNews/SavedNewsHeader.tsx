import Navigation from "../Navigation/Navigation";

interface SavedNewsHeaderProps {
  handleLogout?: () => void;
  handleSigninClick?: () => void;
  isLoggedIn?: boolean;
  savedArticlesCount?: number;
  keywords?: string[];
}

function SavedNewsHeader({
  handleLogout,
  handleSigninClick,
  isLoggedIn,
  savedArticlesCount = 0,
  keywords = [],
}: SavedNewsHeaderProps) {
  const getKeywordsText = () => {
    if (keywords.length === 0) return "";
    if (keywords.length === 1) return keywords[0];
    if (keywords.length === 2) return `${keywords[0]} e ${keywords[1]}`;
    return `${keywords[0]}, ${keywords[1]} e ${keywords.length - 2} outros`;
  };

  return (
    <div className="max-w-container w-full mx-auto bg-white">
      <Navigation isLoggedIn={isLoggedIn} variant="saved" />
      <div className="w-full px-4 md:px-10 lg:px-[104px] pt-8 md:pt-10 pb-10 md:pb-[60px]">
        <p className="font-roboto text-[#1a1b22]/50 text-base md:text-lg leading-6 m-0 mb-6 md:mb-[29px]">
          Artigos salvos
        </p>
        <h1 className="font-roboto-slab font-normal text-[32px] md:text-[40px] leading-[36px] md:leading-[46px] text-[#1a1b22] m-0 mb-6 md:mb-[30px]">
          {isLoggedIn ? "Elise" : "Visitante"}, você tem {savedArticlesCount}{" "}
          artigos salvos
        </h1>
        {keywords.length > 0 && (
          <p className="font-roboto text-base md:text-lg leading-6 text-[#1a1b22] m-0">
            Por palavras-chave:{" "}
            <span className="font-bold">{getKeywordsText()}</span>
          </p>
        )}
      </div>
    </div>
  );
}

export default SavedNewsHeader;
