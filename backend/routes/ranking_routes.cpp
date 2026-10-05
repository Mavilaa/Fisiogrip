#include "ranking_routes.h"
#include "../security/auth_guard.h"
#include "../app/controllers/ranking_controller.h"

void RankingRoutes::register_(httplib::Server& server) {

    // GET /ranking/geral
    server.Get("/ranking/geral", [](const httplib::Request& req, httplib::Response& res) {
        if (!AuthGuard::check(req, res)) return;
        RankingController::geral(res);
    });

    // GET /ranking/usuario/:id
    server.Get(R"(/ranking/usuario/(\d+))", [](const httplib::Request& req, httplib::Response& res) {
        if (!AuthGuard::check(req, res)) return;
        int id = std::stoi(req.matches[1]);
        RankingController::porUsuario(id, res);
    });
}
