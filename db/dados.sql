-- ===========================================
-- FisioGrasp — Dados iniciais (seed)
-- ===========================================
-- NOTA: o backend ainda compara senha em texto puro (bcrypt é um TODO,
-- ver auth_controller.cpp). Por isso as senhas abaixo são texto puro
-- mesmo, para dar pra logar de teste. Troque para hash bcrypt real
-- assim que a autenticação for atualizada.
USE fisiogrip;

-- Usuário administrador de teste — senha: admin123
INSERT IGNORE INTO usuario (id, nome, email, senha, perfil)
VALUES (1, 'Admin FisioGrasp', 'admin@fisiogrip.com', 'admin123', 'outro');

-- Usuários de exemplo — senha igual ao nome + "12345"
INSERT IGNORE INTO usuario (nome, email, senha, perfil) VALUES
('João Silva',   'joao@email.com',   'joao12345',   'motor'),
('Maria Souza',  'maria@email.com',  'maria12345',  'tdah'),
('Pedro Lima',   'pedro@email.com',  'pedro12345',  'autismo');

-- Dispositivos de exemplo (vinculados aos usuários)
INSERT IGNORE INTO dispositivo (id_usuario, nome_bt, can_active, is_active) VALUES
(2, 'FisioGrasp-001', 1, 0),
(3, 'FisioGrasp-002', 1, 0),
(4, 'FisioGrasp-003', 1, 0);
