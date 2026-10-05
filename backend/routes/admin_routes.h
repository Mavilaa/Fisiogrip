#pragma once
#include "httplib.h"

class AdminRoutes {
public:
    static void register_(httplib::Server& server);
};
