// pages/ResultPage.jsx
import { useLocation, useNavigate } from 'react-router-dom';
import StarRating from '../components/StarRating';

const MESSAGES = [
  { label: 'Continue tentando!',   sub: 'Cada sessão te aproxima do objetivo.',  icon: '💪', color: 'var(--warning)' },
  { label: 'Bom trabalho!',        sub: 'Você está evoluindo consistentemente.', icon: '👍', color: 'var(--primary)' },
  { label: 'Excelente resultado!', sub: 'Performance incrível! Continue assim.', icon: '🎉', color: 'var(--success)' },
];

export default function ResultPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) { navigate('/dashboard'); return null; }

  const { estrelas, forca_media, ritmo_score, tempo_total_ms } = state;
  const idx = Math.min(Math.max((estrelas ?? 1) - 1, 0), 2);
  const msg = MESSAGES[idx];

  return (
    <div className="page-wrapper fade-in-up" style={{ maxWidth: 440, textAlign: 'center' }}>
      <h1 style={{ fontSize: 20, fontWeight: 800, marginBottom: 24 }}>Resultado da Sessão</h1>

      <div className="card result-stars" style={{ marginBottom: 20, padding: '32px 24px' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>{msg.icon}</div>
        <div style={{ justifyContent: 'center', display: 'flex', marginBottom: 14 }}>
          <StarRating estrelas={estrelas} large />
        </div>
        <div style={{ fontSize: 20, fontWeight: 800, color: msg.color, marginBottom: 6 }}>
          {msg.label}
        </div>
        <div style={{ fontSize: 14, color: 'var(--muted)' }}>{msg.sub}</div>
      </div>

      <div className="card" style={{ marginBottom: 24, textAlign: 'left' }}>
        <h2 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-2)', marginBottom: 14 }}>
          📊 Detalhes da sessão
        </h2>
        <div className="result-stat">
          <span className="result-stat-label">💪 Força média</span>
          <span className="result-stat-value">{forca_media}</span>
        </div>
        <div className="result-stat">
          <span className="result-stat-label">🎵 Score de ritmo</span>
          <span className="result-stat-value">{ritmo_score}%</span>
        </div>
        <div className="result-stat">
          <span className="result-stat-label">⏱ Duração</span>
          <span className="result-stat-value">{(tempo_total_ms / 1000).toFixed(1)}s</span>
        </div>
        <div className="result-stat">
          <span className="result-stat-label">⭐ Estrelas</span>
          <span className="result-stat-value">{estrelas} / 3</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12 }}>
        <button
          id="btn-nova-sessao"
          onClick={() => navigate('/dashboard')}
          className="btn btn-primary"
          style={{ flex: 1, padding: '13px' }}
        >
          Nova sessão
        </button>
        <button
          id="btn-ver-ranking"
          onClick={() => navigate('/ranking')}
          className="btn btn-outline"
          style={{ flex: 1, padding: '13px' }}
        >
          🏆 Ranking
        </button>
      </div>
    </div>
  );
}
