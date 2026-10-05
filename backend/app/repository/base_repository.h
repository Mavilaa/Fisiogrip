#pragma once
#include "db_connection.h"
#include <cppconn/prepared_statement.h>
#include <cppconn/statement.h>
#include <cppconn/resultset.h>
#include <nlohmann/json.hpp>
#include <string>
#include <memory>

using json = nlohmann::json;

// Executa sp_model e retorna resultset como JSON array
class BaseRepository {
public:
    // Chama: CALL sp_model(entidade, acao, json_params)
    static json callModel(const std::string& entidade,
                          const std::string& acao,
                          const json& params) {
        sql::Connection* conn = DBConnection::getInstance().get();
        json result = json::array();
        try {
            std::unique_ptr<sql::PreparedStatement> stmt(
                conn->prepareStatement("CALL sp_model(?, ?, ?)")
            );
            stmt->setString(1, entidade);
            stmt->setString(2, acao);
            stmt->setString(3, params.dump());

            bool hasResult = stmt->execute();
            if (hasResult) {
                std::unique_ptr<sql::ResultSet> rs(stmt->getResultSet());
                sql::ResultSetMetaData* meta = rs->getMetaData();
                int cols = meta->getColumnCount();
                while (rs->next()) {
                    json row;
                    for (int i = 1; i <= cols; i++) {
                        row[meta->getColumnName(i)] = rs->getString(i);
                    }
                    result.push_back(row);
                }
            }
        } catch (sql::SQLException& e) {
            result = json{ {"error", e.what()} };
        }
        return result;
    }

    // Executa uma query SELECT fixa (definida no código, nunca com input do
    // usuário concatenado) e retorna o resultado como JSON array.
    // Usado por rotas administrativas que consultam views/agregados.
    static json rawSelect(const std::string& sql) {
        sql::Connection* conn = DBConnection::getInstance().get();
        json result = json::array();
        try {
            std::unique_ptr<sql::Statement> stmt(conn->createStatement());
            std::unique_ptr<sql::ResultSet> rs(stmt->executeQuery(sql));
            sql::ResultSetMetaData* meta = rs->getMetaData();
            int cols = meta->getColumnCount();
            while (rs->next()) {
                json row;
                for (int i = 1; i <= cols; i++) {
                    row[meta->getColumnName(i)] = rs->getString(i);
                }
                result.push_back(row);
            }
        } catch (sql::SQLException& e) {
            result = json{ {"error", e.what()} };
        }
        return result;
    }
};
