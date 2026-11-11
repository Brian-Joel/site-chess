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
    data_hora DATETIME DEFAULT CURRENT_TIMESTAMP
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
-- Criação das tabelas para o quiz

-- 2. Tabela de Quizzes (Diferencia o Quiz de Perfil oficial dos quizzes de treino)
CREATE TABLE quiz (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(100) NOT NULL,
    descricao VARCHAR(255),
    dificuldade VARCHAR(7) CONSTRAINT chDificuldade CHECK (dificuldade IN('facil', 'medio', 'dificil')) NOT NULL
);

-- 3. Tabela de Perguntas (Com categorias para os gráficos e pesos de pontuação)
CREATE TABLE pergunta (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fkQuiz INT,
    enunciado VARCHAR(255) NOT NULL,
    categoria VARCHAR(50) NOT NULL, -- Ex: 'Abertura', 'Tática', 'Finais', 'Estratégia'
    pontos INT NOT NULL DEFAULT 1,  -- 1 (fácil), 3 (médio), 10 (difícil)
    FOREIGN KEY (fkQuiz) REFERENCES quiz(id)
);

-- 4. Tabela de Alternativas (As opções de resposta de cada pergunta)
CREATE TABLE alternativa (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fkPergunta INT,
    texto VARCHAR(255) NOT NULL,
    correta TINYINT NOT NULL, CONSTRAINT chCorreta CHECK (correta IN (0,1)), -- 1 para a resposta certa, 0 para as erradas
    FOREIGN KEY (fkPergunta) REFERENCES pergunta(id)
);

-- 5. Tabela de Tentativas (Histórico de cada jogada; o quiz oficial alimenta o ranking e a dashboard)
CREATE TABLE tentativa (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fkUsuario INT,
    fkQuiz INT,
    data_hora DATETIME DEFAULT CURRENT_TIMESTAMP,
    pontuacao INT NOT NULL, -- Acumulador de pontos da partida
    nivel VARCHAR(50), -- Patente / perfil do usuario, ex: Novato, Intermediario, Experiente, Especialista, Mestre nacional, Grande mestre
    FOREIGN KEY (fkUsuario) REFERENCES usuario(id),
    FOREIGN KEY (fkQuiz) REFERENCES quiz(id)
);

-- 6. Tabela de Respostas do Usuário (Auditoria detalhada para calcular estatísticas e porcentagens)
CREATE TABLE resposta_usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fkTentativa INT,
    fkPergunta INT,
    fkAlternativa INT,
    FOREIGN KEY (fkTentativa) REFERENCES tentativa(id),
    FOREIGN KEY (fkPergunta) REFERENCES pergunta(id),
    FOREIGN KEY (fkAlternativa) REFERENCES alternativa(id)
);

SELECT*FROM xequeMate.usuario;