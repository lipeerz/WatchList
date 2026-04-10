const db = require('../config/db');

// GET /api/filmes - Listar todos os filmes com paginação
const listarFilmes = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 8;
  const offset = (page - 1) * limit;
  const busca = req.query.busca || '';
  const genero = req.query.genero || '';

  let countQuery = 'SELECT COUNT(*) as total FROM filmes WHERE 1=1';
  let dataQuery = 'SELECT * FROM filmes WHERE 1=1';
  const params = [];
  const countParams = [];

  if (busca) {
    const like = `%${busca}%`;
    dataQuery += ' AND (titulo LIKE ? OR diretor LIKE ?)';
    countQuery += ' AND (titulo LIKE ? OR diretor LIKE ?)';
    params.push(like, like);
    countParams.push(like, like);
  }

  if (genero) {
    dataQuery += ' AND genero LIKE ?';
    countQuery += ' AND genero LIKE ?';
    params.push(`%${genero}%`);
    countParams.push(`%${genero}%`);
  }

  dataQuery += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
  params.push(limit, offset);

  db.query(countQuery, countParams, (errCount, countResult) => {
    if (errCount) {
      return res.status(500).json({ erro: 'Erro ao contar filmes', detalhes: errCount.message });
    }

    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);

    db.query(dataQuery, params, (err, results) => {
      if (err) {
        return res.status(500).json({ erro: 'Erro ao buscar filmes', detalhes: err.message });
      }
      res.json({ filmes: results, total, page, totalPages, limit });
    });
  });
};

// GET /api/filmes/:id - Buscar um filme por ID
const buscarFilme = (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({ erro: 'ID inválido' });
  }

  db.query('SELECT * FROM filmes WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro ao buscar filme', detalhes: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ erro: 'Filme não encontrado' });
    }
    res.json(results[0]);
  });
};

// POST /api/filmes - Criar novo filme
const criarFilme = (req, res) => {
  const { titulo, diretor, ano_lancamento, genero, nota, sinopse, poster_url, assistido } = req.body;

  // Validações
  if (!titulo || titulo.trim().length < 1) {
    return res.status(400).json({ erro: 'Título é obrigatório' });
  }
  if (!diretor || diretor.trim().length < 1) {
    return res.status(400).json({ erro: 'Diretor é obrigatório' });
  }
  if (!ano_lancamento || isNaN(ano_lancamento) || ano_lancamento < 1888 || ano_lancamento > new Date().getFullYear() + 5) {
    return res.status(400).json({ erro: 'Ano de lançamento inválido' });
  }
  if (!genero || genero.trim().length < 1) {
    return res.status(400).json({ erro: 'Gênero é obrigatório' });
  }
  if (nota === undefined || isNaN(nota) || nota < 0 || nota > 10) {
    return res.status(400).json({ erro: 'Nota deve ser entre 0 e 10' });
  }

  const query = `
    INSERT INTO filmes (titulo, diretor, ano_lancamento, genero, nota, sinopse, poster_url, assistido)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    titulo.trim(),
    diretor.trim(),
    parseInt(ano_lancamento),
    genero.trim(),
    parseFloat(nota),
    sinopse ? sinopse.trim() : null,
    poster_url ? poster_url.trim() : null,
    assistido ? 1 : 0,
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro ao criar filme', detalhes: err.message });
    }
    db.query('SELECT * FROM filmes WHERE id = ?', [result.insertId], (err2, rows) => {
      if (err2) return res.status(201).json({ id: result.insertId });
      res.status(201).json(rows[0]);
    });
  });
};

// PUT /api/filmes/:id - Atualizar filme
const atualizarFilme = (req, res) => {
  const { id } = req.params;
  const { titulo, diretor, ano_lancamento, genero, nota, sinopse, poster_url, assistido } = req.body;

  if (!id || isNaN(id)) {
    return res.status(400).json({ erro: 'ID inválido' });
  }

  // Validações
  if (!titulo || titulo.trim().length < 1) {
    return res.status(400).json({ erro: 'Título é obrigatório' });
  }
  if (!diretor || diretor.trim().length < 1) {
    return res.status(400).json({ erro: 'Diretor é obrigatório' });
  }
  if (!ano_lancamento || isNaN(ano_lancamento) || ano_lancamento < 1888 || ano_lancamento > new Date().getFullYear() + 5) {
    return res.status(400).json({ erro: 'Ano de lançamento inválido' });
  }
  if (!genero || genero.trim().length < 1) {
    return res.status(400).json({ erro: 'Gênero é obrigatório' });
  }
  if (nota === undefined || isNaN(nota) || nota < 0 || nota > 10) {
    return res.status(400).json({ erro: 'Nota deve ser entre 0 e 10' });
  }

  const query = `
    UPDATE filmes SET titulo=?, diretor=?, ano_lancamento=?, genero=?, nota=?, sinopse=?, poster_url=?, assistido=?
    WHERE id=?
  `;
  const values = [
    titulo.trim(),
    diretor.trim(),
    parseInt(ano_lancamento),
    genero.trim(),
    parseFloat(nota),
    sinopse ? sinopse.trim() : null,
    poster_url ? poster_url.trim() : null,
    assistido ? 1 : 0,
    id,
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro ao atualizar filme', detalhes: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: 'Filme não encontrado' });
    }
    db.query('SELECT * FROM filmes WHERE id = ?', [id], (err2, rows) => {
      if (err2) return res.json({ mensagem: 'Filme atualizado com sucesso' });
      res.json(rows[0]);
    });
  });
};

// DELETE /api/filmes/:id - Remover filme
const deletarFilme = (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({ erro: 'ID inválido' });
  }

  db.query('DELETE FROM filmes WHERE id = ?', [id], (err, result) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro ao deletar filme', detalhes: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: 'Filme não encontrado' });
    }
    res.json({ mensagem: 'Filme removido com sucesso' });
  });
};

module.exports = { listarFilmes, buscarFilme, criarFilme, atualizarFilme, deletarFilme };
