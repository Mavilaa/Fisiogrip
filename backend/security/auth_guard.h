#pragma once
#include "httplib.h"
#include "jwt_manager.h"

class AuthGuard {
public:
    // Verifica token JWT no header Authorization
    // Retorna false e seta res.status=401 se inválido
    static bool check(const httplib::Request& req, httplib::Response& res) {
        auto it = req.headers.find("Authorization");
        if (it == req.headers.end()) {
            res.status = 401;
            res.set_content("{\"error\":\"Token ausente\"}", "application/json");
            return false;
        }
        std::string token = it->second;
        if (token.rfind("Bearer ", 0) == 0) token = token.substr(7);

        if (!JwtManager::validate(token)) {
            res.status = 401;
            res.set_content("{\"error\":\"Token invalido ou expirado\"}", "application/json");
            return false;
        }
        return true;
    }

    // Verifica token JWT + exige que o usuário seja administrador
    static bool checkAdmin(const httplib::Request& req, httplib::Response& res) {
        if (!check(req, res)) return false;

        std::string token = req.headers.find("Authorization")->second;
        if (token.rfind("Bearer ", 0) == 0) token = token.substr(7);

        if (!JwtManager::isAdmin(token)) {
            res.status = 403;
            res.set_content("{\"error\":\"Acesso restrito a administradores\"}", "application/json");
            return false;
        }
        return true;
    }
};
