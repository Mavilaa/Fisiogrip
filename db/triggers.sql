-- ===========================================
-- FisioGrasp — Triggers
-- Gerencia e valida entradas de todas as tabelas
-- ===========================================
USE fisiogrip;

DELIMITER $$

-- -----------------------------------------------
-- USUARIO: valida email antes de inserir
-- -----------------------------------------------
CREATE TRIGGER IF NOT EXISTS trg_usuario_before_insert
BEFORE INSERT ON usuario
FOR EACH ROW
BEGIN
    IF NEW.email NOT LIKE '%@%.%' THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Email invalido';
    END IF;
    IF LENGTH(NEW.senha) < 8 THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Senha deve ter ao menos 8 caracteres';
    END IF;
END$$

-- -----------------------------------------------
-- DISPOSITIVO: garante que só 1 dispositivo
-- por usuário fique is_active = 1 por vez
-- -----------------------------------------------
CREATE TRIGGER IF NOT EXISTS trg_dispositivo_before_update
BEFORE UPDATE ON dispositivo
FOR EACH ROW
BEGIN
    IF NEW.is_active = 1 THEN
        UPDATE dispositivo
        SET is_active = 0
        WHERE id_usuario = NEW.id_usuario AND id <> NEW.id;
    END IF;
END$$

-- -----------------------------------------------
-- SESSAO: bloqueia inserção se dispositivo
-- não estiver ativo (is_active = 0)
-- -----------------------------------------------
CREATE TRIGGER IF NOT EXISTS trg_sessao_before_insert
BEFORE INSERT ON sessao
FOR EACH ROW
BEGIN
    DECLARE v_ativo TINYINT(1);
    SELECT is_active INTO v_ativo FROM dispositivo WHERE id = NEW.id_dispositivo;
    IF v_ativo = 0 THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Dispositivo nao esta ativo';
    END IF;
END$$

-- -----------------------------------------------
-- DADOS_SESSAO: após inserção, atualiza ranking
-- do usuário automaticamente
-- -----------------------------------------------
CREATE TRIGGER IF NOT EXISTS trg_dados_sessao_after_insert
AFTER INSERT ON dados_sessao
FOR EACH ROW
BEGIN
    DECLARE v_id_usuario INT;
    DECLARE v_total_estrelas INT;
    DECLARE v_total_sessoes  INT;

    SELECT id_usuario INTO v_id_usuario FROM sessao WHERE id = NEW.id_sessao;

    SELECT COALESCE(SUM(ds.estrelas), 0), COUNT(ds.id_sessao)
    INTO   v_total_estrelas, v_total_sessoes
    FROM   dados_sessao ds
    JOIN   sessao s ON s.id = ds.id_sessao
    WHERE  s.id_usuario = v_id_usuario;

    INSERT INTO ranking (id_usuario, total_estrelas, total_sessoes, ultima_sessao)
    VALUES (v_id_usuario, v_total_estrelas, v_total_sessoes, NOW())
    ON DUPLICATE KEY UPDATE
        total_estrelas = v_total_estrelas,
        total_sessoes  = v_total_sessoes,
        ultima_sessao  = NOW();

    -- Recalcula posições de todo o ranking
    SET @pos = 0;
    UPDATE ranking
    SET posicao = (@pos := @pos + 1)
    ORDER BY total_estrelas DESC;
END$$

-- -----------------------------------------------
-- DADOS_SESSAO: valida estrelas (1–3)
-- -----------------------------------------------
CREATE TRIGGER IF NOT EXISTS trg_dados_sessao_before_insert
BEFORE INSERT ON dados_sessao
FOR EACH ROW
BEGIN
    IF NEW.forca_media < 0 OR NEW.ritmo_score < 0 THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Valores de forca e ritmo nao podem ser negativos';
    END IF;
    IF NEW.ritmo_score > 100 THEN
        SET NEW.ritmo_score = 100;
    END IF;
END$$

DELIMITER ;
