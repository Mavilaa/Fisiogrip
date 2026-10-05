// context/BluetoothContext.jsx — Mock
import { createContext, useContext, useState } from 'react';
import { conectarDispositivoApi } from '../api/deviceApi';
import { bluetoothService } from '../services/bluetoothService';

const BluetoothContext = createContext(null);

export function BluetoothProvider({ children }) {
  const [dispositivo, setDispositivo] = useState(null);
  const [conectado, setConectado] = useState(false);
  const [conectando, setConectando] = useState(false);

  async function conectar(device) {
    setConectando(true);
    try {
      await conectarDispositivoApi(device.id);
      bluetoothService.startSimulation();
      setDispositivo(device);
      setConectado(true);
    } finally {
      setConectando(false);
    }
  }

  function desconectar() {
    bluetoothService.stopSimulation();
    setDispositivo(null);
    setConectado(false);
  }

  return (
    <BluetoothContext.Provider value={{ dispositivo, conectado, conectando, conectar, desconectar }}>
      {children}
    </BluetoothContext.Provider>
  );
}

export const useBluetooth = () => useContext(BluetoothContext);
