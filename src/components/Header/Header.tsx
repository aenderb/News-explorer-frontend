import Navigation from "../Navigation/Navigation";
import SearchForm from "../SearchForm/SearchForm";

interface HeaderProps {
  onSearch: (query: string) => void;
  handleLogout: () => void;
  handleSigninClick: () => void;
  isLoggedIn: boolean;
  onHomeClick: () => void;
}

function Header({ onSearch, handleLogout, handleSigninClick, isLoggedIn, onHomeClick }: HeaderProps) {
  
  return (
    <div className="max-w-container w-full mx-auto bg-[url('/src/images/background-image.png')] bg-no-repeat bg-center bg-cover">
      <Navigation 
        isLoggedIn={isLoggedIn} 
        variant="default" 
        handleSigninClick={handleSigninClick}
        handleLogout={handleLogout}
        onHomeClick={onHomeClick}
      />
      <div className="w-full max-w-[701px] flex flex-col mx-auto px-4 md:px-10 lg:px-0">
        <h1 className="max-w-full font-roboto-slab font-normal text-[36px] leading-[40px] md:text-[48px] md:leading-[52px] lg:text-[60px] lg:leading-[64px] text-white m-0 pt-10 md:pt-20">
          O que está
          <br />
          acontecendo no mundo?
        </h1>
        <h2 className="w-full m-0 mt-6 md:mt-8 font-roboto font-normal text-base md:text-xl leading-6 text-white">
          Encontre as últimas notícias sobre qualquer tema e salve elas em sua
          conta <br /> pessoal
        </h2>
        <SearchForm onSearch={onSearch} />
      </div>
    </div>
  );
}

export default Header;
