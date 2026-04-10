# CineLog 🎬

Sistema web de gestão de filmes desenvolvido por **Alan Filipe Reginato**.

> Stack: React · Node.js · Express · MySQL

---

## Pré-requisitos

- Node.js v18+
- MySQL 8+
- npm

---

## 1. Banco de Dados

1. Abra o MySQL Workbench (ou terminal MySQL)
2. Importe o arquivo `cinelog.sql`:
   ```sql
   source /caminho/para/cinelog.sql
   ```
   Ou via MySQL Workbench: **Server > Data Import > Import from Self-Contained File**

---

## 2. Backend

```bash
cd backend
npm install
```

Configure o arquivo `.env` com suas credenciais MySQL:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=cinelog
DB_PORT=3306
PORT=3001
```

Inicie o servidor:
```bash
npm start
# ou para desenvolvimento:
npm run dev
```

O backend estará disponível em: `http://localhost:3001`

---

## 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

O frontend estará disponível em: `http://localhost:5173`

---

## Endpoints da API

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/filmes` | Lista filmes (paginação, busca, filtro) |
| GET | `/api/filmes/:id` | Busca um filme por ID |
| POST | `/api/filmes` | Cria novo filme |
| PUT | `/api/filmes/:id` | Atualiza filme existente |
| DELETE | `/api/filmes/:id` | Remove filme |

### Parâmetros de query (GET /api/filmes)
- `page` – número da página (padrão: 1)
- `limit` – itens por página (padrão: 8)
- `busca` – filtro por título ou diretor
- `genero` – filtro por gênero

---

## Estrutura do Projeto

```
cinelog/
├── backend/
│   ├── config/
│   │   └── db.js              # Configuração MySQL
│   ├── controllers/
│   │   └── filmesController.js # Lógica CRUD
│   ├── middlewares/
│   │   └── errorHandler.js    # Tratamento de erros
│   ├── routes/
│   │   └── filmes.js          # Rotas da API
│   ├── .env                   # Variáveis de ambiente
│   ├── package.json
│   └── server.js              # Entrada do servidor
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── FilmeCard.jsx
│   │   │   ├── Pagination.jsx
│   │   │   ├── Toast.jsx
│   │   │   └── ConfirmModal.jsx
│   │   ├── pages/
│   │   │   ├── ListaFilmes.jsx   # Tela 1: Listagem
│   │   │   ├── DetalheFilme.jsx  # Tela 2: Detalhe
│   │   │   ├── FormFilme.jsx     # Tela 3: Cadastro/Edição
│   │   │   └── Sobre.jsx         # Tela 4: Sobre
│   │   ├── services/
│   │   │   └── api.js            # Axios + serviços
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── cinelog.sql
└── README.md
```

---

## Funcionalidades

- ✅ Listagem de filmes com paginação
- ✅ Busca por título ou diretor
- ✅ Filtro por gênero
- ✅ Cadastro de filmes (título, diretor, ano, gênero, nota, sinopse, poster, status)
- ✅ Edição de filmes
- ✅ Exclusão com confirmação
- ✅ Visualização detalhada
- ✅ Validação de formulários no frontend e backend
- ✅ Tratamento de erros com notificações
- ✅ Design minimalista preto e azul

---

Desenvolvido por **Alan Filipe Reginato**
