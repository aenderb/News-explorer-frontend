const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

interface UserData {
  email: string;
  name: string;
}

interface ArticleData {
  _id: string;
  keyword: string;
  title: string;
  text: string;
  date: string;
  source: string;
  link: string;
  image: string;
}

interface CreateArticlePayload {
  keyword: string;
  title: string;
  text: string;
  date: string;
  source: string;
  link: string;
  image: string;
}

function checkResponse<T>(res: Response): Promise<T> {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((err) => {
    throw new Error(err.message || `Erro: ${res.status}`);
  });
}

/**
 * Wrapper de fetch autenticado.
 * Envia cookies automaticamente (credentials: "include").
 * Se a resposta for 401, tenta renovar o token via /refresh e refaz a requisição original.
 */
function authFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const opts: RequestInit = {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    },
  };

  return fetch(url, opts).then((res) => {
    if (res.status === 401) {
      // Tenta refresh e refaz a requisição original
      return fetch(`${BASE_URL}/refresh`, {
        method: "POST",
        credentials: "include",
      }).then((refreshRes) => {
        if (!refreshRes.ok) {
          throw new Error("Sessão expirada");
        }
        // Refaz a requisição original com o novo cookie
        return fetch(url, opts);
      });
    }
    return res;
  });
}

// ─── Autenticação ───

function signup(email: string, password: string, name: string): Promise<UserData> {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, name }),
  }).then((res) => checkResponse<UserData>(res));
}

function signin(email: string, password: string): Promise<UserData> {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then((res) => checkResponse<UserData>(res));
}

function signout(): Promise<{ message: string }> {
  return fetch(`${BASE_URL}/logout`, {
    method: "POST",
    credentials: "include",
  }).then((res) => checkResponse<{ message: string }>(res));
}

// ─── Usuário ───

function getUserInfo(): Promise<UserData> {
  return authFetch(`${BASE_URL}/users/me`, {
    method: "GET",
  }).then((res) => checkResponse<UserData>(res));
}

// ─── Artigos ───

function getSavedArticles(): Promise<ArticleData[]> {
  return authFetch(`${BASE_URL}/articles`, {
    method: "GET",
  }).then((res) => checkResponse<ArticleData[]>(res));
}

function saveArticle(article: CreateArticlePayload): Promise<ArticleData> {
  return authFetch(`${BASE_URL}/articles`, {
    method: "POST",
    body: JSON.stringify(article),
  }).then((res) => checkResponse<ArticleData>(res));
}

function deleteArticle(articleId: string): Promise<{ message: string }> {
  return authFetch(`${BASE_URL}/articles/${articleId}`, {
    method: "DELETE",
  }).then((res) => checkResponse<{ message: string }>(res));
}

export {
  signup,
  signin,
  signout,
  getUserInfo,
  getSavedArticles,
  saveArticle,
  deleteArticle,
};

export type { UserData, ArticleData, CreateArticlePayload };
