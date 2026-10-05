#include "admin_controller.h"
#include "../repository/base_repository.h"

void AdminController::listUsuarios(httplib::Response& res) {
    json usuarios = BaseRepository::rawSelect(
        "SELECT id, nome, email, perfil, criado_em FROM usuario ORDER BY id"
    );
    res.set_content(usuarios.dump(), "application/json");
}

void AdminController::listSessoes(httplib::Response& res) {
    json sessoes = BaseRepository::rawSelect(
        "SELECT * FROM vw_historico_sessoes"
    );
    res.set_content(sessoes.dump(), "application/json");
}

void AdminController::relatorio(httplib::Response& res) {
    json out;

    // Totais gerais
    json totais = BaseRepository::rawSelect(
        "SELECT "
        "  (SELECT COUNT(*) FROM usuario) AS total_usuarios, "
        "  (SELECT COUNT(*) FROM sessao) AS total_sessoes, "
        "  (SELECT COALESCE(SUM(estrelas),0) FROM dados_sessao) AS total_estrelas, "
        "  (SELECT ROUND(COALESCE(AVG(forca_media),0),2) FROM dados_sessao) AS media_forca_geral, "
        "  (SELECT ROUND(COALESCE(AVG(ritmo_score),0),2) FROM dados_sessao) AS media_ritmo_geral"
    );
    out["totais"] = totais.empty() ? json::object() : totais[0];

    // Distribuição de usuários por perfil
    out["usuarios_por_perfil"] = BaseRepository::rawSelect(
        "SELECT perfil, COUNT(*) AS total FROM usuario GROUP BY perfil"
    );

    // Sessões por modo de exercício
    out["sessoes_por_modo"] = BaseRepository::rawSelect(
        "SELECT modo, COUNT(*) AS total FROM sessao GROUP BY modo"
    );

    // Sessões por nível de dificuldade
    out["sessoes_por_nivel"] = BaseRepository::rawSelect(
        "SELECT nivel, COUNT(*) AS total FROM sessao GROUP BY nivel"
    );

    // Top 5 do ranking geral
    out["top5_ranking"] = BaseRepository::rawSelect(
        "SELECT posicao, nome, perfil, total_estrelas, total_sessoes "
        "FROM vw_ranking_geral ORDER BY total_estrelas DESC LIMIT 5"
    );

    // Sessões nos últimos 7 dias (para acompanhar engajamento recente)
    out["sessoes_ultimos_7_dias"] = BaseRepository::rawSelect(
        "SELECT DATE(iniciado_em) AS dia, COUNT(*) AS total "
        "FROM sessao WHERE iniciado_em >= DATE_SUB(NOW(), INTERVAL 7 DAY) "
        "GROUP BY DATE(iniciado_em) ORDER BY dia"
    );

    res.set_content(out.dump(), "application/json");
}
