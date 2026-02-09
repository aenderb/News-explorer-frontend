import about from "../../images/about.jpg";
function About() {
  return (
    <section className="max-w-container w-full mx-auto px-4 md:px-10 lg:px-[104px]">
      <div className="flex flex-col md:flex-row items-center md:items-center justify-start py-12 md:py-20 gap-8 md:gap-14">
        <img
          className="w-[272px] h-[272px] md:w-[464px] md:h-[464px] rounded-full object-cover"
          src={about}
          alt="Foto do autor"
        />
        <div className="flex flex-col justify-start font-roboto-slab w-full md:w-[592px]">
          <h2 className="font-roboto-slab max-w-[600px] font-normal text-[32px] leading-[36px] md:text-[40px] md:leading-[46px] mt-6 md:mt-[52px] mb-6">
            Sobre o autor
          </h2>
          <p className="font-roboto max-w-[600px] text-base md:text-lg leading-6 font-normal text-[#1a1b22] mb-6 md:mb-[30px]">
            Meu nome é Aender Binoto, sou Engineering Manager com perfil hands-on, atuando também como desenvolvedor fullstack. Tenho sólida experiência em desenvolvimento web, trabalhando principalmente com Node.js no backend e React no frontend, sempre com foco em arquitetura, qualidade de código e entrega de soluções escaláveis
          </p>
          <p className="font-roboto max-w-[600px] text-base md:text-lg leading-6 font-normal text-[#1a1b22] mb-6 md:mb-[30px]">
            Além da atuação profissional, tive a oportunidade de aprofundar meus conhecimentos no curso da TripleTen, uma formação completa e bem estruturada, com duração de 1 ano, que cobre todos os principais aspectos do desenvolvimento web moderno. Ao longo do curso, passei por fundamentos, boas práticas, ferramentas do ecossistema frontend e backend, além de projetos práticos que simulam desafios reais do mercado. Essa combinação de experiência prática, visão de liderança e base técnica sólida me permite ajudar clientes e times a transformar ideias em produtos digitais bem construídos e eficientes.
          </p>
        </div>
      </div>
    </section>
  );
}
export default About;
