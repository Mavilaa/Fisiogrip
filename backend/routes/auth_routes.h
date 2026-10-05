#pragma once
#include "httplib.h"

class AuthRoutes {
public:
    static void register_(httplib::Server& server);
};
