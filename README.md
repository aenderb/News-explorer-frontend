# News Explorer Frontend

Projeto de frontend para o News Explorer, desenvolvido em React + TypeScript, com Vite e Tailwind CSS. Permite buscar notícias em tempo real, visualizar resultados paginados, salvar artigos favoritos e gerenciar autenticação via cookies httpOnly com refresh token.

**Produção:** [https://news-explorer-frontend-beta.vercel.app/](https://news-explorer-frontend-beta.vercel.app/)

## Funcionalidades

- Busca de notícias em tempo real via NewsAPI (com paginação de 3 em 3)
- Salvar e remover artigos favoritos (persistido no backend)
- Autenticação completa (cadastro, login e logout)
- Sessão via cookies httpOnly com refresh token automático
- Layout responsivo (mobile, tablet, desktop)
- Menu hamburguer para mobile
- Validação de formulários de login e cadastro
- Feedback visual de erros e loading

## Tecnologias Utilizadas

- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router 7](https://reactrouter.com/)

## Como rodar localmente

1. **Clone o repositório:**
   ```bash
   git clone <url-do-repo>
   cd News-explorer-frontend
   ```
2. **Instale as dependências:**
   ```bash
   npm install
   ```
3. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env` na raiz com:
   ```env
   VITE_API_BASE_URL=http://localhost:3000/api
   ```
   - `VITE_API_BASE_URL` — URL do backend (API própria, com prefixo `/api`)
4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
   O app estará disponível em [http://localhost:5173](http://localhost:5173)

> **Nota:** O backend deve estar rodando para que login, cadastro e salvamento de artigos funcionem.

## Autenticação

A autenticação utiliza **cookies httpOnly** gerenciados pelo backend, sem armazenar tokens no `localStorage`. O fluxo funciona assim:

1. **Login** (`POST /signin`) — Backend autentica e seta cookies `jwt` e `refreshToken` (httpOnly)
2. **Requisições autenticadas** — Frontend envia `credentials: "include"` e o navegador anexa os cookies automaticamente
3. **Refresh automático** — Se o JWT expirar (401), o frontend chama `POST /refresh` para renovar o token e repete a requisição
4. **Logout** (`POST /signout`) — Backend limpa os cookies

### Endpoints esperados no backend

| Método | Rota               | Descrição                                |
|--------|---------------------|------------------------------------------|
| POST   | `/api/signup`       | Cadastro de novo usuário                 |
| POST   | `/api/signin`       | Login (seta cookies httpOnly)            |
| POST   | `/api/logout`       | Logout (limpa cookies)                   |
| POST   | `/api/refresh`      | Renova o JWT via refresh token           |
| GET    | `/api/users/me`     | Retorna dados do usuário logado          |
| GET    | `/api/articles`     | Lista artigos salvos do usuário          |
| POST   | `/api/articles`     | Salva um novo artigo                     |
| DELETE | `/api/articles/:id` | Remove um artigo salvo                   |
| GET    | `/api/news`         | Buscar notícias externas                 |

## Estrutura de Pastas

```
src/
├── components/        # Componentes React
│   ├── App/           # Componente raiz e lógica principal
│   ├── Header/        # Cabeçalho com busca
│   ├── Navigation/    # Barra de navegação
│   ├── Main/          # Conteúdo principal (listagem de notícias)
│   ├── NewsCard/      # Card individual de notícia
│   ├── NewsCardList/  # Lista de cards
│   ├── SavedNews/     # Página de artigos salvos
│   ├── LoginPopup/    # Popup de login
│   ├── RegisterPopup/ # Popup de cadastro
│   ├── PopupWithForm/ # Popup genérico com formulário
│   ├── contexts/      # React Contexts (CurrentUserContext)
│   └── ...
├── utils/             # Funções utilitárias e integração com APIs
│   ├── MainApi.ts     # API própria (auth, artigos)
│   └── ThirdPartyApi.ts # NewsAPI (busca de notícias)
├── images/            # Imagens e ícones
└── vendor/            # Fontes e normalize.css
```

## Scripts Disponíveis

| Comando             | Descrição                              |
|---------------------|----------------------------------------|
| `npm run dev`       | Inicia o servidor de desenvolvimento   |
| `npm run build`     | Gera build de produção                 |
| `npm run preview`   | Visualiza build de produção localmente |
| `npm run lint`      | Executa o ESLint                       |

## Autor

Aender Binoto — [LinkedIn](https://www.linkedin.com/in/aenderbinoto/)

---

Projeto desenvolvido como parte do curso TripleTen.