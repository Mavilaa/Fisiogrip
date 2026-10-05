#include "auth_controller.h"
#include "../models/usuario_model.h"
#include "../../security/jwt_manager.h"
#include "../../security/sanitizer.h"
#include "../../security/admin_config.h"
#include <nlohmann/json.hpp>

using json = nlohmann::json;

void AuthController::login(const std::string& email, const std::string& senha,
                           httplib::Response& res) {
    // Busca usuário pelo email
    json usuarios = UsuarioModel::read(-1);

    for (auto& u : usuarios) {
        if (u["email"] == email) {
            // TODO: comparar hash bcrypt da senha
            // bool ok = bcrypt::validatePassword(senha, u["senha"]);
            bool ok = (senha == u["senha"]); // placeholder

            if (ok) {
                int id = std::stoi(u["id"].get<std::string>());
                bool admin = AdminConfig::isAdmin(email);
                std::string token = JwtManager::generate(id, email, admin);
                json resp = {
                    {"token", token},
                    {"id_usuario", id},
                    {"nome", u["nome"]},
                    {"is_admin", admin}
                };
                res.set_content(resp.dump(), "application/json");
                return;
            }
        }
    }
    res.status = 401;
    res.set_content("{\"error\":\"Credenciais invalidas\"}", "application/json");
}

void AuthController::registerUser(const json& body, httplib::Response& res) {
    std::string nome   = Sanitizer::clean(body.value("nome",   ""));
    std::string email  = Sanitizer::clean(body.value("email",  ""));
    std::string senha  = body.value("senha",  "");
    std::string perfil = body.value("perfil", "outro");

    if (nome.empty() || email.empty() || senha.size() < 8) {
        res.status = 400;
        res.set_content("{\"error\":\"Dados invalidos\"}", "application/json");
        return;
    }
    // TODO: gerar hash bcrypt da senha antes de salvar
    json result = UsuarioModel::create(nome, email, senha, perfil);

    if (result.is_object() && result.contains("error")) {
        std::string msg = result["error"].get<std::string>();
        res.status = (msg.find("Duplicate entry") != std::string::npos) ? 409 : 500;
        std::string friendly = (res.status == 409)
            ? "Este email ja esta cadastrado."
            : "Erro ao cadastrar usuario.";
        res.set_content(json{ {"error", friendly} }.dump(), "application/json");
        return;
    }

    res.set_content(result.dump(), "application/json");
}

void AuthController::logout(const httplib::Request&, httplib::Response& res) {
    // JWT é stateless — o cliente descarta o token
    res.set_content("{\"message\":\"Logout realizado\"}", "application/json");
}
