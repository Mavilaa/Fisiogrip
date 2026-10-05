#include "router.h"
#include "auth_routes.h"
#include "session_routes.h"
#include "device_routes.h"
#include "ranking_routes.h"
#include "admin_routes.h"

void Router::registerAll(httplib::Server& server) {
    AuthRoutes::register_(server);
    SessionRoutes::register_(server);
    DeviceRoutes::register_(server);
    RankingRoutes::register_(server);
    AdminRoutes::register_(server);
}
