// TESTE DE JSON 

// [
//     {
//         "idPergunta": 1,
//         "pergunta": "Qual seu estilo de abertura?",
//         "idAlternativa": 1,
//         "alternativa": "Jogo agressivamente"
//     },
//     {
//         "idPergunta": 1,
//         "pergunta": "Qual seu estilo de abertura?",
//         "idAlternativa": 2,
//         "alternativa": "Jogo defensivamente"
//     }
// ]


// VARIÁVEIS GLOBAIS

let listaDeQuestoes = [];
let quantidadeDeQuestoes = 0;



// BUSCAR QUESTÕES NO BANCO DE DADOS

function buscarQuestoes() {

    // fetch: requisita dados que está no endpoint quiz/listar
    return fetch("/quiz/listar", {
        method: "GET" // utiliza o metodo get
    })
        .then((resposta) => { //pega os dados e manda pra resposta transformado em JSON
            return resposta.json();
        })
        .then((dados) => {
            const questoesOrganizadas = {};

            // forEach so pecebe uma linha por vez
            dados.forEach((linha) => {
                const id = linha.idPergunta; // pega as os dados das respostas, isto é, pega o formato em JSON e manda pro organizar

                if (questoesOrganizadas[id]) {
                    // A pergunta já existe: adiciona outra alternativa
                    questoesOrganizadas[id].alternativas.push({
                        idAlternativa: linha.idAlternativa, //add o id
                        texto: linha.alternativa  // add a alternativa
                    });

                } else {
                    // A pergunta ainda não existe: cria ela
                    questoesOrganizadas[id] = {
                        idPergunta: linha.idPergunta,
                        pergunta: linha.pergunta,
                        categoria: linha.categoria,
                        alternativas: [
                            {
                                idAlternativa: linha.idAlternativa,
                                texto: linha.alternativa
                            }
                        ]
                    };
                }
            })

            listaDeQuestoes = Object.values(questoesOrganizadas);

            quantidadeDeQuestoes = listaDeQuestoes.length;

            console.log("Questões carregadas:", listaDeQuestoes);

            return listaDeQuestoes;

        })
};


// ESCONDER ELEMENTOS AO CARREGAR A PÁGINA

function onloadEsconder() {

    document.getElementById("pontuacao").style.display = "none";
    document.getElementById("jogo").style.display = "none";
    document.querySelector(".placar-resultado").style.display = "none";

}



// INICIAR QUIZ


async function iniciarQuiz() {
    await buscarQuestoes();

    numeroDaQuestaoAtual = 0;
    respostasSelecionadas = [];

    document.getElementById("btnIniciarQuiz").style.display = "none";
    document.getElementById("jogo").style.display = "block";

    document.getElementById("btnProx").disabled = false;

    preencherHTMLcomQuestaoAtual(0);
}

// EXIBIR QUESTÃO ATUAL


function preencherHTMLcomQuestaoAtual(indice) {

    // Recupera a questão atual
    const questaoAtual = listaDeQuestoes[indice];

    console.log("Índice:", indice, "Questão:", questaoAtual);
    console.log("Alternativas:", questaoAtual.alternativas);

    // Limpa as alternativas da questão anterior
    desmarcarRadioButtons();
    habilitarAlternativas(true);
    limparCoresBackgroundOpcoes();

    // Exibe o número da questão
    document.getElementById("spanNumeroDaQuestaoAtual").innerHTML = indice + 1;

    // Exibe o enunciado
    document.getElementById("spanEnunciado").innerHTML = questaoAtual.pergunta;

    const camposAlternativas = [
        "labelOpcaoUm",
        "labelOpcaoDois",
        "labelOpcaoTres",
        "labelOpcaoQuatro"
    ];

    const radios = [
        "primeiraOpcao",
        "segundaOpcao",
        "terceiraOpcao",
        "quartaOpcao"
    ];

    // Recupera as alternativas
    const alternativas = questaoAtual.alternativas;

    // Recupera a resposta anteriormente selecionada
    const respostaAnterior = respostasSelecionadas[indice];

    // Preenche cada alternativa
    alternativas.forEach((alternativa, posicao) => {

        document.getElementById(camposAlternativas[posicao]).innerHTML = alternativa.texto;

        const radio = document.getElementById(radios[posicao]);

        radio.value = alternativa.idAlternativa;

        // Restaura a resposta anterior, se existir
        if (respostaAnterior &&
            Number(respostaAnterior.idAlternativa) === Number(alternativa.idAlternativa)) {
            radio.checked = true;
        }
    });
}




// HABILITAR OU DESABILITAR ALTERNATIVAS

function habilitarAlternativas(estado) {

    const options = document.getElementsByName("option");

    options.forEach(function (option) {

        option.disabled = !estado;

    });

}


// AVANÇAR QUESTÃO

function avancar() {

    // Tenta guardar a resposta atual
    if (!salvarRespostaAtual()) {
        return;
    }

    if (numeroDaQuestaoAtual < quantidadeDeQuestoes - 1) {

        numeroDaQuestaoAtual++;

        preencherHTMLcomQuestaoAtual(numeroDaQuestaoAtual);

        document.getElementById("btnVoltar").disabled = false;

    } else {

        finalizarJogo();
    }
}


// VOLTAR QUESTÃ0
function voltar() {

    // Verifica se existe alguma alternativa selecionada
    const alternativaSelecionada = document.querySelector(
        'input[name="option"]:checked'
    );

    // Salva a resposta somente se houver uma seleção
    if (alternativaSelecionada) {
        respostasSelecionadas[numeroDaQuestaoAtual] = {
            idPergunta: listaDeQuestoes[numeroDaQuestaoAtual].idPergunta,
            idAlternativa: Number(alternativaSelecionada.value)
        };
    }

    if (numeroDaQuestaoAtual > 0) {

        numeroDaQuestaoAtual--;

        preencherHTMLcomQuestaoAtual(numeroDaQuestaoAtual);

        document.getElementById("btnVoltar").disabled =
            numeroDaQuestaoAtual === 0;

    }
}


// FINALIZAR QUIZ

function finalizarJogo() {

    document.getElementById("jogo").style.display = "none";

    document.getElementById("pontuacao").style.display = "none";

    document.querySelector(".placar-resultado").style.display = "block";

    document.getElementById("btnTentarNovamente").disabled = false;

    console.log("Respostas selecionadas:", respostasSelecionadas);

    document.getElementById("resultado_final").innerText =
        "Respostas registradas!";

}



// LIMPAR ALTERNATIVAS

function desmarcarRadioButtons() {

    const options = document.getElementsByName("option");

    options.forEach(function (option) {

        option.checked = false;

    });

}


function limparCoresBackgroundOpcoes() {

    const opcoes = document.querySelectorAll(".cartao-opcao");

    opcoes.forEach(function (opcao) {

        opcao.classList.remove("text-danger-with-bg");

        opcao.classList.remove("text-success-with-bg");
    });

}


// TENTAR NOVAMENTE

function tentarNovamente() {

    window.location.reload();

}

// tenta salvar resposta atual
function salvarRespostaAtual() {

    const options = document.getElementsByName("option");

    let alternativaSelecionada = null;

    options.forEach((option) => {

        if (option.checked) {
            alternativaSelecionada = option;
        }

    });


    if (alternativaSelecionada == null) {
        alert("Escolha uma alternativa antes de continuar.");
        return false;
    }

    respostasSelecionadas[numeroDaQuestaoAtual] = {

        idPergunta: listaDeQuestoes[numeroDaQuestaoAtual].idPergunta,

        idAlternativa: Number(alternativaSelecionada.value)

    };

    return true;
}



// CONFIRMAR RESPOSTA
function submeter() {

    const options = document.getElementsByName("option");

    let alternativaSelecionada = null;

    options.forEach(function (option) {

        if (option.checked) {
            alternativaSelecionada = option;
        }

    });

    if (alternativaSelecionada === null) {

        alert("Escolha uma alternativa antes de continuar.");
        return;
    }

    respostasSelecionadas[numeroDaQuestaoAtual] = {
        idPergunta: listaDeQuestoes[numeroDaQuestaoAtual].idPergunta,
        idAlternativa: Number(alternativaSelecionada.value)
    };

    document.getElementById("btnSubmeter").disabled = true;

    document.getElementById("btnProx").disabled = false;

    habilitarAlternativas(false);

}