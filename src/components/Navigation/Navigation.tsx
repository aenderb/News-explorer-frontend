import { useState } from "react";
import { Link } from "react-router-dom";
import logoutIcon from "../../images/logout.svg";
import closeButton from "../../images/close.svg";

interface NavigationProps {
  isLoggedIn?: boolean;
  variant?: 'default' | 'saved';
  handleSigninClick?: () => void;
  onHomeClick?: () => void;
}

function Navigation({ isLoggedIn, variant = 'default', handleSigninClick, onHomeClick }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
 
  
  const isDark = variant === 'default';
  const textColor = isDark ? 'text-white' : 'text-[#1a1b22]';
  const shadowClass = isDark ? 'shadow-[inset_0px_-1px_0px_0px_#D1D2D6]' : 'shadow-[inset_0px_-1px_0px_0px_rgba(0,0,0,0.2)]';
  const hoverBorderColor = isDark ? 'border-white' : 'border-[#1a1b22]';
  const buttonBorder = isDark ? 'border-white' : 'border-[#1a1b22]';
  const buttonHoverBg = isDark ? 'hover:bg-white hover:text-black' : 'hover:bg-[#1a1b22] hover:text-white';

  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };
  
  return (
    <nav className={`flex justify-between items-center px-4 md:px-10 lg:px-[104px] pt-5 md:pt-[30px] pb-4 md:pb-[26px] ${shadowClass} relative`}>
      <Link
        to="/"
        className={`w-[120px] md:w-[200px] font-roboto-slab font-bold text-lg md:text-xl ${textColor} leading-6 no-underline`}
        onClick={onHomeClick}
      >
        NewsExplorer
      </Link>
      <button
        type="button"
        className={`md:hidden flex flex-col gap-1.5 w-10 h-10 items-center justify-center ${textColor}`}
        aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
        aria-expanded={isMenuOpen}
        onClick={handleToggleMenu}
      >
        {isMenuOpen ? (
          <img src={closeButton} alt="Fechar menu" className="w-6 h-6" />
        ) : (
          <>
            <span className={`block w-6 h-0.5 ${textColor.replace('text-', 'bg-')}`}></span>
            <span className={`block w-6 h-0.5 ${textColor.replace('text-', 'bg-')}`}></span>
            <span className={`block w-6 h-0.5 ${textColor.replace('text-', 'bg-')}`}></span>
          </>
        )}
      </button>
      <ul className={`hidden md:flex items-center flex-wrap gap-4 md:gap-11 font-roboto-slab font-medium text-base md:text-xl leading-6 ${textColor} list-none m-0 p-0`}>
        <li>
          <Link
            to="/"
            className={`relative no-underline ${textColor} hover:after:content-[''] hover:after:absolute hover:after:left-0 hover:after:right-0 hover:after:-bottom-4 md:hover:after:-bottom-[36px] hover:after:h-4 md:hover:after:h-[36px] hover:after:border-b-2 md:hover:after:border-b-[3px] hover:after:${hoverBorderColor}`}
            onClick={onHomeClick}
          >
            Início
          </Link>
        </li>
        {isLoggedIn && (
          <li>
            <Link
              to="/saved-news"
              className={`relative no-underline ${textColor} hover:after:content-[''] hover:after:absolute hover:after:left-0 hover:after:right-0 hover:after:-bottom-4 md:hover:after:-bottom-[36px] hover:after:h-4 md:hover:after:h-[36px] hover:after:border-b-2 md:hover:after:border-b-[3px] hover:after:${hoverBorderColor}`}
            >
              Artigos Salvos
            </Link>
          </li>
        )}
        <li>
          {isLoggedIn ? (
            <button className={`flex items-center gap-3 md:gap-4 h-10 md:h-12 border ${buttonBorder} rounded-full ${textColor} ${buttonHoverBg} transition-colors px-4 md:px-6 text-base md:text-lg`}>
              Elise
              <img src={logoutIcon} alt="Sair" className="w-6 h-6" />
            </button>
          ) : (
            <button 
              onClick={handleSigninClick}
              className={`w-32 md:w-44 h-10 md:h-12 border ${buttonBorder} rounded-full ${textColor} ${buttonHoverBg} transition-colors text-base md:text-lg`}
            >
              Entrar
            </button>
          )}
        </li>
      </ul>
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-50">
          <div className="bg-[#1a1b22] w-full px-4 pt-6 pb-8">
            <div className="flex items-center justify-between">
              <Link
                to="/"
                className="w-[120px] font-roboto-slab font-bold text-lg leading-6 text-white no-underline"
                onClick={() => {
                  onHomeClick?.();
                  handleCloseMenu();
                }}
              >
                NewsExplorer
              </Link>
              <button
                type="button"
                className="w-10 h-10 flex items-center justify-center"
                aria-label="Fechar menu"
                onClick={handleCloseMenu}
              >
                <img src={closeButton} alt="Fechar menu" className="w-6 h-6" />
              </button>
            </div>
            <ul className="flex flex-col gap-6 font-roboto-slab font-medium text-lg leading-6 text-white list-none m-0 mt-6 p-0">
              <li>
                <Link
                  to="/"
                  className="no-underline text-white"
                  onClick={() => {
                    onHomeClick?.();
                    handleCloseMenu();
                  }}
                >
                  Início
                </Link>
              </li>
              {isLoggedIn && (
                <li>
                  <Link
                    to="/saved-news"
                    className="no-underline text-white"
                    onClick={handleCloseMenu}
                  >
                    Artigos Salvos
                  </Link>
                </li>
              )}
              <li>
                {isLoggedIn ? (
                  <button className="flex items-center gap-3 h-10 border border-white rounded-full text-white transition-colors px-4 text-base">
                    Elise
                    <img src={logoutIcon} alt="Sair" className="w-6 h-6" />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      handleSigninClick?.();
                      handleCloseMenu();
                    }}
                    className="w-full h-10 border border-white rounded-full text-white transition-colors text-base"
                  >
                    Entrar
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navigation;
