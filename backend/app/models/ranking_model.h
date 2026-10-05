#pragma once
#include "../repository/base_repository.h"

class RankingModel {
public:
    // Retorna ranking geral (id_usuario = nullptr)
    static json readGeral() {
        json params = { {"id_usuario", nullptr} };
        return BaseRepository::callModel("ranking", "read", params);
    }

    // Retorna ranking de um usuário específico
    static json readByUsuario(int id_usuario) {
        json params = { {"id_usuario", id_usuario} };
        return BaseRepository::callModel("ranking", "read", params);
    }
};
