#pragma once
#include <string>
#include <algorithm>
#include <cctype>
#include <unordered_set>

// Lista de emails com privilégios de administrador.
// Edite esta lista para adicionar/remover admins do sistema.
class AdminConfig {
public:
    static bool isAdmin(const std::string& email) {
        std::string e = email;
        std::transform(e.begin(), e.end(), e.begin(),
                       [](unsigned char c) { return std::tolower(c); });
        static const std::unordered_set<std::string> admins = {
            "admin@fisiogrip.com",
            "gustavo@fisiogrip.com"
            // adicione novos emails de administrador aqui
        };
        return admins.count(e) > 0;
    }
};
