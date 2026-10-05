#pragma once
#include "httplib.h"
#include <nlohmann/json.hpp>

using json = nlohmann::json;

// Rotas administrativas: acesso somente para emails cadastrados
// em AdminConfig (ver security/admin_config.h)
class AdminController {
public:
    // Lista todos os usuários cadastrados (sem o campo senha)
    static void listUsuarios(httplib::Response& res);

    // Lista todas as sessões de todos os usuários (via vw_historico_sessoes)
    static void listSessoes(httplib::Response& res);

    // Levantamento agregado: totais, médias e distribuição de uso
    static void relatorio(httplib::Response& res);
};
