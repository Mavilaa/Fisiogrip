#pragma once
#include <unordered_map>
#include <chrono>
#include <string>

// Limita tentativas por IP (máx 10 req/min em rotas sensíveis)
class RateLimiter {
public:
    static bool allow(const std::string& ip) {
        auto now = std::chrono::steady_clock::now();
        auto& entry = table_[ip];

        // Reseta contador após 60 segundos
        if (std::chrono::duration_cast<std::chrono::seconds>(now - entry.first).count() > 60) {
            entry = { now, 1 };
            return true;
        }
        if (entry.second >= 10) return false;
        entry.second++;
        return true;
    }
private:
    static std::unordered_map<
        std::string,
        std::pair<std::chrono::steady_clock::time_point, int>
    > table_;
};
