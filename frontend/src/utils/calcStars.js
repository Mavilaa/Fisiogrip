// utils/calcStars.js
// Espelho da fn_calcular_estrelas do MySQL — preview local

export function calcStars(forca_media, ritmo_score) {
  const score = (forca_media * 0.40) + (ritmo_score * 0.60);
  if (score >= 85) return 3;
  if (score >= 60) return 2;
  return 1;
}
