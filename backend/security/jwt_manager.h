#pragma once
#include <string>

// Gerencia criação e validação de tokens JWT (HS256, via jwt-cpp)
class JwtManager {
public:
    static std::string generate(int id_usuario, const std::string& email, bool is_admin);
    static bool        validate(const std::string& token);
    static int         getUserId(const std::string& token); // extrai "id" do payload (-1 se inválido)
    static bool        isAdmin(const std::string& token);   // extrai "is_admin" do payload
    static std::string getEmail(const std::string& token);  // extrai "email" do payload

private:
    static const std::string SECRET;
};
