const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

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

function searchNews(query: string, pageSize = 100): Promise<NewsApiResponse> {
  const url = `${BASE_URL}/news?q=${encodeURIComponent(query)}&language=pt&pageSize=${pageSize}&page=1`;

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
