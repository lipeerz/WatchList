import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const mensagem = error.response?.data?.erro || 'Erro de conexão com o servidor';
    return Promise.reject({ ...error, mensagem });
  }
);

export const filmesService = {
  listar: (params) => api.get('/filmes', { params }),
  buscar: (id) => api.get(`/filmes/${id}`),
  criar: (dados) => api.post('/filmes', dados),
  atualizar: (id, dados) => api.put(`/filmes/${id}`, dados),
  deletar: (id) => api.delete(`/filmes/${id}`),
};

export default api;
