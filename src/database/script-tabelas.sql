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
    foto VARCHAR(255)
);


-- =====================================================
-- 3. TABELA: TRILHAS
-- =====================================================

CREATE TABLE trilhas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    ordem INT NOT NULL UNIQUE,

    CONSTRAINT chk_trilhas_ordem
        CHECK (ordem > 0)
);


-- =====================================================
-- 4. TABELA: PUZZLES
-- =====================================================

CREATE TABLE puzzles (
    id INT AUTO_INCREMENT PRIMARY KEY,

    trilha_id INT NOT NULL,
    ordem INT NOT NULL,

    titulo VARCHAR(150) NOT NULL,
    objetivo TEXT NOT NULL,
    dica TEXT,
    explicacao TEXT,

    tabuleiro JSON NOT NULL,
    jogadas JSON NOT NULL,

    CONSTRAINT fk_puzzles_trilhas
        FOREIGN KEY (trilha_id)
        REFERENCES trilhas(id),

    CONSTRAINT uq_puzzle_ordem
        UNIQUE (trilha_id, ordem),

    CONSTRAINT chk_puzzle_ordem
        CHECK (ordem > 0),

    CONSTRAINT chk_puzzle_tabuleiro
        CHECK (JSON_TYPE(tabuleiro) = 'ARRAY'),

    CONSTRAINT chk_puzzle_jogadas
        CHECK (JSON_TYPE(jogadas) = 'ARRAY')
);


-- =====================================================
-- 5. TABELA: TENTATIVAS
-- =====================================================

CREATE TABLE tentativas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    puzzle_id INT NOT NULL,
    erros INT NOT NULL DEFAULT 0,
    dicas_usadas INT NOT NULL DEFAULT 0,     -- Quantidade de movimentos já executados
    indice_jogada INT NOT NULL DEFAULT 0,
    estado_tabuleiro JSON NOT NULL,     -- Estado atual do tabuleiro para retomada

    CONSTRAINT fk_tentativas_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES usuario(id),

    CONSTRAINT fk_tentativas_puzzle
        FOREIGN KEY (puzzle_id)
        REFERENCES puzzles(id),

    CONSTRAINT uq_tentativa_usuario_puzzle
        UNIQUE (usuario_id, puzzle_id),

    CONSTRAINT chk_tentativa_erros
        CHECK (erros >= 0),

    CONSTRAINT chk_tentativa_dicas
        CHECK (dicas_usadas >= 0),

    CONSTRAINT chk_tentativa_indice
        CHECK (indice_jogada >= 0),

    CONSTRAINT chk_tentativa_tabuleiro
        CHECK (JSON_TYPE(estado_tabuleiro) = 'ARRAY')
);


-- =====================================================
-- 6. TABELA: RESULTADOS
-- =====================================================

CREATE TABLE resultados (
    id INT AUTO_INCREMENT PRIMARY KEY,

    usuario_id INT NOT NULL,
    puzzle_id INT NOT NULL,

    total_erros INT NOT NULL DEFAULT 0,

    melhores_estrelas TINYINT NOT NULL,

    CONSTRAINT fk_resultados_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES usuario(id),

    CONSTRAINT fk_resultados_puzzle
        FOREIGN KEY (puzzle_id)
        REFERENCES puzzles(id),

    CONSTRAINT uq_resultado_usuario_puzzle
        UNIQUE (usuario_id, puzzle_id),

    CONSTRAINT chk_resultado_erros
        CHECK (total_erros >= 0),

    CONSTRAINT chk_resultado_estrelas
        CHECK (melhores_estrelas BETWEEN 1 AND 3)
);


-- =====================================================
-- 7. CADASTRAR AS TRILHAS
-- =====================================================

INSERT INTO trilhas (id, nome, descricao, ordem) VALUES
(1, 'Trilha do Peão',
 'Aprenda os movimentos e as possibilidades do peão.', 1),

(2, 'Trilha da Torre',
 'Aprenda a movimentação e o poder da torre.', 2),

(3, 'Trilha do Bispo',
 'Explore os movimentos diagonais do bispo.', 3),

(4, 'Trilha do Cavalo',
 'Aprenda os movimentos em L e as táticas do cavalo.', 4),

(5, 'Trilha da Dama',
 'Descubra o poder de movimentação da dama.', 5),

(6, 'Trilha de Posições',
 'Desenvolva sua visão estratégica e posicionamento.', 6),

(7, 'Trilha de Xeque-mate',
 'Aprenda padrões e técnicas para finalizar partidas.', 7);


-- =====================================================
-- 8. CADASTRAR OS 10 PUZZLES
-- =====================================================

INSERT INTO puzzles (
    id,
    trilha_id,
    ordem,
    titulo,
    objetivo,
    dica,
    explicacao,
    tabuleiro,
    jogadas
) VALUES

-- PUZZLE 1: PEÃO
(
    1, 1, 1,
    'A passeada do rei',
    'Capture o cavalo preto sem proteção.',
    'Mova o peão branco. Ele captura na diagonal.',
    'Isso! Peças sem proteção são presentes.',
    '[
        "......k.",
        "........",
        "........",
        "...n....",
        "....P...",
        "........",
        "........",
        "....K..."
    ]',
    '[
        {"de": "e4", "para": "d5"}
    ]'
),

-- PUZZLE 2: TORRE
(
    2, 2, 1,
    'A torre captura',
    'Capture a dama preta.',
    'A torre anda em linha reta. Suba pela coluna a.',
    'Ganhou a dama de graça!',
    '[
        "......k.",
        "........",
        "........",
        "q.......",
        "........",
        "........",
        "........",
        "R...K..."
    ]',
    '[
        {"de": "a1", "para": "a5"}
    ]'
),

-- PUZZLE 3: BISPO
(
    3, 3, 1,
    'O bispo captura',
    'Capture a torre preta.',
    'O bispo anda na diagonal. Siga a diagonal até o canto direito.',
    'Muito bem! A torre não tinha defesa.',
    '[
        "......k.",
        "........",
        ".......r",
        "........",
        "........",
        "........",
        "........",
        "..B.K..."
    ]',
    '[
        {"de": "c1", "para": "h6"}
    ]'
),

-- PUZZLE 4: CAVALO
(
    4, 4, 1,
    'O cavalo captura',
    'Capture a dama preta com o cavalo.',
    'O cavalo anda em L: 2 casas em linha reta e 1 para o lado.',
    'Um cavalinho derrubou uma dama!',
    '[
        "......k.",
        "........",
        "........",
        "......q.",
        "........",
        ".....N..",
        "........",
        "....K..."
    ]',
    '[
        {"de": "f3", "para": "g5"}
    ]'
),

-- PUZZLE 5: PEÃO
(
    5, 1, 2,
    'Promoção do peão',
    'Leve o peão até a última fileira.',
    'Ande com o peão da casa a7 para a8.',
    'O peão virou uma dama!',
    '[
        "........",
        "P.......",
        "........",
        ".......k",
        "........",
        "........",
        "........",
        "....K..."
    ]',
    '[
        {"de": "a7", "para": "a8"}
    ]'
),

-- PUZZLE 6: XEQUE-MATE
(
    6, 7, 1,
    'Seu primeiro xeque-mate',
    'Dê xeque-mate em 1 jogada.',
    'O rei preto está preso atrás dos próprios peões. Ataque a última fileira com a torre.',
    'Xeque-mate! Esse é o mate do corredor.',
    '[
        "......k.",
        ".....ppp",
        "........",
        "........",
        "........",
        "........",
        "........",
        "R.....K."
    ]',
    '[
        {"de": "a1", "para": "a8"}
    ]'
),

-- PUZZLE 7: XEQUE-MATE
(
    7, 7, 2,
    'Mate com duas torres',
    'Dê xeque-mate em 1 jogada.',
    'Uma torre já bloqueia a 7ª fileira. Use a outra na 8ª.',
    'Esse é o mate da escada!',
    '[
        "......k.",
        "R.......",
        "........",
        "........",
        "........",
        "........",
        "........",
        ".R..K..."
    ]',
    '[
        {"de": "b1", "para": "b8"}
    ]'
),

-- PUZZLE 8: XEQUE-MATE
(
    8, 7, 3,
    'Mate com dama e rei',
    'Dê xeque-mate em 1 jogada.',
    'Coloque a dama na casa g7, protegida pelo seu rei.',
    'Xeque-mate! Rei e dama trabalhando juntos.',
    '[
        ".......k",
        "........",
        ".....K..",
        "........",
        "........",
        "........",
        "........",
        "......Q."
    ]',
    '[
        {"de": "g1", "para": "g7"}
    ]'
),

-- PUZZLE 9: CAVALO
(
    9, 4, 2,
    'Garfo de cavalo',
    'Ataque o rei e a torre ao mesmo tempo.',
    'Leve o cavalo para a casa d6. Ele dá xeque e ataca a torre.',
    'Garfo! O rei foge e você captura a torre.',
    '[
        "....k...",
        ".r......",
        "........",
        ".....N..",
        "........",
        "........",
        "........",
        "......K."
    ]',
    '[
        {"de": "f5", "para": "d6"}
    ]'
),

-- PUZZLE 10: XEQUE-MATE
(
    10, 7, 4,
    'Sacrifício de dama',
    'Dê xeque-mate em 2 jogadas. Sacrifique a dama!',
    'Leve a dama até a última fileira, dando xeque. Depois recapture com a torre.',
    'Xeque-mate! Você sacrificou a dama para tirar a defesa do rei e deu mate com a torre.',
    '[
        "r.....k.",
        ".....ppp",
        "........",
        "........",
        "........",
        "........",
        "...Q....",
        "...R..K."
    ]',
    '[
        {"de": "d2", "para": "d8"},
        {"de": "a8", "para": "d8"},
        {"de": "d1", "para": "d8"}
    ]'
);


-- =====================================================
-- 9. CONSULTAS PARA CONFERIR O BANCO
-- =====================================================

-- Conferir as tabelas
SHOW TABLES;

-- Conferir as trilhas
SELECT *
FROM trilhas
ORDER BY ordem;

-- Conferir os puzzles e suas trilhas
SELECT
    p.id,
    p.titulo,
    t.nome AS trilha,
    p.ordem
FROM puzzles p
INNER JOIN trilhas t
    ON p.trilha_id = t.id
ORDER BY t.ordem, p.ordem;

-- Conferir a quantidade de puzzles por trilha
SELECT
    t.nome AS trilha,
    COUNT(p.id) AS quantidade_puzzles
FROM trilhas t
LEFT JOIN puzzles p
    ON t.id = p.trilha_id
GROUP BY t.id, t.nome, t.ordem
ORDER BY t.ordem;

-- Conferir a estrutura da tabela puzzles
DESCRIBE puzzles;

-- Conferir a estrutura das tentativas
DESCRIBE tentativas;

-- Conferir a estrutura dos resultados
DESCRIBE resultados;
