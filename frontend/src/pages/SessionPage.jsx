// pages/SessionPage.jsx
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { encerrarSessaoApi } from '../api/sessionApi';
import { useSession } from '../context/SessionContext';
import { useBluetooth } from '../context/BluetoothContext';
import { bluetoothService } from '../services/bluetoothService';
import LiveFeedback from '../components/LiveFeedback';
import { LEVELS } from '../data/levels';

const MODO_ICON = { luva: '🧤', bola: '⚽', pisada: '👟', ritmo: '🎵' };
const NIVEL_LABEL = { facil: 'Fácil', medio: 'Médio', dificil: 'Difícil' };

export default function SessionPage() {
  const { sessaoAtiva, atualizarLeitura, encerrarSessao } = useSession();
  const { dispositivo } = useBluetooth();
  const navigate = useNavigate();

  const [tempo, setTempo] = useState(0);
  const [forca, setForca] = useState(0);
  const [ritmo, setRitmo] = useState(0);
  const [encerr, setEncerr] = useState(false);
  const timerRef = useRef(null);

  const levelData = LEVELS.find((l) => l.id === sessaoAtiva?.nivel) || LEVELS[0];

  // Cronômetro
  useEffect(() => {
    timerRef.current = setInterval(() => setTempo((t) => t + 1), 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  // Escuta dados do Bluetooth (simulado)
  useEffect(() => {
    if (!dispositivo) return;
    const unsub = bluetoothService.listen((pkt) => {
      setForca(pkt.forca_media ?? 0);
      setRitmo(pkt.ritmo_score ?? 0);
      atualizarLeitura(pkt.forca_media ?? 0, pkt.ritmo_score ?? 0);
    });
    return () => unsub?.();
  }, []);

  async function handleEncerrar() {
    clearInterval(timerRef.current);
    setEncerr(true);
    try {
      const { data } = await encerrarSessaoApi({
        id_sessao: sessaoAtiva.id,
        pacote_bt: { forca_media: forca, ritmo_score: ritmo },
      });
      encerrarSessao();
      navigate('/result', { state: data });
    } catch {
      alert('Erro ao encerrar sessão. Tente novamente.');
      setEncerr(false);
    }
  }

  if (!sessaoAtiva) { navigate('/dashboard'); return null; }

  const mm = String(Math.floor(tempo / 60)).padStart(2, '0');
  const ss = String(tempo % 60).padStart(2, '0');

  return (
    <div className="page-wrapper" style={{ maxWidth: 540 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 32 }}>
        <div style={{
          width: 52, height: 52, borderRadius: 14, background: 'var(--primary-light)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26,
        }}>
          {MODO_ICON[sessaoAtiva.modo] || '🏃'}
        </div>
        <div>
          <h1 style={{ fontSize: 18, fontWeight: 800, margin: 0, textTransform: 'capitalize' }}>
            {sessaoAtiva.modo}
          </h1>
          <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 2 }}>
            Nível: <strong style={{ color: 'var(--primary)' }}>{NIVEL_LABEL[sessaoAtiva.nivel] || sessaoAtiva.nivel}</strong>
          </div>
        </div>
      </div>

      <div className="card" style={{ textAlign: 'center', marginBottom: 20 }}>
        <div className="timer-label">Tempo de sessão</div>
        <div className="timer-display" style={{ color: 'var(--primary)' }}>
          {mm}:{ss}
        </div>
      </div>

      <div className="card" style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-2)', marginBottom: 16 }}>
          📊 Dados em tempo real
        </h2>
        <LiveFeedback
          forcaAtual={forca}
          forcaMeta={levelData.forca_meta}
          ritmoScore={ritmo}
        />
      </div>

      <div className="card-sm" style={{ marginBottom: 28, display: 'flex', gap: 20, justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 600, marginBottom: 2 }}>META DE FORÇA</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--primary)' }}>{levelData.forca_meta}</div>
        </div>
        <div style={{ width: 1, background: 'var(--border)' }} />
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 600, marginBottom: 2 }}>RITMO ALVO</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--primary)' }}>{levelData.ritmo_bpm} bpm</div>
        </div>
      </div>

      <button
        id="btn-encerrar-sessao"
        onClick={handleEncerrar}
        disabled={encerr}
        className="btn btn-danger btn-full"
        style={{ padding: '15px', fontSize: 16, borderRadius: 'var(--radius-md)' }}
      >
        {encerr ? (
          <><span className="spinner" style={{ width: 18, height: 18, borderWidth: 2, borderTopColor: '#fff', borderColor: 'rgba(255,255,255,0.3)' }} /> Encerrando...</>
        ) : '⏹ Encerrar Sessão'}
      </button>
    </div>
  );
}
