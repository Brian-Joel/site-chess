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
	nome VARCHAR(50),
	email VARCHAR(50),
	senha VARCHAR(50)
);

-- em desenvolvimento
CREATE TABLE comentario (
	id INT PRIMARY KEY AUTO_INCREMENT,
	titulo VARCHAR(100),
	descricao VARCHAR(150),
    curtida INT,
    resposta INT,
	fkUsuario INT,
    fkComentarioPai INT,
	FOREIGN KEY (fkUsuario) REFERENCES usuario(id),
	FOREIGN KEY (fkComentarioPai) REFERENCES comentario(id)
);

/* esta tabela deve estar de acordo com o que está em INSERT de sua API do arduino - dat-acqu-ino */
-- tabela em desenvolvimento
CREATE TABLE quiz (
	id INT PRIMARY KEY AUTO_INCREMENT,
	opcao CHAR(1),
	data_hora DATETIME
);

SELECT*FROM usuario;