#pragma once
#include "../repository/base_repository.h"

class DadosSessaoModel {
public:
    static json create(int id_sessao, double forca_media, double ritmo_score,
                       double variacao_ritmo, int tempo_total_ms) {
        json params = {
            {"id_sessao",      id_sessao},
            {"forca_media",    forca_media},
            {"ritmo_score",    ritmo_score},
            {"variacao_ritmo", variacao_ritmo},
            {"tempo_total_ms", tempo_total_ms}
        };
        return BaseRepository::callModel("dados_sessao", "create", params);
    }

    static json read(int id_sessao) {
        json params = { {"id_sessao", id_sessao} };
        return BaseRepository::callModel("dados_sessao", "read", params);
    }
};
