// components/BluetoothCard.jsx
export default function BluetoothCard({ device, onConnect, loading }) {
  return (
    <div className={`bt-card${device.is_active ? ' active' : ''}`}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{
          width: 46, height: 46, borderRadius: 12,
          background: device.is_active ? 'var(--success-light)' : 'var(--primary-light)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
        }}>
          {device.is_active ? '✅' : '📡'}
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text)' }}>{device.nome_bt}</div>
          <div style={{ fontSize: 12, color: device.is_active ? 'var(--success)' : 'var(--muted)', marginTop: 2 }}>
            {device.is_active ? 'Conectado' : 'Disponível'}
          </div>
        </div>
      </div>
      <button
        className={`btn btn-sm ${device.is_active ? 'btn-success' : 'btn-primary'}`}
        onClick={() => onConnect(device)}
        disabled={device.is_active || loading}
      >
        {loading ? 'Conectando...' : device.is_active ? 'Conectado' : 'Conectar'}
      </button>
    </div>
  );
}
