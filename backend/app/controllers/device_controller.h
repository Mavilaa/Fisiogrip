#pragma once
#include "httplib.h"
#include <nlohmann/json.hpp>
using json = nlohmann::json;

class DeviceController {
public:
    static void listar(int id_usuario, httplib::Response& res);
    static void conectar(const json& body, httplib::Response& res);
};
