#include "session_routes.h"
#include "../security/auth_guard.h"
#include "../app/controllers/session_controller.h"
#include "nlohmann/json.hpp"
using json = nlohmann::json;

void SessionRoutes::register_(httplib::Server& server) {

    // POST /sessao/iniciar
    server.Post("/sessao/iniciar", [](const httplib::Request& req, httplib::Response& res) {
        if (!AuthGuard::check(req, res)) return;
        auto body = json::parse(req.body, nullptr, false);
        SessionController::iniciar(body, res);
    });

    // POST /sessao/encerrar
    server.Post("/sessao/encerrar", [](const httplib::Request& req, httplib::Response& res) {
        if (!AuthGuard::check(req, res)) return;
        auto body = json::parse(req.body, nullptr, false);
        SessionController::encerrar(body, res);
    });

    // GET /sessao/historico/:id_usuario
    server.Get(R"(/sessao/historico/(\d+))", [](const httplib::Request& req, httplib::Response& res) {
        if (!AuthGuard::check(req, res)) return;
        int id_usuario = std::stoi(req.matches[1]);
        SessionController::historico(id_usuario, res);
    });
}
