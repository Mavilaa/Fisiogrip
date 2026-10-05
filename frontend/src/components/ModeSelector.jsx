// components/ModeSelector.jsx
import { MODES } from '../data/modes';

export default function ModeSelector({ selected, onSelect }) {
  return (
    <div className="mode-grid">
      {MODES.map((m) => (
        <button
          key={m.id}
          onClick={() => onSelect(m.id)}
          className={`mode-card${selected === m.id ? ' selected' : ''}`}
          type="button"
        >
          <div className="mode-card-icon">{m.icone}</div>
          <div className="mode-card-label">{m.label}</div>
          <div className="mode-card-desc">{m.descricao}</div>
        </button>
      ))}
    </div>
  );
}
