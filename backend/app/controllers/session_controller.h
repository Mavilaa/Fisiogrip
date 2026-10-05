#pragma once
#include "httplib.h"
#include <nlohmann/json.hpp>
using json = nlohmann::json;

class SessionController {
public:
    static void iniciar(const json& body, httplib::Response& res);
    static void encerrar(const json& body, httplib::Response& res);
    static void historico(int id_usuario, httplib::Response& res);
};
