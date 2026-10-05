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

int main() {
    // Conecta ao banco de dados (Singleton)
    DBConnection& db = DBConnection::getInstance();
    if (!db.connect("localhost", "root", "senha", "fisiogrip", 3306)) {
        std::cerr << "[ERRO] Falha ao conectar ao MySQL\n";
        return 1;
    }
    std::cout << "[OK] Banco de dados conectado\n";

    // Inicia servidor HTTP
    httplib::Server server;

    // Registra todas as rotas
    Router::registerAll(server);

    std::cout << "[OK] Servidor rodando em http://localhost:8080\n";
    server.listen("0.0.0.0", 8080);

    return 0;
}
