import axios from 'axios';

// https://virtual-store-api.vercel.app/api
const api = axios.create({
  baseURL: 'http://localhost:3000/api', // URL base da API
});

// Interceptor para adicionar o token automaticamente
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token'); // ou use context/state global
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Interceptor opcional para tratar erros (ex: 401)
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // redirecionar para login, limpar token, etc
      console.log('Token inválido ou expirado');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/sign-in'; // redireciona para a página de login
    }
    return Promise.reject(error);
  }
);

export default api;