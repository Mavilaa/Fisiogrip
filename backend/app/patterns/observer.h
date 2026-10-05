#pragma once
#include <vector>
#include <functional>
#include <string>
#include <nlohmann/json.hpp>

using json = nlohmann::json;

// Observer: notifica listeners quando uma sessão é encerrada
// Uso: SessionObserver::subscribe([](json data){ ... });
class SessionObserver {
public:
    using Handler = std::function<void(const json&)>;

    static void subscribe(Handler handler) {
        handlers_.push_back(handler);
    }

    // Chamado pelo SessionController após encerrar sessão
    static void notify(const json& sessao_data) {
        for (auto& h : handlers_) {
            h(sessao_data);
        }
    }

private:
    static std::vector<Handler> handlers_;
};

// Inicialização do vetor estático (em observer.cpp ou no main)
// std::vector<SessionObserver::Handler> SessionObserver::handlers_;
