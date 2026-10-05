// api/authApi.js — Mock
// TODO (futuro): trocar pelo backend real:
//   import api from './axiosConfig';
//   export const loginApi    = (email, senha) => api.post('/login', { email, senha });
//   export const registerApi = (dados)        => api.post('/register', dados);
//   export const logoutApi   = ()             => api.post('/logout');

import { MOCK_USERS, delay } from '../mock/mockData';

export async function loginApi(email, senha) {
  await delay(500);
  const user = MOCK_USERS.find((u) => u.email === email && u.senha === senha);
  if (!user) {
    throw { response: { status: 401, data: { error: 'Email ou senha inválidos.' } } };
  }
  const { senha: _senha, ...safe } = user;
  return { data: safe };
}

export async function registerApi({ nome, email, senha, perfil }) {
  await delay(600);
  const exists = MOCK_USERS.find((u) => u.email === email);
  if (exists) {
    throw { response: { status: 409, data: { error: 'Este email já está cadastrado.' } } };
  }
  const newUser = {
    id_usuario: MOCK_USERS.length + 1,
    nome, email, senha, perfil,
    is_admin: false,
    criado_em: new Date().toISOString(),
    token: `mock-token-${Date.now()}`,
  };
  MOCK_USERS.push(newUser);
  return { data: { ok: true } };
}

export async function logoutApi() {
  await delay(200);
  return { data: { ok: true } };
}
