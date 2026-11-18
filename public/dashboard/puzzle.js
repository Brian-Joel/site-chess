// =====================================================
// 1) DADOS
// =====================================================
const pecas = {
    K: "♚\uFE0E", Q: "♛\uFE0E", R: "♜\uFE0E",
    B: "♝\uFE0E", N: "♞\uFE0E", P: "♟\uFE0E"
};
const letrasColunas = "abcdefgh";

// Nome usado para guardar o progresso no navegador (localStorage)
const CHAVE_SALVA = "caminhoDoRei";

// Em "jogadas": posições pares (0, 2, 4...) são do jogador,
// posições ímpares (1, 3, 5...) são a resposta do adversário.
const puzzles = [
    {
        titulo: "A passeada do rei",
        objetivo: "Capture o cavalo preto sem proteção.",
        dica: "Mova o peão branco. Ele captura na diagonal.",
        explicacao: "Isso! Peças sem proteção são presentes.",
        tabuleiro: [
            "......k.", "........", "........", "...n....",
            "....P...", "........", "........", "....K..."
        ],
        jogadas: [{ de: "e4", para: "d5" }]
    },
    {
        titulo: "A torre captura",
        objetivo: "Capture a dama preta.",
        dica: "A torre anda em linha reta. Suba pela coluna a.",
        explicacao: "Ganhou a dama de graça!",
        tabuleiro: [
            "......k.", "........", "........", "q.......",
            "........", "........", "........", "R...K..."
        ],
        jogadas: [{ de: "a1", para: "a5" }]
    },
    {
        titulo: "O bispo captura",
        objetivo: "Capture a torre preta.",
        dica: "O bispo anda na diagonal. Siga a diagonal até o canto direito.",
        explicacao: "Muito bem! A torre não tinha defesa.",
        tabuleiro: [
            "......k.", "........", ".......r", "........",
            "........", "........", "........", "..B.K..."
        ],
        jogadas: [{ de: "c1", para: "h6" }]
    },
    {
        titulo: "O cavalo captura",
        objetivo: "Capture a dama preta com o cavalo.",
        dica: "O cavalo anda em L: 2 casas em linha reta e 1 para o lado.",
        explicacao: "Um cavalinho derrubou uma dama!",
        tabuleiro: [
            "......k.", "........", "........", "......q.",
            "........", ".....N..", "........", "....K..."
        ],
        jogadas: [{ de: "f3", para: "g5" }]
    },
    {
        titulo: "Promoção do peão",
        objetivo: "Leve o peão até a última fileira.",
        dica: "Ande com o peão da casa a7 para a8.",
        explicacao: "O peão virou uma dama!",
        tabuleiro: [
            "........", "P.......", "........", ".......k",
            "........", "........", "........", "....K..."
        ],
        jogadas: [{ de: "a7", para: "a8" }]
    },
    {
        titulo: "Seu primeiro xeque-mate",
        objetivo: "Dê xeque-mate em 1 jogada.",
        dica: "O rei preto está preso atrás dos próprios peões. Ataque a última fileira com a torre.",
        explicacao: "Xeque-mate! Esse é o mate do corredor.",
        tabuleiro: [
            "......k.", ".....ppp", "........", "........",
            "........", "........", "........", "R.....K."
        ],
        jogadas: [{ de: "a1", para: "a8" }]
    },
    {
        titulo: "Mate com duas torres",
        objetivo: "Dê xeque-mate em 1 jogada.",
        dica: "Uma torre já bloqueia a 7ª fileira. Use a outra na 8ª.",
        explicacao: "Esse é o mate da escada!",
        tabuleiro: [
            "......k.", "R.......", "........", "........",
            "........", "........", "........", ".R..K..."
        ],
        jogadas: [{ de: "b1", para: "b8" }]
    },
    {
        titulo: "Mate com dama e rei",
        objetivo: "Dê xeque-mate em 1 jogada.",
        dica: "Coloque a dama na casa g7, protegida pelo seu rei.",
        explicacao: "Xeque-mate! Rei e dama trabalhando juntos.",
        tabuleiro: [
            ".......k", "........", ".....K..", "........",
            "........", "........", "........", "......Q."
        ],
        jogadas: [{ de: "g1", para: "g7" }]
    },
    {
        titulo: "Garfo de cavalo",
        objetivo: "Ataque o rei e a torre ao mesmo tempo.",
        dica: "Leve o cavalo para a casa d6. Ele dá xeque e ataca a torre.",
        explicacao: "Garfo! O rei foge e você captura a torre.",
        tabuleiro: [
            "....k...", ".r......", "........", ".....N..",
            "........", "........", "........", "......K."
        ],
        jogadas: [{ de: "f5", para: "d6" }]
    },
    {
        titulo: "Sacrifício de dama",
        objetivo: "Dê xeque-mate em 2 jogadas. Sacrifique a dama!",
        dica: "Leve a dama até a última fileira, dando xeque. Depois recapture com a torre.",
        explicacao: "Xeque-mate! Você sacrificou a dama para tirar a defesa do rei e deu mate com a torre.",
        tabuleiro: [
            "r.....k.", ".....ppp", "........", "........",
            "........", "........", "...Q....", "...R..K."
        ],
        jogadas: [
            { de: "d2", para: "d8" },   // você: dama
            { de: "a8", para: "d8" },   // adversário: torre captura
            { de: "d1", para: "d8" }    // você: torre dá o mate
        ]
    }
];

// =====================================================
// 2) VARIÁVEIS DO JOGO
// =====================================================
let numeroPuzzle = 0;     // qual puzzle está na tela (começa em 0)
let tabuleiro = [];       // matriz 8x8 com as peças
let origem = "";          // casa da peça escolhida (ex: "e4")
let terminou = false;     // true quando o puzzle foi resolvido
let passoAtual = 0;       // qual jogada da lista estamos esperando
let aguardando = false;   // true enquanto o adversário "pensa"

let erros = 0;            // erros no puzzle atual
let dicasUsadas = 0;      // dicas pedidas no puzzle atual
let nivelDica = 0;        // 0 = sem dica, 1 = mostra a peça, 2 = mostra também o destino
let ultimaJogada = null;  // jogada do adversário para destacar: { de, para } ou null

// Resultado de cada puzzle resolvido: { erros, dicas, estrelas }
// Guarda na posição do puzzle: resultados[0] é o puzzle 1, e assim por diante.
let resultados = [];

const divProgresso = document.getElementById("progresso");
const divTabuleiro = document.getElementById("tabuleiro");
const pTitulo = document.getElementById("titulo");
const pObjetivo = document.getElementById("objetivo");
const divLance = document.getElementById("lance");
const divMensagem = document.getElementById("mensagem");
const btnDica = document.getElementById("btnDica");
const btnProximo = document.getElementById("btnProximo");

// =====================================================
// 3) FUNÇÕES AUXILIARES
// =====================================================

function ehBranca(peca) {
    return peca !== "." && peca === peca.toUpperCase();
}

// (4, 4) -> "e4"
function nomeDaCasa(linha, coluna) {
    return letrasColunas[coluna] + (8 - linha);
}

// "e4" -> { linha: 4, coluna: 4 }
function posicao(nome) {
    const coluna = letrasColunas.indexOf(nome[0]);
    const linha = 8 - Number(nome[1]);
    return { linha: linha, coluna: coluna };
}

// Adiciona uma caixinha colorida na área de mensagens.
// "tipo" é a cor: "erro" (vermelho), "acerto" (verde), "estrelas" (amarelo).
// Sem tipo, a caixa fica cinza.
function adicionarAviso(texto, tipo) {
    const caixa = document.createElement("div");
    caixa.textContent = texto;
    caixa.classList.add("aviso");
    caixa.classList.add(tipo ? tipo : "neutro");
    divMensagem.appendChild(caixa);
}

// Troca a mensagem inteira. Texto vazio não mostra nada.
function mostrarMensagem(texto, tipo) {
    divMensagem.innerHTML = "";
    if (texto !== "") {
        adicionarAviso(texto, tipo);
    }
}

// 1 vira "1 erro" e 2 vira "2 erros"
function textoContagem(quantidade, singular, plural) {
    return quantidade + " " + (quantidade === 1 ? singular : plural);
}

// Estrelas perdidas = erros + dicas. Nenhuma perda = 3 estrelas.
// Os parâmetros têm outro nome (qtdErros) para não se misturar
// com as variáveis "erros" e "dicasUsadas" lá de cima.
function calcularEstrelas(qtdErros, qtdDicas) {
    const perdidos = qtdErros + qtdDicas;
    if (perdidos === 0) {
        return 3;
    } else if (perdidos === 1) {
        return 2;
    } else {
        return 1;
    }
}

// 2 estrelas vira "★★☆"
function textoEstrelas(quantidade) {
    let texto = "";
    for (let i = 0; i < 3; i++) {
        texto += i < quantidade ? "★\uFE0E" : "☆\uFE0E";
    }
    return texto;
}

// Escolhe a mensagem de erro conforme o tipo de erro
function descobrirErro(origemClicada, jogadaCerta) {
    if (origemClicada !== jogadaCerta.de) {
        return "Essa não é a peça da jogada certa. Tente outra!";
    } else {
        return "Peça certa, mas a casa de destino não é essa. Tente de novo!";
    }
}

// =====================================================
// 4) SALVAR E CARREGAR PROGRESSO (localStorage)
// =====================================================

// "proximo" é o número do puzzle onde o jogador deve continuar
function salvarProgresso(proximo) {
    const dados = { numeroPuzzle: proximo, resultados: resultados };
    // localStorage só guarda texto, por isso o JSON.stringify
    localStorage.setItem(CHAVE_SALVA, JSON.stringify(dados));
}

function carregarProgresso() {
    const texto = localStorage.getItem(CHAVE_SALVA);
    if (texto !== null) {   // null = ninguém salvou nada ainda (primeira vez)
        const dados = JSON.parse(texto);   // transforma o texto de volta em objeto
        numeroPuzzle = dados.numeroPuzzle;
        resultados = dados.resultados;
    }
}

// Volta para o puzzle 1 e zera os resultados (botão "Jogar de novo")
function recomecar() {
    numeroPuzzle = 0;
    resultados = [];
    salvarProgresso(0);
    carregarPuzzle();
}

// =====================================================
// 5) FUNÇÕES DO JOGO
// =====================================================

function moverPeca(de, para) {
    const a = posicao(de);
    const b = posicao(para);

    let peca = tabuleiro[a.linha][a.coluna];
    tabuleiro[a.linha][a.coluna] = ".";

    // Peão branco que chega na última fileira vira dama
    if (peca === "P" && b.linha === 0) {
        peca = "Q";
    }
    tabuleiro[b.linha][b.coluna] = peca;
}

// Desenha no máximo 5 bolinhas, sempre mostrando a atual
function desenharProgresso() {
    divProgresso.innerHTML = "";
    const total = puzzles.length;

    let inicio = numeroPuzzle - 2;
    if (inicio > total - 5) {
        inicio = total - 5;
    }
    if (inicio < 0) {
        inicio = 0;
    }
    const fim = inicio + 5;   // sempre 5 bolinhas (o jogo tem 10 puzzles)

    for (let i = inicio; i < fim; i++) {
        const bolinha = document.createElement("div");
        bolinha.classList.add("bolinha");
        bolinha.textContent = i + 1;

        if (i < numeroPuzzle) {
            bolinha.classList.add("feito");
        } else if (i === numeroPuzzle) {
            bolinha.classList.add("atual");
        }

        divProgresso.appendChild(bolinha);
    }
}

// "Lance 1 de 2": conta só os lances do jogador
function atualizarLance() {
    const puzzle = puzzles[numeroPuzzle];
    const totalLances = Math.ceil(puzzle.jogadas.length / 2);
    const lanceAtual = Math.floor(passoAtual / 2) + 1;
    divLance.textContent = "Lance " + lanceAtual + " de " + totalLances;
}

function carregarPuzzle() {
    const puzzle = puzzles[numeroPuzzle];

    tabuleiro = [];
    for (let i = 0; i < 8; i++) {
        tabuleiro.push(puzzle.tabuleiro[i].split(""));
    }

    origem = "";
    terminou = false;
    passoAtual = 0;
    aguardando = false;
    erros = 0;
    dicasUsadas = 0;
    nivelDica = 0;
    ultimaJogada = null;

    pTitulo.textContent = puzzle.titulo;
    pObjetivo.textContent = "Objetivo: " + puzzle.objetivo;
    mostrarMensagem("");
    btnDica.disabled = false;
    btnProximo.disabled = true;
    btnProximo.textContent = numeroPuzzle === puzzles.length - 1 ? "Finalizar" : "Próximo puzzle";

    desenharProgresso();
    atualizarLance();
    desenharTabuleiro();
}

function desenharTabuleiro() {
    divTabuleiro.innerHTML = "";
    const puzzle = puzzles[numeroPuzzle];

    for (let linha = 0; linha < 8; linha++) {
        for (let coluna = 0; coluna < 8; coluna++) {
            const casa = document.createElement("div");
            const nomeCasa = nomeDaCasa(linha, coluna);
            casa.classList.add("casa");
            casa.classList.add((linha + coluna) % 2 === 0 ? "clara" : "escura");

            // Casas da última jogada do adversário
            if (ultimaJogada !== null) {
                if (nomeCasa === ultimaJogada.de || nomeCasa === ultimaJogada.para) {
                    casa.classList.add("ultima");
                }
            }

            // Peça escolhida
            if (nomeCasa === origem) {
                casa.classList.add("selecionada");
            }

            // Dica: nível 1 marca a peça, nível 2 marca também o destino
            if (nivelDica > 0) {
                const jogadaDaVez = puzzle.jogadas[passoAtual];
                if (nomeCasa === jogadaDaVez.de) {
                    casa.classList.add("dica");
                }
                if (nivelDica >= 2 && nomeCasa === jogadaDaVez.para) {
                    casa.classList.add("dica");
                }
            }

            const peca = tabuleiro[linha][coluna];
            if (peca !== ".") {
                casa.textContent = pecas[peca.toUpperCase()];
                casa.classList.add(ehBranca(peca) ? "branca" : "preta");
            }

            casa.onclick = function () {
                clicarCasa(linha, coluna);
            };

            divTabuleiro.appendChild(casa);
        }
    }
}

function jogarAdversario() {
    const jogada = puzzles[numeroPuzzle].jogadas[passoAtual];
    moverPeca(jogada.de, jogada.para);
    ultimaJogada = { de: jogada.de, para: jogada.para };   // para destacar no tabuleiro
    passoAtual++;
    aguardando = false;
    mostrarMensagem("O adversário respondeu. Sua vez!");
    atualizarLance();
    desenharTabuleiro();
}

function clicarCasa(linha, coluna) {
    if (terminou || aguardando) {
        return;
    }

    const nomeCasa = nomeDaCasa(linha, coluna);
    const peca = tabuleiro[linha][coluna];

    if (ehBranca(peca)) {
        origem = nomeCasa;
        mostrarMensagem("");
        desenharTabuleiro();
        return;
    }

    if (origem === "") {
        mostrarMensagem("Clique primeiro em uma peça branca.", "erro");
        return;
    }

    const puzzle = puzzles[numeroPuzzle];
    const jogadaCerta = puzzle.jogadas[passoAtual];

    if (origem === jogadaCerta.de && nomeCasa === jogadaCerta.para) {
        moverPeca(origem, nomeCasa);
        passoAtual++;
        origem = "";
        nivelDica = 0;
        ultimaJogada = null;   // some o destaque do adversário quando você joga

        if (passoAtual >= puzzle.jogadas.length) {
            // Puzzle resolvido: guarda o resultado e salva
            terminou = true;
            const estrelas = calcularEstrelas(erros, dicasUsadas);
            resultados[numeroPuzzle] = { erros: erros, dicas: dicasUsadas, estrelas: estrelas };
            salvarProgresso(numeroPuzzle + 1);

            mostrarMensagem("Correto! " + puzzle.explicacao, "acerto");
            adicionarAviso(
                "Você acertou com " + textoContagem(erros, "erro", "erros") +
                " e " + textoContagem(dicasUsadas, "dica", "dicas") + ". " +
                textoEstrelas(estrelas),
                "estrelas"
            );
            btnProximo.disabled = false;
            btnDica.disabled = true;
        } else {
            aguardando = true;
            btnDica.disabled = false;   // libera a dica para o próximo passo
            mostrarMensagem("Boa jogada! Aguarde a resposta do adversário...", "acerto");
            setTimeout(jogarAdversario, 800);
        }
        atualizarLance();
    } else {
        erros++;
        mostrarMensagem(descobrirErro(origem, jogadaCerta), "erro");
        origem = "";
    }

    desenharTabuleiro();
}

function pedirDica() {
    if (aguardando) {
        return;
    }
    nivelDica++;
    dicasUsadas++;

    if (nivelDica === 1) {
        mostrarMensagem("Dica: " + puzzles[numeroPuzzle].dica);
    } else {
        mostrarMensagem("A casa de destino também está marcada em azul.");
        btnDica.disabled = true;   // acabaram os níveis de dica deste passo
    }
    desenharTabuleiro();
}

// Tela final, com o resumo de todos os puzzles
function mostrarFim() {
    numeroPuzzle = puzzles.length;   // todas as bolinhas ficam verdes
    desenharProgresso();
    divTabuleiro.innerHTML = "";

    let totalEstrelas = 0;
    let totalErros = 0;
    let totalDicas = 0;
    for (let i = 0; i < resultados.length; i++) {
        totalEstrelas += resultados[i].estrelas;
        totalErros += resultados[i].erros;
        totalDicas += resultados[i].dicas;
    }

    pTitulo.textContent = "Parabéns!";
    pObjetivo.textContent = "Você resolveu todos os puzzles!";
    divLance.textContent = "";
    mostrarMensagem("Você ganhou " + totalEstrelas + " de " + (puzzles.length * 3) + " estrelas!", "estrelas");
    adicionarAviso("Erros: " + totalErros + " | Dicas: " + totalDicas, "estrelas");
    btnProximo.textContent = "Jogar de novo";
    btnProximo.disabled = false;   // agora o botão recomeça o jogo
    btnDica.disabled = true;
}

function proximoPuzzle() {
    if (numeroPuzzle >= puzzles.length) {
        recomecar();   // tela final: o botão virou "Jogar de novo"
    } else if (numeroPuzzle < puzzles.length - 1) {
        numeroPuzzle++;
        carregarPuzzle();
    } else {
        mostrarFim();
    }
}

// =====================================================
// 6) LIGANDO OS BOTÕES E INICIANDO
// =====================================================
btnDica.onclick = pedirDica;
btnProximo.onclick = proximoPuzzle;

carregarProgresso();   // lê o que foi salvo (se houver)
if (numeroPuzzle >= puzzles.length) {
    mostrarFim();
} else {
    carregarPuzzle();
}