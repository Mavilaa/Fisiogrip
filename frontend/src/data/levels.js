// data/levels.js
export const LEVELS = [
  {
    id:             'facil',
    label:          'Fácil',
    forca_meta:     200,   // valor FSR alvo
    ritmo_bpm:      40,    // batidas por minuto do metrônomo
    tolerancia:     0.30,  // 30% de margem de erro aceita
  },
  {
    id:             'medio',
    label:          'Médio',
    forca_meta:     400,
    ritmo_bpm:      60,
    tolerancia:     0.20,
  },
  {
    id:             'dificil',
    label:          'Difícil',
    forca_meta:     650,
    ritmo_bpm:      80,
    tolerancia:     0.10,
  },
];
