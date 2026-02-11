import Navigation from "../Navigation/Navigation";
import SearchForm from "../SeacrhForm/SearchForm";

interface HeaderProps {
  onSearch?: (query: string) => void;
  handleLogout?: () => void;
  handleSigninClick?: () => void;
  isLoggedIn?: boolean;
  variant?: 'default' | 'saved';
  showingSavedArticles?: boolean;
  onHomeClick?: () => void;
}

function Header({ onSearch, handleLogout, handleSigninClick, isLoggedIn, variant = 'default', showingSavedArticles, onHomeClick }: HeaderProps) {
  
  // Se não está logado, ignora showingSavedArticles
  const isShowingSaved = isLoggedIn && showingSavedArticles;
  
  const effectiveVariant = isShowingSaved ? 'saved' : (isLoggedIn ? 'default' : variant);
  
  const bgClass = isShowingSaved
    ? "bg-white" 
    : "bg-[url('/src/images/background-image.png')] bg-no-repeat bg-center bg-cover";
  const textColor = isShowingSaved ? "text-[#1A1B22]" : "text-white";
  
  return (
    <div className={`max-w-container w-full mx-auto ${bgClass}`}>
      <Navigation 
        isLoggedIn={isLoggedIn} 
        variant={effectiveVariant} 
        handleSigninClick={handleSigninClick}
        handleLogout={handleLogout}
        onHomeClick={onHomeClick}
      />
      {!isShowingSaved ? (
        <div className="w-full max-w-[701px] flex flex-col mx-auto px-4 md:px-10 lg:px-0">
          <h1 className={`max-w-full font-roboto-slab font-normal text-[36px] leading-[40px] md:text-[48px] md:leading-[52px] lg:text-[60px] lg:leading-[64px] ${textColor} m-0 pt-10 md:pt-20`}>
            O que está
            <br />
            acontecendo no mundo?
          </h1>
          <h2 className={`w-full m-0 mt-6 md:mt-8 font-roboto font-normal text-base md:text-xl leading-6 ${textColor}`}>
            Encontre as últimas notícias sobre qualquer tema e salve elas em sua
            conta <br /> pessoal
          </h2>
          <SearchForm onSearch={onSearch} />
        </div>
      ) : (
        <div className="w-full max-w-container flex flex-col px-4 md:px-10 lg:px-[104px]">
          <p className="font-roboto font-normal mt-8 md:mt-10 text-base md:text-lg leading-6 text-[#1A1B22]/50">Artigos Salvos</p>
          <h2 className={`max-w-[530px] mt-6 md:mt-8 font-roboto-slab font-normal text-[32px] leading-[36px] md:text-[40px] md:leading-[46px] ${textColor} m-0`}>
            Elise, você tem 5 artigos salvos
          </h2>
          <h3 className={`w-full m-0 mt-6 md:mt-8 mb-10 md:mb-14 font-roboto font-normal text-base md:text-xl leading-6 ${textColor}`}>
            Por palavras-chave: Natureza, Yellowstone, e 2 outras
          </h3>
  
        </div>
      )}
    </div>
  );
}

export default Header;
