// services/bluetoothService.js
// Mock: simula dados do Arduino em tempo real (sem hardware real conectado).
//
// Para conectar o hardware real no futuro, restaure a implementação Web
// Bluetooth (comentada em connectReal()) e troque o startSimulation()
// pela chamada connectReal() dentro de BluetoothContext.jsx.

import { parseBluetoothPacket } from '../utils/parseBluetoothPacket';

let _interval = null;
let _lastPacket = { forca_media: 0, ritmo_score: 0, variacao: 0 };
let _forca = 300;
const _listeners = [];

function _gerarLeitura() {
  // Simula variação orgânica de força e ritmo
  _forca = Math.max(100, Math.min(700, _forca + (Math.random() - 0.45) * 40));
  const ritmo = Math.max(0, Math.min(100, 60 + (Math.random() - 0.5) * 20));
  _lastPacket = {
    forca_media: Math.round(_forca),
    ritmo_score: parseFloat(ritmo.toFixed(1)),
    variacao: parseFloat((Math.random() * 30).toFixed(1)),
  };
  _listeners.forEach((fn) => fn(_lastPacket));
}

export const bluetoothService = {
  // Inicia simulação de dados ao "conectar"
  startSimulation() {
    if (_interval) clearInterval(_interval);
    _forca = 300;
    _interval = setInterval(_gerarLeitura, 800);
  },

  stopSimulation() {
    if (_interval) { clearInterval(_interval); _interval = null; }
  },

  // Implementação real via Web Bluetooth API (HC-05) — desativada no modo mock.
  // Restaure esta função e chame-a no lugar de startSimulation() para
  // conectar ao dispositivo Arduino de verdade.
  async connectReal() {
    const device = await navigator.bluetooth.requestDevice({
      filters: [{ namePrefix: 'FisioGrasp' }],
      optionalServices: ['0000ffe0-0000-1000-8000-00805f9b34fb'],
    });
    const server = await device.gatt.connect();
    const service = await server.getPrimaryService('0000ffe0-0000-1000-8000-00805f9b34fb');
    const characteristic = await service.getCharacteristic('0000ffe1-0000-1000-8000-00805f9b34fb');
    await characteristic.startNotifications();
    characteristic.addEventListener('characteristicvaluechanged', (e) => {
      const raw = new TextDecoder().decode(e.target.value);
      const pkt = parseBluetoothPacket(raw);
      _listeners.forEach((fn) => fn(pkt));
    });
    return device.name;
  },

  // Registra listener para dados recebidos
  listen(callback) {
    _listeners.push(callback);
    return () => {
      const idx = _listeners.indexOf(callback);
      if (idx > -1) _listeners.splice(idx, 1);
    };
  },

  getLastPacket: () => _lastPacket,
};
