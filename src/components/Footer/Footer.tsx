import githubIcon from "../../images/github.svg";
import facebookIcon from "../../images/facebook.svg";

function Footer() {
  return (
    <footer className="max-w-container w-full mx-auto flex flex-col-reverse md:flex-row justify-between px-4 md:px-10 lg:px-[104px] pt-5 md:pt-8 pb-5 md:pb-[26px]">
      <p className="font-roboto text-[#b6bcbf] text-base leading-[22px] m-0">
        &copy; {new Date().getFullYear()} Supersite, desenvolvido pela News API
      </p>
      <div className="flex justify-between md:justify-start mb-8 md:mb-0">
        <ul className="flex flex-col md:flex-row gap-4 md:gap-10 font-roboto font-normal m-0 mr-6 md:mr-10 p-0">
          <li className="list-none">
            <a href="/" className="no-underline text-[#1a1b22] text-lg leading-6">
              Inicio
            </a>
          </li>
          <li className="list-none">
            <a
              href="https://tripleten.com"
              className="no-underline text-[#1a1b22] text-lg leading-6"
              target="_blank"
              rel="noopener noreferrer"
            >
              TripleTen
            </a>
          </li>
        </ul>
        <ul className="flex gap-6 font-roboto font-normal m-0 items-center">
          <li className="list-none">
            <a
              href="https://github.com"
              className="no-underline text-[#1a1b22] text-lg leading-6"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={githubIcon}
                alt="Icone GitHub"
              />
            </a>
          </li>
          <li className="list-none">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline text-[#1a1b22] text-lg leading-6"
            >
              <img
                src={facebookIcon}
                alt="Icone Facebook"
              />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;