// api/deviceApi.js — Mock
// TODO (futuro): trocar pelo backend real:
//   import api from './axiosConfig';
//   export const listarDispositivosApi  = (id_usuario) => api.get(`/dispositivo/listar/${id_usuario}`);
//   export const conectarDispositivoApi = (id)         => api.post('/dispositivo/conectar', { id });

import { MOCK_DEVICES, delay } from '../mock/mockData';

export async function listarDispositivosApi(id_usuario) {
  await delay(350);
  const proprios = MOCK_DEVICES.filter((d) => d.id_usuario === id_usuario);
  if (proprios.length === 0) {
    return { data: [{ id: 99, nome_bt: `FisioGlove-${id_usuario}X`, id_usuario, is_active: false }] };
  }
  return { data: proprios };
}

export async function conectarDispositivoApi(id_dispositivo) {
  await delay(500);
  const dev = MOCK_DEVICES.find((d) => d.id === id_dispositivo);
  if (dev) dev.is_active = true;
  return { data: { ok: true } };
}
