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

CREATE TABLE quiz (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(100) NOT NULL,
    descricao VARCHAR(255)
);

-- 4. Tabela de Perguntas (Com categorias para os gráficos e pesos de pontuação)
CREATE TABLE pergunta (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fkQuiz INT,
    enunciado VARCHAR(255) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    pontos INT NOT NULL DEFAULT 1,
    FOREIGN KEY (fkQuiz) REFERENCES quiz(id)
);

-- 5. Tabela de Alternativas (As opções de resposta de cada pergunta, mapeadas por estilo)
CREATE TABLE alternativa (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fkPergunta INT,
    texto VARCHAR(255) NOT NULL,
    estilo VARCHAR(50) NOT NULL, -- Mapeia: 'Agressivo', 'Posicional', 'Defensivo' ou 'Universal'
    correta TINYINT NOT NULL,
    CONSTRAINT chCorreta CHECK (correta IN (0,1)),
    FOREIGN KEY (fkPergunta) REFERENCES pergunta(id)
);

-- 6. Tabela de Tentativas (Histórico de cada jogada; alimenta o ranking e a dashboard)
CREATE TABLE tentativa (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fkUsuario INT,
    fkQuiz INT,
    data_hora DATETIME DEFAULT CURRENT_TIMESTAMP,
    pontuacao INT NOT NULL,
    nivel VARCHAR(50),
    FOREIGN KEY (fkUsuario) REFERENCES usuario(id),
    FOREIGN KEY (fkQuiz) REFERENCES quiz(id)
);

-- 7. Tabela de Respostas do Usuário (Auditoria detalhada para calcular estatísticas e porcentagens)
CREATE TABLE resposta_usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fkTentativa INT,
    fkPergunta INT,
    fkAlternativa INT,
    FOREIGN KEY (fkTentativa) REFERENCES tentativa(id),
    FOREIGN KEY (fkPergunta) REFERENCES pergunta(id),
    FOREIGN KEY (fkAlternativa) REFERENCES alternativa(id)
);


-----------------------------------------------------------------
-- INSERÇÃO DOS DADOS DO QUIZ DE PERSONALIDADE
-----------------------------------------------------------------

-- Inserindo o Quiz Oficial
INSERT INTO quiz (id, titulo, descricao) VALUES
(1, 'Qual é o seu Estilo de Xadrez?', 'Teste de perfil enxadrista: descubra se seu jogo é Agressivo, Posicional, Defensivo ou Universal.');

-- Inserindo as 15 Perguntas
INSERT INTO pergunta (id, fkQuiz, enunciado, categoria, pontos) VALUES
(1, 1, 'Nos primeiros lances, você empurra seus peões centrais para ganhar espaço rápido, deixando casas atrás desprotegidas. Qual seu instinto?', 'Abertura', 1),
(2, 1, 'Você precisa decidir onde colocar seu Bispo no início do jogo. Qual posição te agrada mais?', 'Abertura', 1),
(3, 1, 'Seus peões e peças menores saíram e você já pode fazer o roque, mas vê chance de atacar na ala oposta. O que faz?', 'Abertura', 1),
(4, 1, 'O adversário colocou um Cavalo bem no meio do seu campo, incomodando. Como lida com ele?', 'Tática', 1),
(5, 1, 'A Dama é a peça mais poderosa, mas muito visada. Como você costuma usá-la no meio do jogo?', 'Meio-jogo', 1),
(6, 1, 'Você percebe que se deixar o adversário capturar um peão de graça, suas Torres ganham colunas abertas para invadir. Entrega?', 'Tática', 1),
(7, 1, 'Os peões do centro travaram e nenhuma peça consegue atravessar pelo meio. Qual é o seu próximo plano?', 'Estratégia', 1),
(8, 1, 'O adversário deixou um peão desprotegido no canto. Pegá-lo tira sua Dama de jogo por dois lances. O que você faz?', 'Tática', 1),
(9, 1, 'Surge a opção forçada de trocar as Damas no meio da partida sem ganhar material. O que pesa mais na sua escolha?', 'Estratégia', 1),
(10, 1, 'O adversário começou a alinhar peças na direção do seu roque e o perigo é real. Qual é a sua reação instintiva?', 'Defesa', 1),
(11, 1, 'Para capturar uma peça importante do rival, você precisa aceitar ficar com peões dobrados que enfraquecem sua estrutura. Aceita?', 'Estratégia', 1),
(12, 1, 'Você percebe que o plano de 5 lances não vai funcionar porque o rival se defendeu bem. Como você muda de ideia?', 'Estratégia', 1),
(13, 1, 'Muitas peças saíram e o perigo de mate diminuiu. Onde você coloca seu Rei?', 'Finais', 1),
(14, 1, 'Você conseguiu criar um peão livre que não tem nenhum peão inimigo na frente. Como você conduz isso?', 'Finais', 1),
(15, 1, 'Depois de uma partida intensa, qual tipo de vitória deixa você com a melhor sensação de "joguei muito bem"?', 'Geral', 1);

-- Inserindo as 60 Alternativas (4 para cada pergunta, vinculadas aos 4 estilos)
INSERT INTO alternativa (id, fkPergunta, texto, estilo, correta) VALUES
-- Pergunta 1
(1, 1, 'Empurro sem pensar duas vezes; espaço e velocidade valem mais que algumas casas vazias.', 'Agressivo', 1),
(2, 1, 'Avanço só o necessário para garantir que meus peões fiquem bem apoiados uns nos outros.', 'Posicional', 1),
(3, 1, 'Prefiro segurar os peões na base e deixar o adversário avançar primeiro para ver onde ele vai errar.', 'Defensivo', 1),
(4, 1, 'Depende de onde o adversário colocou os cavalos dele; avanço só se eu puder sustentar depois.', 'Universal', 1),

-- Pergunta 2
(5, 2, 'Apontando direto para o lado onde o Rei adversário vai se esconder, mesmo que o Bispo fique exposto.', 'Agressivo', 1),
(6, 2, 'Em uma diagonal longa e discreta, controlando o centro à distância sem chamar atenção.', 'Posicional', 1),
(7, 2, 'Bem recuado, perto do meu próprio Rei, servindo como um guarda-costas contra invasões.', 'Defensivo', 1),
(8, 2, 'Em uma casa flexível, onde ele possa tanto ajudar na defesa quanto saltar para o ataque se surgir brecha.', 'Universal', 1),

-- Pergunta 3
(9, 3, 'Deixo o Rei no centro mais um pouco e lanço o ataque agora, antes que o rival se organize.', 'Agressivo', 1),
(10, 3, 'Faço o roque primeiro para conectar minhas torres e preparar o ataque com calma e segurança.', 'Posicional', 1),
(11, 3, 'Faço o roque imediatamente e ainda avanço um peãozinho na frente do Rei para criar um escudo extra.', 'Defensivo', 1),
(12, 3, 'Avalio se o centro está fechado: se estiver travado eu ataco; se estiver aberto, protejo o Rei.', 'Universal', 1),

-- Pergunta 4
(13, 4, 'Ignoro o Cavalo dele e crio uma ameaça ainda mais grave contra o Rei dele para obrigá-lo a recuar.', 'Agressivo', 1),
(14, 4, 'Preparo uma sequência de lances de peão para expulsar esse Cavalo e tomar conta daquela casa para mim.', 'Posicional', 1),
(15, 4, 'Troco esse Cavalo irritante por uma peça minha assim que possível para limpar o perigo da minha área.', 'Defensivo', 1),
(16, 4, 'Uso o fato de que o Cavalo dele está longe da defesa para atacar o lado que ficou desprotegido.', 'Universal', 1),

-- Pergunta 5
(17, 5, 'Coloco ela na linha de frente bem cedo, criando ameaças constantes de xeque e captura.', 'Agressivo', 1),
(18, 5, 'Deixo ela na segunda fileira, dando suporte silencioso às torres e escolhendo a melhor diagonal.', 'Posicional', 1),
(19, 5, 'Mantenho ela bem protegida atrás dos meus peões, só saindo quando tiver certeza de que não será atacada.', 'Defensivo', 1),
(20, 5, 'Uso ela como peça de transição: ajuda a segurar uma ponta e salta rápido para a outra quando o jogo abre.', 'Universal', 1),

-- Pergunta 6
(21, 6, 'Com certeza! Um peão não é nada perto de duas torres invadindo a base inimiga.', 'Agressivo', 1),
(22, 6, 'Só se eu tiver certeza de que consigo recuperar esse peão mais tarde ou travar as peças dele em troca.', 'Posicional', 1),
(23, 6, 'Não gosto de ficar com material a menos; prefiro defender o peão e buscar outro caminho.', 'Defensivo', 1),
(24, 6, 'Calculo se o ataque das torres gera ameaças reais; se for só fogo de palha, eu seguro o peão.', 'Universal', 1),

-- Pergunta 7
(25, 7, 'Jogo meus peões da lateral com tudo para tentar abrir um buraco na força bruta perto do Rei dele.', 'Agressivo', 1),
(26, 7, 'Começo uma viagem longa com meus cavalos para colocar um deles em um buraco perfeito na posição dele.', 'Posicional', 1),
(27, 7, 'Fico mexendo minhas peças atrás da barreira, esperando ele perder a paciência e abrir o jogo para mim.', 'Defensivo', 1),
(28, 7, 'Preparo uma ruptura com peão no momento exato em que as peças dele estiverem mal posicionadas.', 'Universal', 1),

-- Pergunta 8
(29, 8, 'Deixo o peão lá! Perder dois lances no meio de uma briga é pedir para levar xeque-mate.', 'Agressivo', 1),
(30, 8, 'Não pego; prefiro usar esses dois lances para melhorar a posição da minha pior peça.', 'Posicional', 1),
(31, 8, 'Capturo o peão e volto correndo com a Dama para defender; vantagem material ganha jogo no final.', 'Defensivo', 1),
(32, 8, 'Checo se ele tem algum golpe tático imediato; se não tiver nada concreto, eu pego o peão e seguro.', 'Universal', 1),

-- Pergunta 9
(33, 9, 'Evito a troca a todo custo! Sem Dama no tabuleiro, fica muito mais difícil dar um ataque fulminante.', 'Agressivo', 1),
(34, 9, 'Aceito se a troca deixar os peões do meu adversário dobrados ou isolados para o resto da partida.', 'Posicional', 1),
(35, 9, 'Troco na hora! Sem a Dama dele rondando meu Rei, eu jogo muito mais tranquilo e seguro.', 'Defensivo', 1),
(36, 9, 'Olho para o relógio e para os peões: se meu final for melhor, eu troco; se não, mantenho o jogo vivo.', 'Universal', 1),

-- Pergunta 10
(37, 10, 'Lanço um contra-ataque imediato no centro para obrigar ele a abandonar o ataque e voltar para defender.', 'Agressivo', 1),
(38, 10, 'Identifico qual é a peça mais perigosa do ataque dele e manobro para trocá-la sem enfraquecer meus peões.', 'Posicional', 1),
(39, 10, 'Trago todas as minhas peças disponíveis para perto do meu Rei e fecho cada brecha possível.', 'Defensivo', 1),
(40, 10, 'Defendo apenas o ponto crítico da ameaça e já deixo minhas peças prontas para punir o espaço que ele deixou atrás.', 'Universal', 1),

-- Pergunta 11
(41, 11, 'Sim, porque isso abre uma coluna nova para a minha Torre atacar direto!', 'Agressivo', 1),
(42, 11, 'Detesto peões dobrados; só aceito se eu ganhar o par de bispos ou controle absoluto de uma casa central.', 'Posicional', 1),
(43, 11, 'Prefiro evitar; peões fracos viram alvos fáceis e me obrigam a ficar defendendo eles o jogo todo.', 'Defensivo', 1),
(44, 11, 'Aceito se a dinâmica do jugou for rápida, mas recuso se a partida tiver cara de que vai durar muito.', 'Universal', 1),

-- Pergunta 12
(45, 12, 'Tento forçar uma combinação tática mesmo assim para bagunçar o tabuleiro e criar novas chances.', 'Agressivo', 1),
(46, 12, 'Recuo minhas peças com calma, reorganizo a estrutura e começo a pressionar o outro lado do tabuleiro.', 'Posicional', 1),
(47, 12, 'Aproveito que minhas peças estão bem protegidas e passo a jogar de forma sólida, garantindo que não vou perder.', 'Defensivo', 1),
(48, 12, 'Reavalio o tabuleiro inteiro de cabeça fria para achar uma nova rota.', 'Universal', 1),

-- Pergunta 13
(49, 13, 'Levo ele para a linha de frente junto com meus peões para ajudar a esmagar o Rei adversário.', 'Agressivo', 1),
(50, 13, 'Centralizo ele com precisão matemática para bloquear o Rei rival e dominar as casas-chave.', 'Posicional', 1),
(51, 13, 'Mantenho ele seguro perto dos meus peões de trás, evitando qualquer xeque surpresa de torre.', 'Defensivo', 1),
(52, 13, 'Uso o Rei de forma ativa para atacar os peões fracos dele enquanto protejo os meus.', 'Universal', 1),

-- Pergunta 14
(53, 14, 'Empurro ele o mais rápido possível, mesmo que eu precise sacrificar uma peça para distrair o adversário.', 'Agressivo', 1),
(54, 14, 'Avanço ele um passo de cada vez, garantindo que todas as casas à frente estejam controladas antes de mover.', 'Posicional', 1),
(55, 14, 'Uso esse peão mais como uma isca para prender as peças do rival na defesa enquanto eu garanto minha posição.', 'Defensivo', 1),
(56, 14, 'Alterno entre avançar o peão e criar ameaças do outro lado do tabuleiro até a defesa dele não dar conta dos dois.', 'Universal', 1),

-- Pergunta 15
(57, 15, 'Dar um xeque-mate bonito depois de sacrificar material e deixar o oponente sem saída.', 'Agressivo', 1),
(58, 15, 'Ir tirando cada espaço do adversário aos poucos até ele não ter mais nenhum lance bom para fazer.', 'Posicional', 1),
(59, 15, 'Sobreviver a um ataque pesado do oponente e vencer no contra-ataque quando ele ficou sem fôlego.', 'Defensivo', 1),
(60, 15, 'Mudar de estratégia no meio da partida ao perceber o ponto fraco do rival e vencer com precisão.', 'Universal', 1);

SELECT*FROM xequeMate.usuario;

CREATE VIEW vw_resultado_estilo AS
SELECT 
    u.id AS idUsuario,
    u.nome AS nomeUsuario,
    t.id AS idTentativa,
    t.data_hora AS dataTentativa,
    a.estilo AS estilo,
    COUNT(ru.id) AS totalVotos
FROM tentativa t
JOIN usuario u ON t.fkUsuario = u.id
JOIN resposta_usuario ru ON ru.fkTentativa = t.id
JOIN alternativa a ON ru.fkAlternativa = a.id
GROUP BY u.id, u.nome, t.id, t.data_hora, a.estilo;

CREATE VIEW vw_dashboard_estilos AS
SELECT 
    nivel AS estiloPredominante,
    COUNT(id) AS totalTentativas
FROM tentativa
WHERE nivel IS NOT NULL
GROUP BY nivel;



CREATE VIEW vw_quiz_estilo AS
SELECT 
    q.id AS idQuiz,
    q.titulo AS tituloQuiz,
    p.id AS idPergunta,
    p.enunciado AS pergunta,
    p.categoria,
    a.id AS idAlternativa,
    a.texto AS alternativa,
    a.estilo
FROM quiz q
JOIN pergunta p ON p.fkQuiz = q.id
JOIN alternativa a ON a.fkPergunta = p.id;


SELECT * FROM vw_resultado_estilo;



SELECT * FROM vw_quiz_estilo;




