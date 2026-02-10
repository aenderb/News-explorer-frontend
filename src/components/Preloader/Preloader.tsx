const Preloader = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10 w-full col-span-full">
      <div className="w-[50px] h-[50px] border-4 border-[rgba(31,128,224,0.2)] border-t-[#1f80e0] rounded-full animate-spin mb-4"></div>
      <p className="text-[#555] text-base m-0 text-center">Procurando notícias...</p>
    </div>
  );
};

export default Preloader;