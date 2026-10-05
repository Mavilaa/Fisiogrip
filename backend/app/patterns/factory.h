#pragma once
#include <string>
#include <nlohmann/json.hpp>
#include "../repository/base_repository.h"

using json = nlohmann::json;

// Factory: cria chamada ao model correto pelo nome da entidade
class ModelFactory {
public:
    static json call(const std::string& entidade,
                     const std::string& acao,
                     const json& params) {
        // Valida entidades permitidas
        const std::vector<std::string> permitidas = {
            "usuario", "dispositivo", "sessao", "dados_sessao", "ranking"
        };
        for (auto& e : permitidas) {
            if (e == entidade) {
                return BaseRepository::callModel(entidade, acao, params);
            }
        }
        return json{ {"error", "Entidade desconhecida: " + entidade} };
    }
};
