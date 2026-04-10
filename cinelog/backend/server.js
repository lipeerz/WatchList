const express = require('express');
const cors = require('cors');
require('dotenv').config();

const filmesRoutes = require('./routes/filmes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/api/filmes', filmesRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ mensagem: 'CineLog API - Alan Filipe Reginato', status: 'online' });
});

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🎬 CineLog Backend rodando na porta ${PORT}`);
});
