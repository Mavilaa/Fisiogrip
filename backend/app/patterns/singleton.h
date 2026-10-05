#pragma once

// Padrão Singleton genérico
// Uso: class MinhaClasse : public Singleton<MinhaClasse> { ... };
template<typename T>
class Singleton {
public:
    static T& getInstance() {
        static T instance;
        return instance;
    }
    Singleton(const Singleton&) = delete;
    Singleton& operator=(const Singleton&) = delete;
protected:
    Singleton() = default;
};
