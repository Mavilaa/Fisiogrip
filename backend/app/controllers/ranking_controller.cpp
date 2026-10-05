#include "ranking_controller.h"
#include "../models/ranking_model.h"

void RankingController::geral(httplib::Response& res) {
    json result = RankingModel::readGeral();
    res.set_content(result.dump(), "application/json");
}

void RankingController::porUsuario(int id, httplib::Response& res) {
    json result = RankingModel::readByUsuario(id);
    res.set_content(result.dump(), "application/json");
}
