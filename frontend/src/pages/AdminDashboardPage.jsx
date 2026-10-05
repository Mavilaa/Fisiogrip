// pages/AdminDashboardPage.jsx
import { useEffect, useState } from 'react';
import { adminUsuariosApi, adminSessoesApi, adminRelatorioApi } from '../api/adminApi';

/* ── helpers ── */
function Spinner() {
  return (
    <div className="spinner-wrap">
      <div className="spinner" /> Carregando dados...
    </div>
  );
}

function StatCard({ label, value, icon, color }) {
  return (
    <div className="stat-card">
      <div style={{ fontSize: 26, marginBottom: 6 }}>{icon}</div>
      <div className="stat-value" style={{ color: color || 'var(--primary)', fontSize: 26 }}>{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

function DataTable({ columns, rows, emptyText = 'Sem dados.' }) {
  if (!rows || rows.length === 0) {
    return (
      <div className="empty-state" style={{ padding: '24px' }}>
        <div style={{ fontSize: 32 }}>📭</div>
        <div className="empty-state-text">{emptyText}</div>
      </div>
    );
  }
  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            {columns.map((c) => <th key={c.key}>{c.label}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {columns.map((c) => (
                <td key={c.key}>
                  {c.render ? c.render(row[c.key], row) : (row[c.key] ?? '—')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── badges ── */
const PERFIL_BADGE = { motor: 'badge-primary', tdah: 'badge-warning', autismo: 'badge-success', outro: 'badge-muted', admin: 'badge-danger' };
const PERFIL_LABEL = { motor: 'Motor', tdah: 'TDAH', autismo: 'Autismo', outro: 'Outro', admin: 'Admin' };
const NIVEL_BADGE  = { facil: 'badge-success', medio: 'badge-warning', dificil: 'badge-danger' };
const NIVEL_LABEL  = { facil: 'Fácil', medio: 'Médio', dificil: 'Difícil' };
const MODO_ICON    = { luva: '🧤', bola: '⚽', pisada: '👟', ritmo: '🎵' };

/* ─────────────────────────────────────────────── */
export default function AdminDashboardPage() {
  const [tab, setTab] = useState('relatorio'); // relatorio | usuarios | sessoes
  const [usuarios, setUsuarios] = useState(null);
  const [sessoes, setSessoes] = useState(null);
  const [relatorio, setRelatorio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  function carregarTudo() {
    setLoading(true);
    setErro('');
    Promise.all([adminUsuariosApi(), adminSessoesApi(), adminRelatorioApi()])
      .then(([u, s, r]) => {
        setUsuarios(u.data);
        setSessoes(s.data);
        setRelatorio(r.data);
      })
      .catch(() => setErro('Não foi possível carregar os dados.'))
      .finally(() => setLoading(false));
  }

  useEffect(carregarTudo, []);

  function exportarCSV() {
    if (!sessoes || sessoes.length === 0) return;
    const cols = Object.keys(sessoes[0]);
    const linhas = [
      cols.join(','),
      ...sessoes.map((s) => cols.map((c) => `"${s[c] ?? ''}"`).join(',')),
    ];
    const blob = new Blob([linhas.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fisiogrip_sessoes_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  /* ── Colunas das tabelas ── */
  const colsUsuarios = [
    { key: 'id_usuario', label: 'ID' },
    { key: 'nome',       label: 'Nome',   render: (v) => <strong>{v}</strong> },
    { key: 'email',      label: 'Email',  render: (v) => <span style={{ color: 'var(--muted)' }}>{v}</span> },
    { key: 'perfil',     label: 'Perfil', render: (v) => (
      <span className={`badge ${PERFIL_BADGE[v] || 'badge-muted'}`}>{PERFIL_LABEL[v] || v}</span>
    ) },
    { key: 'criado_em',  label: 'Cadastro', render: (v) => v ? new Date(v).toLocaleDateString('pt-BR') : '—' },
  ];

  const colsSessoes = [
    { key: 'id',             label: 'ID' },
    { key: 'usuario',        label: 'Usuário', render: (v) => <strong>{v}</strong> },
    { key: 'modo',           label: 'Modo', render: (v) => <span>{MODO_ICON[v]} {v}</span> },
    { key: 'nivel',          label: 'Nível', render: (v) => (
      <span className={`badge ${NIVEL_BADGE[v] || 'badge-muted'}`}>{NIVEL_LABEL[v] || v}</span>
    ) },
    { key: 'estrelas',       label: '⭐', render: (v) => ['', '⭐', '⭐⭐', '⭐⭐⭐'][v] || v },
    { key: 'forca_media',    label: 'Força', render: (v) => <strong>{v}</strong> },
    { key: 'ritmo_score',    label: 'Ritmo', render: (v) => `${v}%` },
    { key: 'tempo_total_ms', label: 'Duração', render: (v) => `${(v / 1000).toFixed(0)}s` },
    { key: 'iniciado_em',    label: 'Data', render: (v) => v ? new Date(v).toLocaleDateString('pt-BR') : '—' },
  ];

  const colsPerfil = [
    { key: 'perfil', label: 'Perfil', render: (v) => (
      <span className={`badge ${PERFIL_BADGE[v?.toLowerCase()] || 'badge-muted'}`}>{PERFIL_LABEL[v?.toLowerCase()] || v}</span>
    ) },
    { key: 'total', label: 'Total', render: (v) => <strong>{v}</strong> },
  ];

  const colsModo = [
    { key: 'modo',  label: 'Modo', render: (v) => <span>{MODO_ICON[v?.toLowerCase()] || ''} {v}</span> },
    { key: 'total', label: 'Sessões', render: (v) => <strong>{v}</strong> },
  ];

  const colsNivel = [
    { key: 'nivel', label: 'Nível', render: (v) => (
      <span className={`badge ${NIVEL_BADGE[v?.toLowerCase()] || 'badge-muted'}`}>{NIVEL_LABEL[v?.toLowerCase()] || v}</span>
    ) },
    { key: 'total', label: 'Sessões', render: (v) => <strong>{v}</strong> },
  ];

  const colsDias = [
    { key: 'dia',   label: 'Data', render: (v) => new Date(v + 'T12:00:00').toLocaleDateString('pt-BR') },
    { key: 'total', label: 'Sessões', render: (v) => <strong>{v}</strong> },
  ];

  const colsRanking = [
    { key: 'posicao',        label: '#', render: (v) => ['🥇', '🥈', '🥉'][v - 1] || v },
    { key: 'nome',           label: 'Usuário', render: (v) => <strong>{v}</strong> },
    { key: 'perfil',         label: 'Perfil', render: (v) => (
      <span className={`badge ${PERFIL_BADGE[v?.toLowerCase()] || 'badge-muted'}`}>{PERFIL_LABEL[v?.toLowerCase()] || v}</span>
    ) },
    { key: 'total_estrelas', label: 'Estrelas', render: (v) => <strong style={{ color: 'var(--accent)' }}>⭐ {v}</strong> },
    { key: 'total_sessoes',  label: 'Sessões', render: (v) => v },
  ];

  /* ── render ── */
  return (
    <div className="page-wrapper-wide">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 className="page-title">🛠️ Painel Administrativo</h1>
          <p className="page-subtitle">Visão geral de todos os usuários e sessões da plataforma.</p>
        </div>
        <button onClick={carregarTudo} className="btn btn-ghost btn-sm">
          🔄 Atualizar
        </button>
      </div>

      {erro && <div className="alert alert-danger">⚠️ {erro}</div>}

      <div className="tabs">
        {[
          ['relatorio', '📊 Levantamento'],
          ['usuarios',  '👥 Usuários'],
          ['sessoes',   '🏋️ Sessões'],
        ].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`tab-btn${tab === key ? ' active' : ''}`}
          >
            {label}
          </button>
        ))}
      </div>

      {loading ? <Spinner /> : (
        tab === 'relatorio' ? (
          <div>
            <div className="stat-grid">
              <StatCard icon="👥" label="Usuários"    value={relatorio?.totais?.total_usuarios}    color="var(--primary)" />
              <StatCard icon="🏋️" label="Sessões"     value={relatorio?.totais?.total_sessoes}      color="var(--success)" />
              <StatCard icon="⭐" label="Estrelas"    value={relatorio?.totais?.total_estrelas}     color="var(--accent)" />
              <StatCard icon="💪" label="Força média" value={relatorio?.totais?.media_forca_geral}  color="var(--warning)" />
              <StatCard icon="🎵" label="Ritmo médio" value={`${relatorio?.totais?.media_ritmo_geral}%`} color="var(--danger)" />
            </div>

            <div className="grid-2" style={{ marginBottom: 16 }}>
              <div className="card">
                <h2 style={{ fontSize: 14, fontWeight: 700, marginBottom: 14, color: 'var(--text-2)' }}>
                  Usuários por perfil
                </h2>
                <DataTable columns={colsPerfil} rows={relatorio?.usuarios_por_perfil} />
              </div>
              <div className="card">
                <h2 style={{ fontSize: 14, fontWeight: 700, marginBottom: 14, color: 'var(--text-2)' }}>
                  Sessões por modo
                </h2>
                <DataTable columns={colsModo} rows={relatorio?.sessoes_por_modo} />
              </div>
              <div className="card">
                <h2 style={{ fontSize: 14, fontWeight: 700, marginBottom: 14, color: 'var(--text-2)' }}>
                  Sessões por nível
                </h2>
                <DataTable columns={colsNivel} rows={relatorio?.sessoes_por_nivel} />
              </div>
              <div className="card">
                <h2 style={{ fontSize: 14, fontWeight: 700, marginBottom: 14, color: 'var(--text-2)' }}>
                  Últimos 7 dias
                </h2>
                <DataTable columns={colsDias} rows={relatorio?.sessoes_ultimos_7_dias} />
              </div>
            </div>

            <div className="card" style={{ marginBottom: 20 }}>
              <h2 style={{ fontSize: 14, fontWeight: 700, marginBottom: 14, color: 'var(--text-2)' }}>
                🏆 Top 5 do Ranking
              </h2>
              <DataTable columns={colsRanking} rows={relatorio?.top5_ranking} />
            </div>

            <button id="btn-exportar-csv" onClick={exportarCSV} className="btn btn-success">
              ⬇️ Exportar sessões (CSV)
            </button>
          </div>
        ) : tab === 'usuarios' ? (
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
              <h2 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-2)', margin: 0 }}>
                {usuarios?.length || 0} usuários cadastrados
              </h2>
            </div>
            <DataTable columns={colsUsuarios} rows={usuarios} emptyText="Nenhum usuário cadastrado." />
          </div>
        ) : (
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
              <h2 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-2)', margin: 0 }}>
                {sessoes?.length || 0} sessões registradas
              </h2>
              <button onClick={exportarCSV} className="btn btn-success btn-sm">
                ⬇️ Exportar CSV
              </button>
            </div>
            <DataTable columns={colsSessoes} rows={sessoes} emptyText="Nenhuma sessão registrada ainda." />
          </div>
        )
      )}
    </div>
  );
}
