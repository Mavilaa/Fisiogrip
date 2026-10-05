// pages/DeviceListPage.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { listarDispositivosApi } from '../api/deviceApi';
import { useAuth } from '../context/AuthContext';
import { useBluetooth } from '../context/BluetoothContext';
import BluetoothCard from '../components/BluetoothCard';

export default function DeviceListPage() {
  const { user } = useAuth();
  const { conectar, conectado, dispositivo, conectando } = useBluetooth();
  const navigate = useNavigate();
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listarDispositivosApi(user.id_usuario)
      .then(({ data }) => setDevices(data))
      .catch(() => setDevices([]))
      .finally(() => setLoading(false));
  }, [user.id_usuario]);

  async function handleConnect(device) {
    await conectar(device);
    setTimeout(() => navigate('/dashboard'), 600);
  }

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <h1 className="page-title">📡 Dispositivos Bluetooth</h1>
        <p className="page-subtitle">
          Selecione o dispositivo FisioGrasp para iniciar a sessão.
        </p>
      </div>

      {conectado && (
        <div className="alert alert-success">
          <span>✅</span>
          <div style={{ flex: 1 }}>
            Conectado a <strong>{dispositivo?.nome_bt}</strong>
          </div>
          <button
            onClick={() => navigate('/dashboard')}
            className="btn btn-success btn-sm"
          >
            Ir para o painel
          </button>
        </div>
      )}

      {loading ? (
        <div className="spinner-wrap">
          <div className="spinner" />
          Buscando dispositivos...
        </div>
      ) : devices.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📡</div>
          <div className="empty-state-text">Nenhum dispositivo encontrado</div>
          <div className="empty-state-sub">Certifique-se de que a luva está ligada e próxima.</div>
        </div>
      ) : (
        <div>
          {devices.map((d) => (
            <BluetoothCard
              key={d.id}
              device={d}
              onConnect={handleConnect}
              loading={conectando}
            />
          ))}
        </div>
      )}

      <div className="card" style={{ marginTop: 24, background: 'var(--primary-light)', border: '1px solid #d5cfff' }}>
        <div style={{ fontSize: 13, color: 'var(--primary)', fontWeight: 600, marginBottom: 4 }}>
          💡 Modo simulado ativo
        </div>
        <div style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6 }}>
          Os dados de força e ritmo serão simulados automaticamente após a conexão.
          Para integrar o hardware real (luva Arduino HC-05), conecte o dispositivo Bluetooth.
        </div>
      </div>
    </div>
  );
}
