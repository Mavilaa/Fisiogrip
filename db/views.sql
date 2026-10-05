-- ===========================================
-- FisioGrasp — Views
-- ===========================================
USE fisiogrip;

-- -----------------------------------------------
-- View: ranking geral ordenado por estrelas
-- -----------------------------------------------
CREATE OR REPLACE VIEW vw_ranking_geral AS
    SELECT
        r.posicao,
        u.nome,
        u.perfil,
        r.total_estrelas,
        r.total_sessoes,
        r.ultima_sessao
    FROM ranking r
    JOIN usuario u ON u.id = r.id_usuario
    ORDER BY r.total_estrelas DESC;

-- -----------------------------------------------
-- View: histórico completo de sessões
-- -----------------------------------------------
CREATE OR REPLACE VIEW vw_historico_sessoes AS
    SELECT
        s.id            AS sessao_id,
        u.nome          AS usuario,
        d.nome_bt       AS dispositivo,
        s.modo,
        s.nivel,
        ds.forca_media,
        ds.ritmo_score,
        ds.estrelas,
        ds.tempo_total_ms,
        s.iniciado_em,
        s.encerrado_em
    FROM sessao s
    JOIN usuario     u  ON u.id  = s.id_usuario
    JOIN dispositivo d  ON d.id  = s.id_dispositivo
    LEFT JOIN dados_sessao ds ON ds.id_sessao = s.id
    ORDER BY s.iniciado_em DESC;

-- -----------------------------------------------
-- View: média de desempenho por modo e usuário
-- -----------------------------------------------
CREATE OR REPLACE VIEW vw_media_por_modo AS
    SELECT
        s.id_usuario,
        u.nome,
        s.modo,
        ROUND(AVG(ds.forca_media),  2) AS media_forca,
        ROUND(AVG(ds.ritmo_score),  2) AS media_ritmo,
        ROUND(AVG(ds.estrelas),     2) AS media_estrelas,
        COUNT(s.id)                    AS total_sessoes
    FROM sessao s
    JOIN usuario       u  ON u.id      = s.id_usuario
    JOIN dados_sessao  ds ON ds.id_sessao = s.id
    GROUP BY s.id_usuario, s.modo;
