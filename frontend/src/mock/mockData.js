// src/mock/mockData.js
// ─────────────────────────────────────────────────────────────
// Dados simulados do FisioGrasp.
// Para integrar o backend C++ real no futuro, basta substituir as
// funções em src/api/*.js pelas chamadas HTTP correspondentes
// (o axiosConfig.js já está pronto e configurado para isso).
// ─────────────────────────────────────────────────────────────

/* ---------- Usuários ---------- */
export const MOCK_USERS = [
  {
    id_usuario: 1,
    nome: 'João Silva',
    email: 'joao@email.com',
    senha: '123456',
    perfil: 'motor',
    is_admin: false,
    criado_em: '2025-03-10T10:00:00',
    token: 'mock-token-joao',
  },
  {
    id_usuario: 2,
    nome: 'Maria Oliveira',
    email: 'maria@email.com',
    senha: '123456',
    perfil: 'tdah',
    is_admin: false,
    criado_em: '2025-04-02T14:30:00',
    token: 'mock-token-maria',
  },
  {
    id_usuario: 3,
    nome: 'Carlos Souza',
    email: 'carlos@email.com',
    senha: '123456',
    perfil: 'autismo',
    is_admin: false,
    criado_em: '2025-04-15T09:00:00',
    token: 'mock-token-carlos',
  },
  {
    id_usuario: 4,
    nome: 'Ana Lima',
    email: 'ana@email.com',
    senha: '123456',
    perfil: 'outro',
    is_admin: false,
    criado_em: '2025-05-01T11:00:00',
    token: 'mock-token-ana',
  },
  {
    id_usuario: 99,
    nome: 'Admin FisioGrasp',
    email: 'admin@fisiogrip.com',
    senha: 'admin123',
    perfil: 'admin',
    is_admin: true,
    criado_em: '2025-01-01T00:00:00',
    token: 'mock-token-admin',
  },
];

/* ---------- Dispositivos ---------- */
export const MOCK_DEVICES = [
  { id: 1, nome_bt: 'FisioGlove-A1', id_usuario: 1, is_active: false },
  { id: 2, nome_bt: 'FisioGlove-B2', id_usuario: 2, is_active: false },
  { id: 3, nome_bt: 'FisioGlove-C3', id_usuario: 3, is_active: false },
  { id: 4, nome_bt: 'FisioGlove-D4', id_usuario: 4, is_active: false },
];

/* ---------- Sessões ---------- */
export const MOCK_SESSOES = [
  { id: 1, id_usuario: 1, usuario: 'João Silva',    dispositivo: 'FisioGlove-A1', modo: 'luva',   nivel: 'facil',   estrelas: 3, forca_media: 520, ritmo_score: 88, tempo_total_ms: 45000, iniciado_em: '2025-06-01T09:10:00' },
  { id: 2, id_usuario: 1, usuario: 'João Silva',    dispositivo: 'FisioGlove-A1', modo: 'bola',   nivel: 'medio',   estrelas: 2, forca_media: 410, ritmo_score: 72, tempo_total_ms: 60000, iniciado_em: '2025-06-05T10:00:00' },
  { id: 3, id_usuario: 1, usuario: 'João Silva',    dispositivo: 'FisioGlove-A1', modo: 'ritmo',  nivel: 'dificil', estrelas: 3, forca_media: 610, ritmo_score: 95, tempo_total_ms: 90000, iniciado_em: '2025-06-10T08:30:00' },
  { id: 4, id_usuario: 2, usuario: 'Maria Oliveira',dispositivo: 'FisioGlove-B2', modo: 'luva',   nivel: 'facil',   estrelas: 2, forca_media: 380, ritmo_score: 65, tempo_total_ms: 50000, iniciado_em: '2025-06-02T14:00:00' },
  { id: 5, id_usuario: 2, usuario: 'Maria Oliveira',dispositivo: 'FisioGlove-B2', modo: 'pisada', nivel: 'medio',   estrelas: 3, forca_media: 450, ritmo_score: 80, tempo_total_ms: 55000, iniciado_em: '2025-06-07T15:30:00' },
  { id: 6, id_usuario: 3, usuario: 'Carlos Souza',  dispositivo: 'FisioGlove-C3', modo: 'ritmo',  nivel: 'facil',   estrelas: 1, forca_media: 290, ritmo_score: 50, tempo_total_ms: 30000, iniciado_em: '2025-06-03T11:00:00' },
  { id: 7, id_usuario: 3, usuario: 'Carlos Souza',  dispositivo: 'FisioGlove-C3', modo: 'bola',   nivel: 'facil',   estrelas: 2, forca_media: 340, ritmo_score: 60, tempo_total_ms: 40000, iniciado_em: '2025-06-08T09:00:00' },
  { id: 8, id_usuario: 4, usuario: 'Ana Lima',      dispositivo: 'FisioGlove-D4', modo: 'luva',   nivel: 'medio',   estrelas: 3, forca_media: 490, ritmo_score: 85, tempo_total_ms: 70000, iniciado_em: '2025-06-04T16:00:00' },
  { id: 9, id_usuario: 4, usuario: 'Ana Lima',      dispositivo: 'FisioGlove-D4', modo: 'pisada', nivel: 'dificil', estrelas: 2, forca_media: 550, ritmo_score: 78, tempo_total_ms: 80000, iniciado_em: '2025-06-09T10:30:00' },
  { id:10, id_usuario: 1, usuario: 'João Silva',    dispositivo: 'FisioGlove-A1', modo: 'pisada', nivel: 'medio',   estrelas: 2, forca_media: 470, ritmo_score: 76, tempo_total_ms: 65000, iniciado_em: '2025-06-12T09:00:00' },
];

/* ---------- Ranking ---------- */
export const MOCK_RANKING = [
  { posicao: 1, id_usuario: 1, nome: 'João Silva',     perfil: 'motor',   total_estrelas: 10, total_sessoes: 4 },
  { posicao: 2, id_usuario: 4, nome: 'Ana Lima',       perfil: 'outro',   total_estrelas: 5,  total_sessoes: 2 },
  { posicao: 3, id_usuario: 2, nome: 'Maria Oliveira', perfil: 'tdah',    total_estrelas: 5,  total_sessoes: 2 },
  { posicao: 4, id_usuario: 3, nome: 'Carlos Souza',   perfil: 'autismo', total_estrelas: 3,  total_sessoes: 2 },
];

/* ---------- Relatório admin ---------- */
export const MOCK_RELATORIO = {
  totais: {
    total_usuarios: 4,
    total_sessoes: 10,
    total_estrelas: 23,
    media_forca_geral: 451,
    media_ritmo_geral: 74.9,
  },
  usuarios_por_perfil: [
    { perfil: 'motor',   total: 1 },
    { perfil: 'tdah',    total: 1 },
    { perfil: 'autismo', total: 1 },
    { perfil: 'outro',   total: 1 },
  ],
  sessoes_por_modo: [
    { modo: 'luva',   total: 3 },
    { modo: 'bola',   total: 2 },
    { modo: 'ritmo',  total: 2 },
    { modo: 'pisada', total: 3 },
  ],
  sessoes_por_nivel: [
    { nivel: 'facil',   total: 4 },
    { nivel: 'medio',   total: 4 },
    { nivel: 'dificil', total: 2 },
  ],
  sessoes_ultimos_7_dias: [
    { dia: '2025-06-06', total: 1 },
    { dia: '2025-06-07', total: 1 },
    { dia: '2025-06-08', total: 1 },
    { dia: '2025-06-09', total: 1 },
    { dia: '2025-06-10', total: 1 },
    { dia: '2025-06-11', total: 0 },
    { dia: '2025-06-12', total: 1 },
  ],
  top5_ranking: MOCK_RANKING.map((r) => ({
    posicao: r.posicao, nome: r.nome, perfil: r.perfil,
    total_estrelas: r.total_estrelas, total_sessoes: r.total_sessoes,
  })),
};

/* ---------- Helper: delay simulando latência de rede ---------- */
export const delay = (ms = 400) => new Promise((res) => setTimeout(res, ms));
