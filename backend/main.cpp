// ===========================================
// FisioGrasp — Back-end C++ (main)
// Inicializa servidor HTTP, conexão DB e rotas
// ===========================================
// Dependências sugeridas:
//   - httplib (cpp-httplib) para servidor HTTP
//   - mysql-connector-c++ para banco de dados
//   - nlohmann/json para parsing JSON
// ===========================================

#include "app/repository/db_connection.h"
#include "routes/router.h"
#include "httplib.h"
#include <iostream>
#include <cstdlib>
#include <string>

// Valor da variável de ambiente (.env) ou o padrão, se não existir
static std::string env(const char* nome, const char* padrao) {
    const char* v = std::getenv(nome);
    return (v && *v) ? v : padrao;
}

int main() {
    // Conecta ao banco de dados (Singleton)
    DBConnection& db = DBConnection::getInstance();
    if (!db.connect(env("DB_HOST", "localhost"), env("DB_USER", "root"),
                    env("DB_PASS", ""), env("DB_NAME", "fisiogrip"),
                    std::stoi(env("DB_PORT", "3306")))) {
        std::cerr << "[ERRO] Falha ao conectar ao MySQL\n";
        return 1;
    }
    std::cout << "[OK] Banco de dados conectado\n";

    // Inicia servidor HTTP
    httplib::Server server;

    // Registra todas as rotas
    Router::registerAll(server);

    int porta = std::stoi(env("SERVER_PORT", "8080"));
    std::cout << "[OK] Servidor rodando em http://localhost:" << porta << "\n";
    server.listen("0.0.0.0", porta);

    return 0;
}
