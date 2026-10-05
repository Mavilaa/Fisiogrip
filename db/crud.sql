-- ===========================================
-- FisioGrasp — CRUD (Stored Procedures)
-- Cada entidade tem: create, read, update, delete
-- ===========================================
USE fisiogrip;

DELIMITER $$

-- =============================================
-- USUARIO
-- =============================================
CREATE PROCEDURE IF NOT EXISTS sp_usuario_create(
    IN p_nome   VARCHAR(100),
    IN p_email  VARCHAR(150),
    IN p_senha  VARCHAR(255),
    IN p_perfil ENUM('motor','tdah','autismo','outro')
)
BEGIN
    INSERT INTO usuario (nome, email, senha, perfil)
    VALUES (p_nome, p_email, p_senha, p_perfil);
    SELECT LAST_INSERT_ID() AS id;
END$$

CREATE PROCEDURE IF NOT EXISTS sp_usuario_read(
    IN p_id INT  -- NULL = todos
)
BEGIN
    IF p_id IS NULL THEN
        SELECT * FROM usuario;
    ELSE
        SELECT * FROM usuario WHERE id = p_id;
    END IF;
END$$

CREATE PROCEDURE IF NOT EXISTS sp_usuario_update(
    IN p_id    INT,
    IN p_nome  VARCHAR(100),
    IN p_email VARCHAR(150),
    IN p_perfil ENUM('motor','tdah','autismo','outro')
)
BEGIN
    UPDATE usuario
    SET nome = p_nome, email = p_email, perfil = p_perfil
    WHERE id = p_id;
END$$

CREATE PROCEDURE IF NOT EXISTS sp_usuario_delete(
    IN p_id INT
)
BEGIN
    DELETE FROM usuario WHERE id = p_id;
END$$

-- =============================================
-- DISPOSITIVO
-- =============================================
CREATE PROCEDURE IF NOT EXISTS sp_dispositivo_create(
    IN p_id_usuario INT,
    IN p_nome_bt    VARCHAR(100)
)
BEGIN
    INSERT INTO dispositivo (id_usuario, nome_bt)
    VALUES (p_id_usuario, p_nome_bt);
    SELECT LAST_INSERT_ID() AS id;
END$$

CREATE PROCEDURE IF NOT EXISTS sp_dispositivo_read(
    IN p_id_usuario INT
)
BEGIN
    SELECT * FROM dispositivo WHERE id_usuario = p_id_usuario;
END$$

CREATE PROCEDURE IF NOT EXISTS sp_dispositivo_update(
    IN p_id         INT,
    IN p_can_active TINYINT(1),
    IN p_is_active  TINYINT(1)
)
BEGIN
    UPDATE dispositivo
    SET can_active = p_can_active, is_active = p_is_active
    WHERE id = p_id;
END$$

CREATE PROCEDURE IF NOT EXISTS sp_dispositivo_delete(
    IN p_id INT
)
BEGIN
    DELETE FROM dispositivo WHERE id = p_id;
END$$

-- =============================================
-- SESSAO
-- =============================================
CREATE PROCEDURE IF NOT EXISTS sp_sessao_create(
    IN p_id_usuario     INT,
    IN p_id_dispositivo INT,
    IN p_modo           ENUM('luva','bola','pisada','ritmo'),
    IN p_nivel          ENUM('facil','medio','dificil')
)
BEGIN
    INSERT INTO sessao (id_usuario, id_dispositivo, modo, nivel)
    VALUES (p_id_usuario, p_id_dispositivo, p_modo, p_nivel);
    SELECT LAST_INSERT_ID() AS id;
END$$

CREATE PROCEDURE IF NOT EXISTS sp_sessao_read(
    IN p_id         INT,
    IN p_id_usuario INT  -- NULL = busca por id direto
)
BEGIN
    IF p_id_usuario IS NOT NULL THEN
        SELECT * FROM vw_historico_sessoes WHERE usuario = (SELECT nome FROM usuario WHERE id = p_id_usuario);
    ELSE
        SELECT * FROM sessao WHERE id = p_id;
    END IF;
END$$

CREATE PROCEDURE IF NOT EXISTS sp_sessao_update(
    IN p_id          INT,
    IN p_encerrado_em DATETIME
)
BEGIN
    UPDATE sessao SET encerrado_em = p_encerrado_em WHERE id = p_id;
END$$

CREATE PROCEDURE IF NOT EXISTS sp_sessao_delete(
    IN p_id INT
)
BEGIN
    DELETE FROM sessao WHERE id = p_id;
END$$

-- =============================================
-- DADOS_SESSAO
-- =============================================
CREATE PROCEDURE IF NOT EXISTS sp_dados_sessao_create(
    IN p_id_sessao      INT,
    IN p_forca_media    DOUBLE,
    IN p_ritmo_score    DOUBLE,
    IN p_variacao_ritmo DOUBLE,
    IN p_tempo_total_ms INT
)
BEGIN
    DECLARE v_estrelas INT;
    SET v_estrelas = fn_calcular_estrelas(p_forca_media, p_ritmo_score);

    INSERT INTO dados_sessao
        (id_sessao, forca_media, ritmo_score, variacao_ritmo, tempo_total_ms, estrelas)
    VALUES
        (p_id_sessao, p_forca_media, p_ritmo_score, p_variacao_ritmo, p_tempo_total_ms, v_estrelas);
END$$

CREATE PROCEDURE IF NOT EXISTS sp_dados_sessao_read(
    IN p_id_sessao INT
)
BEGIN
    SELECT * FROM dados_sessao WHERE id_sessao = p_id_sessao;
END$$

-- =============================================
-- RANKING
-- =============================================
CREATE PROCEDURE IF NOT EXISTS sp_ranking_read(
    IN p_id_usuario INT  -- NULL = ranking geral
)
BEGIN
    IF p_id_usuario IS NULL THEN
        SELECT * FROM vw_ranking_geral;
    ELSE
        SELECT * FROM ranking WHERE id_usuario = p_id_usuario;
    END IF;
END$$

DELIMITER ;
