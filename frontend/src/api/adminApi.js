// api/adminApi.js — Mock
// TODO (futuro): trocar pelo backend real:
//   import api from './axiosConfig';
//   export const adminUsuariosApi  = () => api.get('/admin/usuarios');
//   export const adminSessoesApi   = () => api.get('/admin/sessoes');
//   export const adminRelatorioApi = () => api.get('/admin/relatorio');

import { MOCK_USERS, MOCK_SESSOES, MOCK_RELATORIO, delay } from '../mock/mockData';

export async function adminUsuariosApi() {
  await delay(400);
  const users = MOCK_USERS.filter((u) => !u.is_admin).map(({ senha, token, ...u }) => u);
  return { data: users };
}

export async function adminSessoesApi() {
  await delay(400);
  return { data: MOCK_SESSOES };
}

export async function adminRelatorioApi() {
  await delay(500);
  return { data: MOCK_RELATORIO };
}
