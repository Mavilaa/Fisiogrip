#include "auth_routes.h"
#include "../security/auth_guard.h"
#include "../security/sanitizer.h"
#include "../app/controllers/auth_controller.h"
#include "nlohmann/json.hpp"

using json = nlohmann::json;

void AuthRoutes::register_(httplib::Server& server) {

    // POST /login
    server.Post("/login", [](const httplib::Request& req, httplib::Response& res) {
        auto body = json::parse(req.body, nullptr, false);
        if (body.is_discarded()) {
            res.status = 400;
            res.set_content("{\"error\":\"JSON invalido\"}", "application/json");
            return;
        }
        std::string email = Sanitizer::clean(body.value("email", ""));
        std::string senha = body.value("senha", "");
        AuthController::login(email, senha, res);
    });

    // POST /register
    server.Post("/register", [](const httplib::Request& req, httplib::Response& res) {
        auto body = json::parse(req.body, nullptr, false);
        if (body.is_discarded()) { res.status = 400; return; }
        AuthController::registerUser(body, res);
    });

    // POST /logout
    server.Post("/logout", [](const httplib::Request& req, httplib::Response& res) {
        if (!AuthGuard::check(req, res)) return;
        AuthController::logout(req, res);
    });
}
