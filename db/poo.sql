-- ===========================================
-- FisioGrasp — POO (Model Gateway)
-- Ponto de entrada único para o back-end.
-- Recebe entidade + ação e roteia para o CRUD.
-- ===========================================
USE fisiogrip;

DELIMITER $$

CREATE PROCEDURE IF NOT EXISTS sp_model(
    IN p_entidade VARCHAR(50),   -- 'usuario' | 'dispositivo' | 'sessao' | 'dados_sessao' | 'ranking'
    IN p_acao     VARCHAR(10),   -- 'create' | 'read' | 'update' | 'delete'
    IN p_json     JSON           -- parâmetros serializados em JSON
)
BEGIN
    -- ---- USUARIO ----
    IF p_entidade = 'usuario' AND p_acao = 'create' THEN
        CALL sp_usuario_create(
            JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.nome')),
            JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.email')),
            JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.senha')),
            JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.perfil'))
        );

    ELSEIF p_entidade = 'usuario' AND p_acao = 'read' THEN
        CALL sp_usuario_read(JSON_EXTRACT(p_json, '$.id'));

    ELSEIF p_entidade = 'usuario' AND p_acao = 'update' THEN
        CALL sp_usuario_update(
            JSON_EXTRACT(p_json, '$.id'),
            JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.nome')),
            JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.email')),
            JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.perfil'))
        );

    ELSEIF p_entidade = 'usuario' AND p_acao = 'delete' THEN
        CALL sp_usuario_delete(JSON_EXTRACT(p_json, '$.id'));

    -- ---- DISPOSITIVO ----
    ELSEIF p_entidade = 'dispositivo' AND p_acao = 'create' THEN
        CALL sp_dispositivo_create(
            JSON_EXTRACT(p_json, '$.id_usuario'),
            JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.nome_bt'))
        );

    ELSEIF p_entidade = 'dispositivo' AND p_acao = 'read' THEN
        CALL sp_dispositivo_read(JSON_EXTRACT(p_json, '$.id_usuario'));

    ELSEIF p_entidade = 'dispositivo' AND p_acao = 'update' THEN
        CALL sp_dispositivo_update(
            JSON_EXTRACT(p_json, '$.id'),
            JSON_EXTRACT(p_json, '$.can_active'),
            JSON_EXTRACT(p_json, '$.is_active')
        );

    ELSEIF p_entidade = 'dispositivo' AND p_acao = 'delete' THEN
        CALL sp_dispositivo_delete(JSON_EXTRACT(p_json, '$.id'));

    -- ---- SESSAO ----
    ELSEIF p_entidade = 'sessao' AND p_acao = 'create' THEN
        CALL sp_sessao_create(
            JSON_EXTRACT(p_json, '$.id_usuario'),
            JSON_EXTRACT(p_json, '$.id_dispositivo'),
            JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.modo')),
            JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.nivel'))
        );

    ELSEIF p_entidade = 'sessao' AND p_acao = 'read' THEN
        CALL sp_sessao_read(
            JSON_EXTRACT(p_json, '$.id'),
            JSON_EXTRACT(p_json, '$.id_usuario')
        );

    ELSEIF p_entidade = 'sessao' AND p_acao = 'update' THEN
        CALL sp_sessao_update(
            JSON_EXTRACT(p_json, '$.id'),
            JSON_UNQUOTE(JSON_EXTRACT(p_json, '$.encerrado_em'))
        );

    ELSEIF p_entidade = 'sessao' AND p_acao = 'delete' THEN
        CALL sp_sessao_delete(JSON_EXTRACT(p_json, '$.id'));

    -- ---- DADOS_SESSAO ----
    ELSEIF p_entidade = 'dados_sessao' AND p_acao = 'create' THEN
        CALL sp_dados_sessao_create(
            JSON_EXTRACT(p_json, '$.id_sessao'),
            JSON_EXTRACT(p_json, '$.forca_media'),
            JSON_EXTRACT(p_json, '$.ritmo_score'),
            JSON_EXTRACT(p_json, '$.variacao_ritmo'),
            JSON_EXTRACT(p_json, '$.tempo_total_ms')
        );

    ELSEIF p_entidade = 'dados_sessao' AND p_acao = 'read' THEN
        CALL sp_dados_sessao_read(JSON_EXTRACT(p_json, '$.id_sessao'));

    -- ---- RANKING ----
    ELSEIF p_entidade = 'ranking' AND p_acao = 'read' THEN
        CALL sp_ranking_read(JSON_EXTRACT(p_json, '$.id_usuario'));

    ELSE
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'sp_model: entidade ou acao invalida';
    END IF;
END$$

DELIMITER ;
