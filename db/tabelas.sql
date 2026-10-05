-- ===========================================
-- FisioGrasp — Tabelas
-- ===========================================

CREATE DATABASE IF NOT EXISTS fisiogrip;
USE fisiogrip;

-- -----------------------------------------------
-- Tabela: usuario
-- -----------------------------------------------
CREATE TABLE IF NOT EXISTS usuario (
    id        INT AUTO_INCREMENT PRIMARY KEY,
    nome      VARCHAR(100)  NOT NULL,
    email     VARCHAR(150)  NOT NULL UNIQUE,
    senha     VARCHAR(255)  NOT NULL,  -- hash bcrypt
    perfil    ENUM('motor', 'tdah', 'autismo', 'outro') NOT NULL DEFAULT 'outro',
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------
-- Tabela: dispositivo
-- -----------------------------------------------
CREATE TABLE IF NOT EXISTS dispositivo (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario  INT          NOT NULL,
    nome_bt     VARCHAR(100) NOT NULL,
    can_active  TINYINT(1)   NOT NULL DEFAULT 1,
    is_active   TINYINT(1)   NOT NULL DEFAULT 0,
    criado_em   DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id) ON DELETE CASCADE
);

-- -----------------------------------------------
-- Tabela: sessao
-- -----------------------------------------------
CREATE TABLE IF NOT EXISTS sessao (
    id            INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario    INT  NOT NULL,
    id_dispositivo INT NOT NULL,
    modo          ENUM('luva', 'bola', 'pisada', 'ritmo') NOT NULL,
    nivel         ENUM('facil', 'medio', 'dificil')       NOT NULL,
    iniciado_em   DATETIME DEFAULT CURRENT_TIMESTAMP,
    encerrado_em  DATETIME DEFAULT NULL,
    FOREIGN KEY (id_usuario)     REFERENCES usuario(id)     ON DELETE CASCADE,
    FOREIGN KEY (id_dispositivo) REFERENCES dispositivo(id) ON DELETE CASCADE
);

-- -----------------------------------------------
-- Tabela: dados_sessao  (entidade fraca de sessao)
-- -----------------------------------------------
CREATE TABLE IF NOT EXISTS dados_sessao (
    id_sessao       INT    NOT NULL PRIMARY KEY,
    forca_media     DOUBLE NOT NULL DEFAULT 0,
    ritmo_score     DOUBLE NOT NULL DEFAULT 0,
    variacao_ritmo  DOUBLE NOT NULL DEFAULT 0,
    tempo_total_ms  INT    NOT NULL DEFAULT 0,
    estrelas        INT    NOT NULL DEFAULT 0 CHECK (estrelas BETWEEN 0 AND 3),
    FOREIGN KEY (id_sessao) REFERENCES sessao(id) ON DELETE CASCADE
);

-- -----------------------------------------------
-- Tabela: ranking
-- -----------------------------------------------
CREATE TABLE IF NOT EXISTS ranking (
    id_usuario      INT  NOT NULL PRIMARY KEY,
    total_estrelas  INT  NOT NULL DEFAULT 0,
    total_sessoes   INT  NOT NULL DEFAULT 0,
    posicao         INT  DEFAULT NULL,
    ultima_sessao   DATETIME DEFAULT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id) ON DELETE CASCADE
);
