#pragma once
#include <string>
#include <algorithm>

// Remove caracteres perigosos para prevenir SQL Injection
class Sanitizer {
public:
    static std::string clean(std::string input) {
        // Remove aspas simples, duplas, ponto-e-vírgula e barras
        const std::string forbidden = "'\";<>\\";
        input.erase(std::remove_if(input.begin(), input.end(),
            [&](char c){ return forbidden.find(c) != std::string::npos; }
        ), input.end());
        return input;
    }
};
