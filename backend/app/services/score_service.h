#pragma once

// Calcula estrelas no back-end (espelho da fn_calcular_estrelas do MySQL)
class ScoreService {
public:
    static int calcularEstrelas(double forca_media, double ritmo_score) {
        double score = (forca_media * 0.40) + (ritmo_score * 0.60);
        if (score >= 85) return 3;
        if (score >= 60) return 2;
        return 1;
    }
};
