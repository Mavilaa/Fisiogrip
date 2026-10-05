#pragma once
#include "httplib.h"

// Registra todas as rotas da aplicação
class Router {
public:
    static void registerAll(httplib::Server& server);
};
