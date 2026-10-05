#pragma once
#include <mysql_driver.h>
#include <mysql_connection.h>
#include <string>
#include <memory>

// Singleton para conexão com MySQL
class DBConnection {
public:
    static DBConnection& getInstance() {
        static DBConnection instance;
        return instance;
    }

    bool connect(const std::string& host, const std::string& user,
                 const std::string& pass, const std::string& db, int port = 3306);

    sql::Connection* get() { return conn_.get(); }

private:
    DBConnection() = default;
    std::unique_ptr<sql::Connection> conn_;
};
