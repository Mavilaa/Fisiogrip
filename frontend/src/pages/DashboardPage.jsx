// pages/DashboardPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { iniciarSessaoApi } from '../api/sessionApi';
import { useAuth } from '../context/AuthContext';
import { useBluetooth } from '../context/BluetoothContext';
import { useSession } from '../context/SessionContext';
import ModeSelector from '../components/ModeSelector';
import { LEVELS } from '../data/levels';

const NIVEL_STYLE = {
  facil:   { active: { background: 'var(--success-light)', border: '2px solid var(--success)', color: '#1a6e69' } },
  medio:   { active: { background: 'var(--warning-light)', border: '2px solid var(--warning)', color: '#8a6000' } },
  dificil: { active: { background: 'var(--danger-light)',  border: '2px solid var(--danger)',  color: '#b03030' } },
};

export default function DashboardPage() {
  const { user } = useAuth();
  const { dispositivo, conectado } = useBluetooth();
  const { iniciarSessao } = useSession();
  const navigate = useNavigate();
  const [modo, setModo] = useState('luva');
  const [nivel, setNivel] = useState('facil');
  const [loading, setLoading] = useState(false);

  async function handleIniciar() {
    if (!conectado) {
      navigate('/devices');
      return;
    }
    setLoading(true);
    try {
      const { data } = await iniciarSessaoApi({
        id_usuario: user.id_usuario,
        id_dispositivo: dispositivo?.id,
        modo,
        nivel,
      });
      iniciarSessao({ ...data, modo, nivel });
      navigate('/session');
    } catch {
      alert('Erro ao iniciar sessão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  const inicial = user?.nome?.charAt(0)?.toUpperCase() || '?';

  return (
    <div className="page-wrapper">
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
        <div style={{
          width: 52, height: 52, borderRadius: 16, background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
          color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 22, fontWeight: 800, flexShrink: 0,
        }}>
          {inicial}
        </div>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 800, margin: 0 }}>
            Olá, {user?.nome?.split(' ')[0]}! 👋
          </h1>
          <p style={{ fontSize: 13, color: 'var(--muted)', margin: 0, marginTop: 2 }}>
            Pronto para o treino de hoje?
          </p>
        </div>
      </div>

      {!conectado && (
        <div className="alert alert-warning">
          <span>📡</span>
          <span>
            Nenhum dispositivo conectado.{' '}
            <button
              onClick={() => navigate('/devices')}
              style={{ background: 'none', border: 'none', color: '#8a6000', fontWeight: 700, cursor: 'pointer', padding: 0, textDecoration: 'underline' }}
            >
              Conectar agora
            </button>
          </span>
        </div>
      )}
      {conectado && (
        <div className="alert alert-success">
          <span>✅</span>
          <span>Dispositivo <strong>{dispositivo?.nome_bt}</strong> conectado e pronto!</span>
        </div>
      )}

      <div className="card" style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, color: 'var(--text-2)' }}>
          Escolha o exercício
        </h2>
        <ModeSelector selected={modo} onSelect={setModo} />
      </div>

      <div className="card" style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, color: 'var(--text-2)' }}>
          Nível de dificuldade
        </h2>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {LEVELS.map((l) => {
            const isSelected = nivel === l.id;
            const style = isSelected
              ? NIVEL_STYLE[l.id]?.active || { background: 'var(--primary-light)', border: '2px solid var(--primary)', color: 'var(--primary)' }
              : { background: 'var(--surface)', border: '1.5px solid var(--border)', color: 'var(--text-2)' };
            return (
              <button
                key={l.id}
                onClick={() => setNivel(l.id)}
                style={{
                  padding: '10px 22px', borderRadius: 'var(--radius-sm)', cursor: 'pointer',
                  fontFamily: 'var(--font)', fontWeight: 600, fontSize: 14,
                  transition: 'all var(--transition)', ...style,
                }}
              >
                {l.label}
              </button>
            );
          })}
        </div>
      </div>

      <button
        id="btn-iniciar-sessao"
        onClick={handleIniciar}
        disabled={loading}
        className="btn btn-primary btn-full"
        style={{ padding: '15px', fontSize: 16, borderRadius: 'var(--radius-md)' }}
      >
        {loading ? (
          <><span className="spinner" style={{ width: 18, height: 18, borderWidth: 2 }} /> Iniciando...</>
        ) : (
          <>{conectado ? '▶ Iniciar Sessão' : '📡 Conectar Dispositivo'}</>
        )}
      </button>
    </div>
  );
}
