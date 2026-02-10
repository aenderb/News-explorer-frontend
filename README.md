# News Explorer Frontend

Projeto de frontend para o News Explorer, desenvolvido em React + TypeScript, com Vite e Tailwind CSS. Permite buscar notícias, visualizar resultados paginados, salvar artigos (mock), autenticar e navegar de forma responsiva.

## Funcionalidades

- Busca de notícias em tempo real via API (com paginação de 3 em 3)
- Layout responsivo (mobile, tablet, desktop)
- Menu hamburguer para mobile
- Validação de formulários de login e cadastro
- Feedback visual de erros e loading
- Mock de artigos salvos para demonstração

## Tecnologias Utilizadas

- [React 18](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)

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
   VITE_NEWS_API_KEY=<sua_api_key>
   VITE_NEWS_API_BASE_URL=<url_base_api>
   ```
   > Para testes locais, pode deixar o `VITE_NEWS_API_BASE_URL` em branco para usar o mock `/api/news`.

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev -- --host
   ```
   O app estará disponível em [http://localhost:5173](http://localhost:5173)

## Estrutura de Pastas

- `src/components/` — Componentes React reutilizáveis
- `src/utils/` — Funções utilitárias e integração com API
- `public/` — Imagens e arquivos estáticos

## Scripts Disponíveis

- `npm run dev` — Inicia o servidor de desenvolvimento
- `npm run build` — Gera build de produção
- `npm run preview` — Visualiza build de produção localmente

## Observações

- O login/cadastro é mockado (não há backend real)
- A funcionalidade de salvar artigos é apenas visual
- O layout é 100% responsivo e utiliza apenas Tailwind CSS

## Autor

Aender Binoto — [LinkedIn](https://www.linkedin.com/in/aenderbinoto/)

---

Projeto desenvolvido como parte do curso TripleTen.