const errorHandler = (err, req, res, next) => {
  console.error('Erro:', err.stack);
  res.status(err.status || 500).json({
    erro: err.message || 'Erro interno do servidor',
  });
};

module.exports = errorHandler;
