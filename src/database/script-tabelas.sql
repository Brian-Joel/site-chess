-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql server
*/


-- =====================================================
-- 1. CRIAR O BANCO DE DADOS
-- =====================================================
CREATE DATABASE xequeMate;

USE xequeMate;


-- =====================================================
-- 2. TABELA: USUARIO
-- =====================================================

CREATE TABLE usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    foto TEXT
);

CREATE TABLE quiz_personalidade (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fk_usuario INT NOT NULL,
    qtd_perfil_a INT NOT NULL DEFAULT 0,
    qtd_perfil_b INT NOT NULL DEFAULT 0,
    qtd_perfil_c INT NOT NULL DEFAULT 0,
    qtd_perfil_d INT NOT NULL DEFAULT 0,
    dt_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_quiz_usuario FOREIGN KEY (fk_usuario) REFERENCES usuario(id)
        ON DELETE CASCADE
);

-- verificar o historico
CREATE VIEW vw_historico AS
SELECT
    id,
    fk_usuario,
    qtd_perfil_a,
    qtd_perfil_b,
    qtd_perfil_c,
    qtd_perfil_d,
    DATE_FORMAT(dt_registro, '%d/%m/%Y %H:%i') AS data_tentativa
FROM quiz_personalidade;

-- exemplo de uso:
-- SELECT * FROM vw_historico WHERE fk_usuario = 1
-- ORDER BY id ASC;


-- grafico da comunidade
CREATE VIEW vw_panorama_comunidade AS
SELECT
    CASE
        WHEN qtd_perfil_a = GREATEST(qtd_perfil_a, qtd_perfil_b, qtd_perfil_c, qtd_perfil_d) THEN 'Perfil A'
        WHEN qtd_perfil_b = GREATEST(qtd_perfil_a, qtd_perfil_b, qtd_perfil_c, qtd_perfil_d) THEN 'Perfil B'
        WHEN qtd_perfil_c = GREATEST(qtd_perfil_a, qtd_perfil_b, qtd_perfil_c, qtd_perfil_d) THEN 'Perfil C'
        ELSE 'Perfil D'
    END AS perfil_predominante,
    COUNT(id) AS total
FROM quiz_personalidade
GROUP BY perfil_predominante
ORDER BY total DESC;

SELECT * FROM vw_historico;
SELECT * FROM vw_panorama_comunidade;
SELECT * FROM quiz_personalidade;
SELECT id, nome FROM usuario;
SELECT * FROM vw_historico;	

SELECT*FROM usuario;
