#pragma once
#include "httplib.h"
#include <nlohmann/json.hpp>
#include <string>

using json = nlohmann::json;

class AuthController {
public:
    static void login(const std::string& email, const std::string& senha,
                      httplib::Response& res);
    static void registerUser(const json& body, httplib::Response& res);
    static void logout(const httplib::Request& req, httplib::Response& res);
};
