// utils/parseBluetoothPacket.js
// Parseia string raw do Arduino
// Formato: "SESSAO|modo:luva|forca_media:420|ritmo_score:87|variacao:5|tempo:30000"

export function parseBluetoothPacket(raw = '') {
  const result = {
    modo:           '',
    forca_media:    0,
    ritmo_score:    0,
    variacao_ritmo: 0,
    tempo_total_ms: 0,
  };

  raw.split('|').forEach((token) => {
    const [key, val] = token.split(':');
    if (!key || !val) return;
    switch (key.trim()) {
      case 'modo':         result.modo           = val; break;
      case 'forca_media':  result.forca_media    = parseFloat(val); break;
      case 'ritmo_score':  result.ritmo_score    = parseFloat(val); break;
      case 'variacao':     result.variacao_ritmo = parseFloat(val); break;
      case 'tempo':        result.tempo_total_ms = parseInt(val, 10); break;
    }
  });

  return result;
}
