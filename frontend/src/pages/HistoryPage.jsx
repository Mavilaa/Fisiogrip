// pages/HistoryPage.jsx
import { useEffect, useState } from 'react';
import { historicoSessaoApi } from '../api/sessionApi';
import { useAuth } from '../context/AuthContext';
import SessionCard from '../components/SessionCard';

export default function HistoryPage() {
  const { user } = useAuth();
  const [sessoes, setSessoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    historicoSessaoApi(user.id_usuario)
      .then(({ data }) => setSessoes(data))
      .catch(() => setSessoes([]))
      .finally(() => setLoading(false));
  }, [user.id_usuario]);

  const total = sessoes.length;
  const estrelas = sessoes.reduce((a, s) => a + (s.estrelas || 0), 0);
  const mediaForca = total > 0
    ? Math.round(sessoes.reduce((a, s) => a + (s.forca_media || 0), 0) / total)
    : 0;

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <h1 className="page-title">📋 Histórico de Sessões</h1>
        <p className="page-subtitle">Acompanhe sua evolução ao longo do tempo.</p>
      </div>

      {!loading && total > 0 && (
        <div className="stat-grid" style={{ marginBottom: 24 }}>
          <div className="stat-card">
            <div className="stat-value">{total}</div>
            <div className="stat-label">Sessões</div>
          </div>
          <div className="stat-card">
            <div className="stat-value" style={{ color: 'var(--accent)' }}>⭐ {estrelas}</div>
            <div className="stat-label">Estrelas</div>
          </div>
          <div className="stat-card">
            <div className="stat-value" style={{ color: 'var(--success)' }}>{mediaForca}</div>
            <div className="stat-label">Força média</div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="spinner-wrap">
          <div className="spinner" /> Carregando sessões...
        </div>
      ) : sessoes.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🏋️</div>
          <div className="empty-state-text">Nenhuma sessão ainda</div>
          <div className="empty-state-sub">Faça seu primeiro exercício e acompanhe a evolução aqui!</div>
        </div>
      ) : (
        <div>
          {[...sessoes].reverse().map((s, i) => (
            <SessionCard key={i} sessao={s} />
          ))}
        </div>
      )}
    </div>
  );
}
