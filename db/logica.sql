-- ===========================================
-- FisioGrasp — Lógica (Procedures específicas)
-- ===========================================
USE fisiogrip;

DELIMITER $$

-- -----------------------------------------------
-- sp_encerrar_sessao
-- Encerra sessão e insere dados calculados
-- -----------------------------------------------
CREATE PROCEDURE IF NOT EXISTS sp_encerrar_sessao(
    IN p_id_sessao      INT,
    IN p_forca_media    DOUBLE,
    IN p_ritmo_score    DOUBLE,
    IN p_variacao_ritmo DOUBLE,
    IN p_tempo_total_ms INT
)
BEGIN
    CALL sp_sessao_update(p_id_sessao, NOW());
    CALL sp_dados_sessao_create(
        p_id_sessao,
        p_forca_media,
        p_ritmo_score,
        p_variacao_ritmo,
        p_tempo_total_ms
    );
END$$

-- -----------------------------------------------
-- sp_calcular_ranking
-- Recalcula ranking completo (uso administrativo)
-- -----------------------------------------------
CREATE PROCEDURE IF NOT EXISTS sp_calcular_ranking()
BEGIN
    TRUNCATE TABLE ranking;

    INSERT INTO ranking (id_usuario, total_estrelas, total_sessoes, ultima_sessao)
    SELECT
        s.id_usuario,
        COALESCE(SUM(ds.estrelas), 0),
        COUNT(s.id),
        MAX(s.iniciado_em)
    FROM sessao s
    LEFT JOIN dados_sessao ds ON ds.id_sessao = s.id
    GROUP BY s.id_usuario;

    SET @pos = 0;
    UPDATE ranking
    SET posicao = (@pos := @pos + 1)
    ORDER BY total_estrelas DESC;
END$$

-- -----------------------------------------------
-- sp_limpar_sessoes_antigas
-- Remove sessões sem dados há mais de N dias
-- -----------------------------------------------
CREATE PROCEDURE IF NOT EXISTS sp_limpar_sessoes_antigas(
    IN p_dias INT
)
BEGIN
    DELETE s FROM sessao s
    LEFT JOIN dados_sessao ds ON ds.id_sessao = s.id
    WHERE ds.id_sessao IS NULL
      AND s.iniciado_em < DATE_SUB(NOW(), INTERVAL p_dias DAY);
END$$

DELIMITER ;
