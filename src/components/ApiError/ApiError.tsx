interface ApiErrorProps {
  message?: string;
}

function ApiError({ message = "Erro ao buscar noticias. Tente novamente." }: ApiErrorProps) {
  return (
    <section className="mx-auto w-full max-w-[1440px] flex flex-col items-center justify-center gap-4 bg-[#f5f6f7] px-4 md:px-10 py-10 md:py-16">
      <h2 className="font-roboto-slab text-[22px] md:text-2xl font-normal text-[#1a1b22] text-center m-0">
        Ocorreu um erro
      </h2>
      <p className="font-roboto text-base md:text-lg leading-6 text-[#b6bcbf] text-center m-0 max-w-[520px]">
        {message}
      </p>
    </section>
  );
}

export default ApiError;
