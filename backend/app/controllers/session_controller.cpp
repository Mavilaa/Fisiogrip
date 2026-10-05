#include "session_controller.h"
#include "../models/sessao_model.h"
#include "../models/dados_sessao_model.h"
#include "../services/score_service.h"
#include "../services/bluetooth_service.h"

void SessionController::iniciar(const json& body, httplib::Response& res) {
    int    id_usuario     = body.value("id_usuario",     0);
    int    id_dispositivo = body.value("id_dispositivo", 0);
    std::string modo      = body.value("modo",  "luva");
    std::string nivel     = body.value("nivel", "facil");

    if (id_usuario == 0 || id_dispositivo == 0) {
        res.status = 400;
        res.set_content("{\"error\":\"Dados insuficientes\"}", "application/json");
        return;
    }

    json result = SessaoModel::create(id_usuario, id_dispositivo, modo, nivel);
    res.set_content(result.dump(), "application/json");
}

void SessionController::encerrar(const json& body, httplib::Response& res) {
    // Recebe pacote parseado do Arduino (via BluetoothService)
    int    id_sessao = body.value("id_sessao", 0);
    std::string pacote_bt = body.value("pacote_bt", "");

    BluetoothPacket pkt = BluetoothService::parse(pacote_bt);
    int estrelas = ScoreService::calcularEstrelas(pkt.forca_media, pkt.ritmo_score);

    // Encerra sessão na tabela sessao
    SessaoModel::encerrar(id_sessao, pkt.encerrado_em);

    // Insere dados (trigger atualiza ranking automaticamente)
    json result = DadosSessaoModel::create(
        id_sessao,
        pkt.forca_media,
        pkt.ritmo_score,
        pkt.variacao_ritmo,
        pkt.tempo_total_ms
    );

    json resp = result;
    resp["estrelas"] = estrelas;
    res.set_content(resp.dump(), "application/json");
}

void SessionController::historico(int id_usuario, httplib::Response& res) {
    json result = SessaoModel::readByUsuario(id_usuario);
    res.set_content(result.dump(), "application/json");
}
