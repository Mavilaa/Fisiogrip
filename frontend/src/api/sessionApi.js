// api/sessionApi.js — Mock
// TODO (futuro): trocar pelo backend real:
//   import api from './axiosConfig';
//   export const iniciarSessaoApi   = (dados)      => api.post('/sessao/iniciar',  dados);
//   export const encerrarSessaoApi  = (dados)      => api.post('/sessao/encerrar', dados);
//   export const historicoSessaoApi = (id_usuario) => api.get(`/sessao/historico/${id_usuario}`);

import { MOCK_SESSOES, delay } from '../mock/mockData';

let nextId = 100;

export async function iniciarSessaoApi({ id_usuario, id_dispositivo, modo, nivel }) {
  await delay(400);
  const nova = {
    id: nextId++,
    id_usuario,
    id_dispositivo,
    modo,
    nivel,
    iniciado_em: new Date().toISOString(),
  };
  return { data: nova };
}

export async function encerrarSessaoApi({ id_sessao, pacote_bt }) {
  await delay(600);
  const forca_media = pacote_bt?.forca_media ?? Math.floor(Math.random() * 300 + 300);
  const ritmo_score = pacote_bt?.ritmo_score ?? Math.floor(Math.random() * 40 + 50);
  const tempo_total_ms = 45000 + Math.floor(Math.random() * 30000);
  const score = (forca_media / 600) * 0.5 + (ritmo_score / 100) * 0.5;
  const estrelas = score >= 0.8 ? 3 : score >= 0.55 ? 2 : 1;
  return { data: { estrelas, forca_media, ritmo_score, tempo_total_ms } };
}

export async function historicoSessaoApi(id_usuario) {
  await delay(400);
  const sessoes = MOCK_SESSOES.filter((s) => s.id_usuario === id_usuario);
  return { data: sessoes };
}
