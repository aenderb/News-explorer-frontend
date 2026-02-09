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

async function searchNews(query: string, page = 1, pageSize = 3): Promise<NewsApiResponse> {
  try {
    if (!API_KEY) {
      throw new Error("VITE_NEWS_API_KEY nao configurada.");
    }
    const url = `${BASE_URL}?q=${encodeURIComponent(query)}&apiKey=${API_KEY}&language=pt&pageSize=${pageSize}&page=${page}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
    
    const data: NewsApiResponse = await response.json();
    
    return data;
  } catch (error) {
    console.error('Erro ao buscar notícias:', error);
    throw error;
  }
}

export default searchNews;
export type { Article };
