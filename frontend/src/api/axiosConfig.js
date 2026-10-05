// api/axiosConfig.js
// Instância do axios com baseURL e interceptor de JWT

import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
  headers: { 'Content-Type': 'application/json' },
});

// Injeta token JWT em toda requisição
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('fisiogrip_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Trata erros globais (401 → redireciona para login)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('fisiogrip_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
