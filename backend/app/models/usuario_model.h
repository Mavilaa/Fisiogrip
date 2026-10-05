#pragma once
#include "../repository/base_repository.h"
#include <string>

// Model de Usuário — chama sp_model via BaseRepository
class UsuarioModel {
public:
    static json create(const std::string& nome, const std::string& email,
                       const std::string& senha, const std::string& perfil) {
        json params = {
            {"nome",   nome},
            {"email",  email},
            {"senha",  senha},
            {"perfil", perfil}
        };
        return BaseRepository::callModel("usuario", "create", params);
    }

    static json read(int id = -1) {
        json params = { {"id", id == -1 ? json(nullptr) : json(id)} };
        return BaseRepository::callModel("usuario", "read", params);
    }

    static json update(int id, const std::string& nome,
                       const std::string& email, const std::string& perfil) {
        json params = { {"id", id}, {"nome", nome}, {"email", email}, {"perfil", perfil} };
        return BaseRepository::callModel("usuario", "update", params);
    }

    static json remove(int id) {
        json params = { {"id", id} };
        return BaseRepository::callModel("usuario", "delete", params);
    }
};
