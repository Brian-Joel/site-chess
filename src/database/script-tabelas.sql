-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql server
*/

CREATE DATABASE xequeMate;

USE xequeMate;

CREATE TABLE usuario (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50) UNIQUE NOT NULL,
	email VARCHAR(50) UNIQUE NOT NULL,
	senha VARCHAR(50) NOT NULL,
    foto VARCHAR(255) NOT NULL,
    nivel VARCHAR(50),
    biografia VARCHAR(100),
    data_hora DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- em desenvolvimento
CREATE TABLE puzzles (
id INT PRIMARY KEY AUTO_INCREMENT,
titulo,

);

