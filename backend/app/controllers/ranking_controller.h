#pragma once
#include "httplib.h"
class RankingController {
public:
    static void geral(httplib::Response& res);
    static void porUsuario(int id, httplib::Response& res);
};
