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
    nome VARCHAR(100) NOT NULL,
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
    dt_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_quiz_usuario FOREIGN KEY (fk_usuario) REFERENCES usuario(id)
        ON DELETE CASCADE
);