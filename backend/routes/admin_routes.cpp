#include "admin_routes.h"
#include "../security/auth_guard.h"
#include "../app/controllers/admin_controller.h"

void AdminRoutes::register_(httplib::Server& server) {

    // GET /admin/usuarios — lista todos os usuários cadastrados
    server.Get("/admin/usuarios", [](const httplib::Request& req, httplib::Response& res) {
        if (!AuthGuard::checkAdmin(req, res)) return;
        AdminController::listUsuarios(res);
    });

    // GET /admin/sessoes — lista todas as sessões de todos os usuários
    server.Get("/admin/sessoes", [](const httplib::Request& req, httplib::Response& res) {
        if (!AuthGuard::checkAdmin(req, res)) return;
        AdminController::listSessoes(res);
    });

    // GET /admin/relatorio — levantamento agregado de uso da plataforma
    server.Get("/admin/relatorio", [](const httplib::Request& req, httplib::Response& res) {
        if (!AuthGuard::checkAdmin(req, res)) return;
        AdminController::relatorio(res);
    });
}
