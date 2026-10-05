-- ===========================================
-- FisioGrasp — Functions (suporte ao CRUD)
-- ===========================================
USE fisiogrip;

DELIMITER $$

-- -----------------------------------------------
-- fn_calcular_estrelas
-- Retorna 1, 2 ou 3 estrelas com base em
-- força média e ritmo score (0-100 cada)
-- -----------------------------------------------
CREATE FUNCTION IF NOT EXISTS fn_calcular_estrelas(
    p_forca_media  DOUBLE,
    p_ritmo_score  DOUBLE
)
RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE v_score DOUBLE;
    DECLARE v_estrelas INT;

    SET v_score = (p_forca_media * 0.40) + (p_ritmo_score * 0.60);

    IF v_score >= 85 THEN
        SET v_estrelas = 3;
    ELSEIF v_score >= 60 THEN
        SET v_estrelas = 2;
    ELSE
        SET v_estrelas = 1;
    END IF;

    RETURN v_estrelas;
END$$

-- -----------------------------------------------
-- fn_percentual_acerto
-- Calcula percentual relativo à meta de força
-- -----------------------------------------------
CREATE FUNCTION IF NOT EXISTS fn_percentual_acerto(
    p_forca_obtida DOUBLE,
    p_forca_meta   DOUBLE
)
RETURNS DOUBLE
DETERMINISTIC
BEGIN
    IF p_forca_meta = 0 THEN
        RETURN 0;
    END IF;
    RETURN LEAST((p_forca_obtida / p_forca_meta) * 100, 100);
END$$

-- -----------------------------------------------
-- fn_media_movel
-- Calcula a média de força das últimas N sessões
-- de um usuário (padrão: 5 sessões)
-- -----------------------------------------------
CREATE FUNCTION IF NOT EXISTS fn_media_movel(
    p_id_usuario INT,
    p_janela     INT
)
RETURNS DOUBLE
READS SQL DATA
BEGIN
    DECLARE v_media DOUBLE DEFAULT 0;

    SELECT COALESCE(AVG(ds.forca_media), 0)
    INTO   v_media
    FROM   dados_sessao ds
    JOIN   sessao s ON s.id = ds.id_sessao
    WHERE  s.id_usuario = p_id_usuario
    ORDER  BY s.iniciado_em DESC
    LIMIT  p_janela;

    RETURN v_media;
END$$

DELIMITER ;
