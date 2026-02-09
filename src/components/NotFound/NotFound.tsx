import notFoundImage from "../../images/not-found.svg";

function NotFound() {
  return (
    <section className="mx-auto w-full max-w-[1440px] h-auto md:h-[374px] flex flex-col items-center justify-center gap-6 bg-[#f5f6f7] px-4 md:px-10 py-12 md:py-20">
      <img
        src={notFoundImage}
        alt="Nada encontrado"
        className="w-[82.5px] h-[82.5px]"
      />
      <h2 className="font-roboto-slab text-[22px] md:text-2xl font-normal text-[#1a1b22] w-full max-w-[356px] text-center m-0">
        Nada encontrado
      </h2>
      <p className="font-roboto text-base md:text-lg leading-6 text-[#b6bcbf] w-full max-w-[356px] text-center m-0">
        Desculpe, mas nada corresponde aos seus termos de pesquisa.
      </p>
    </section>
  );
}

export default NotFound;
