import { useState, FormEvent } from "react";

interface SearchFormProps {
  onSearch?: (query: string) => void;
}

function SearchForm({ onSearch }: SearchFormProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim() && onSearch) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-[608px] mt-10 md:mt-16 mb-12 md:mb-20 flex flex-col gap-4 md:block">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full h-14 md:h-16 pl-6 pr-6 md:pr-[180px] border border-[#d1d2d6] rounded-full text-base placeholder:text-[#b6bcbf]"
        placeholder="Inserir tema"
      />
      <button
        type="submit"
        className="md:absolute md:right-0 md:top-0 w-full md:w-[168px] h-14 md:h-16 border-none rounded-full text-white text-lg cursor-pointer bg-button-blue hover:bg-blue-700 transition-colors"
      >
        Procurar
      </button>
    </form>
  );
}
export default SearchForm;
