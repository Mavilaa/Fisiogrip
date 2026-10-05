// api/rankingApi.js — Mock
// TODO (futuro): trocar pelo backend real:
//   import api from './axiosConfig';
//   export const rankingGeralApi   = ()   => api.get('/ranking/geral');
//   export const rankingUsuarioApi = (id) => api.get(`/ranking/usuario/${id}`);

import { MOCK_RANKING, delay } from '../mock/mockData';

export async function rankingGeralApi() {
  await delay(400);
  return { data: MOCK_RANKING };
}

export async function rankingUsuarioApi(id_usuario) {
  await delay(300);
  const entry = MOCK_RANKING.find((r) => r.id_usuario === id_usuario);
  return { data: entry || null };
}
