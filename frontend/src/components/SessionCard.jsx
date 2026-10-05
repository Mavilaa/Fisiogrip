// components/SessionCard.jsx
import StarRating from './StarRating';
import { formatDate } from '../utils/formatDate';

const NIVEL_BADGE = { facil: 'badge-success', medio: 'badge-warning', dificil: 'badge-danger' };
const NIVEL_LABEL = { facil: 'Fácil', medio: 'Médio', dificil: 'Difícil' };
const MODO_ICON = { luva: '🧤', bola: '⚽', pisada: '👟', ritmo: '🎵' };

export default function SessionCard({ sessao }) {
  return (
    <div className="session-card">
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, flex: 1 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12, background: 'var(--primary-light)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0,
        }}>
          {MODO_ICON[sessao.modo] || '🏃'}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
            <strong style={{ fontSize: 14, textTransform: 'capitalize', color: 'var(--text)' }}>
              {sessao.modo}
            </strong>
            <span className={`badge ${NIVEL_BADGE[sessao.nivel] || 'badge-muted'}`}>
              {NIVEL_LABEL[sessao.nivel] || sessao.nivel}
            </span>
          </div>
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>
            {formatDate(sessao.iniciado_em)} · {(sessao.tempo_total_ms / 1000).toFixed(0)}s
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 2 }}>
            💪 Força: <strong>{sessao.forca_media}</strong> &nbsp;·&nbsp;
            🎵 Ritmo: <strong>{sessao.ritmo_score}%</strong>
          </div>
        </div>
      </div>
      <StarRating estrelas={sessao.estrelas} />
    </div>
  );
}
