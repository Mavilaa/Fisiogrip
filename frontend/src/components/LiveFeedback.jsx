// components/LiveFeedback.jsx — Barra de força e ritmo em tempo real durante o exercício
export default function LiveFeedback({ forcaAtual, forcaMeta, ritmoScore }) {
  const pct = Math.min((forcaAtual / Math.max(forcaMeta, 1)) * 100, 100);
  const cor =
    pct >= 70 ? 'var(--success)' :
    pct >= 40 ? 'var(--warning)' : 'var(--danger)';
  const label =
    pct >= 70 ? '💪 Ótimo!' :
    pct >= 40 ? '⚡ Continue!' : '🔥 Force mais!';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      {/* Força */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-2)' }}>Força aplicada</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: cor }}>
            {forcaAtual} <span style={{ color: 'var(--muted)', fontWeight: 400 }}>/ {forcaMeta}</span>
          </span>
        </div>
        <div className="progress-bar-wrap" style={{ height: 22 }}>
          <div className="progress-bar-fill" style={{ width: `${pct}%`, background: cor }} />
        </div>
        <div style={{ textAlign: 'right', marginTop: 4, fontSize: 12, color: cor, fontWeight: 600 }}>
          {label}
        </div>
      </div>

      {/* Ritmo */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-2)' }}>Score de ritmo</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary)' }}>
            {typeof ritmoScore === 'number' ? ritmoScore.toFixed(1) : 0}%
          </span>
        </div>
        <div className="progress-bar-wrap" style={{ height: 22 }}>
          <div className="progress-bar-fill" style={{ width: `${ritmoScore}%`, background: 'var(--primary)' }} />
        </div>
      </div>
    </div>
  );
}
