#pragma once
#include "../repository/base_repository.h"
#include <string>

class SessaoModel {
public:
    static json create(int id_usuario, int id_dispositivo,
                       const std::string& modo, const std::string& nivel) {
        json params = {
            {"id_usuario",     id_usuario},
            {"id_dispositivo", id_dispositivo},
            {"modo",           modo},
            {"nivel",          nivel}
        };
        return BaseRepository::callModel("sessao", "create", params);
    }

    static json readByUsuario(int id_usuario) {
        json params = { {"id", nullptr}, {"id_usuario", id_usuario} };
        return BaseRepository::callModel("sessao", "read", params);
    }

    static json readById(int id) {
        json params = { {"id", id}, {"id_usuario", nullptr} };
        return BaseRepository::callModel("sessao", "read", params);
    }

    static json encerrar(int id, const std::string& encerrado_em) {
        json params = { {"id", id}, {"encerrado_em", encerrado_em} };
        return BaseRepository::callModel("sessao", "update", params);
    }

    static json remove(int id) {
        json params = { {"id", id} };
        return BaseRepository::callModel("sessao", "delete", params);
    }
};
