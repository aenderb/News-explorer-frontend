const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = import.meta.env.VITE_NEWS_API_BASE_URL || "/api/news";

interface Article {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

function searchNews(query: string, page = 1, pageSize = 3): Promise<NewsApiResponse> {
  if (!API_KEY) {
    return Promise.reject(new Error("VITE_NEWS_API_KEY nao configurada."));
  }
  const url = `${BASE_URL}?q=${encodeURIComponent(query)}&apiKey=${API_KEY}&language=pt&pageSize=${pageSize}&page=${page}`;

  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }
      return response.json();
    })
    .then((data: NewsApiResponse) => data);
}

export default searchNews;
export type { Article };
