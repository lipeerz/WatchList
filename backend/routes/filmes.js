const express = require('express');
const router = express.Router();
const {
  listarFilmes,
  buscarFilme,
  criarFilme,
  atualizarFilme,
  deletarFilme,
} = require('../controllers/filmesController');

router.get('/', listarFilmes);
router.get('/:id', buscarFilme);
router.post('/', criarFilme);
router.put('/:id', atualizarFilme);
router.delete('/:id', deletarFilme);

module.exports = router;
