#include "jwt_manager.h"
#include <jwt-cpp/jwt.h>
#include <iostream>
#include <chrono>

// Troque por uma chave secreta real em produção (variável de ambiente / .env)
const std::string JwtManager::SECRET = "fisiogrip_secret_key_2024_troque_em_producao";

std::string JwtManager::generate(int id_usuario, const std::string& email, bool is_admin) {
    auto now = std::chrono::system_clock::now();
    auto token = jwt::create()
        .set_type("JWT")
        .set_issuer("fisiogrip")
        .set_issued_at(now)
        .set_expires_at(now + std::chrono::hours(24))
        .set_payload_claim("id", jwt::claim(picojson::value((int64_t)id_usuario)))
        .set_payload_claim("email", jwt::claim(std::string(email)))
        .set_payload_claim("is_admin", jwt::claim(picojson::value(is_admin)))
        .sign(jwt::algorithm::hs256{SECRET});
    return token;
}

bool JwtManager::validate(const std::string& token) {
    try {
        auto decoded = jwt::decode(token);
        auto verifier = jwt::verify()
            .allow_algorithm(jwt::algorithm::hs256{SECRET})
            .with_issuer("fisiogrip");
        verifier.verify(decoded);
        return true;
    } catch (const std::exception& e) {
        std::cerr << "[JWT ERROR] " << e.what() << "\n";
        return false;
    }
}

int JwtManager::getUserId(const std::string& token) {
    try {
        auto decoded = jwt::decode(token);
        return (int)decoded.get_payload_claim("id").as_integer();
    } catch (const std::exception&) {
        return -1;
    }
}

bool JwtManager::isAdmin(const std::string& token) {
    try {
        auto decoded = jwt::decode(token);
        return decoded.get_payload_claim("is_admin").as_boolean();
    } catch (const std::exception&) {
        return false;
    }
}

std::string JwtManager::getEmail(const std::string& token) {
    try {
        auto decoded = jwt::decode(token);
        return decoded.get_payload_claim("email").as_string();
    } catch (const std::exception&) {
        return "";
    }
}
