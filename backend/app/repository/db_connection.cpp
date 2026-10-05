#include "db_connection.h"
#include <mysql_driver.h>
#include <cppconn/exception.h>
#include <iostream>

bool DBConnection::connect(const std::string& host, const std::string& user,
                           const std::string& pass, const std::string& db, int port) {
    try {
        sql::mysql::MySQL_Driver* driver = sql::mysql::get_mysql_driver_instance();
        std::string url = "tcp://" + host + ":" + std::to_string(port);
        conn_.reset(driver->connect(url, user, pass));
        conn_->setSchema(db);
        return true;
    } catch (sql::SQLException& e) {
        std::cerr << "[DB ERROR] " << e.what() << "\n";
        return false;
    }
}
