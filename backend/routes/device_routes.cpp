#include "device_routes.h"
#include "../security/auth_guard.h"
#include "../app/controllers/device_controller.h"
#include "nlohmann/json.hpp"
using json = nlohmann::json;

void DeviceRoutes::register_(httplib::Server& server) {

    // GET /dispositivo/listar/:id_usuario
    server.Get(R"(/dispositivo/listar/(\d+))", [](const httplib::Request& req, httplib::Response& res) {
        if (!AuthGuard::check(req, res)) return;
        int id_usuario = std::stoi(req.matches[1]);
        DeviceController::listar(id_usuario, res);
    });

    // POST /dispositivo/conectar
    server.Post("/dispositivo/conectar", [](const httplib::Request& req, httplib::Response& res) {
        if (!AuthGuard::check(req, res)) return;
        auto body = json::parse(req.body, nullptr, false);
        DeviceController::conectar(body, res);
    });
}
