const listaDeQuestoes = [

    {
        pergunta: "Em um fim de semana livre, você prefere:",
        alternativaA: "Estudar algo novo sozinho",
        alternativaB: "Sair com os amigos",
        alternativaC: "Descansar e relaxar",
        alternativaD: "Praticar um hobby criativo",
        perfilA: "A", perfilB: "B", perfilC: "C", perfilD: "D"
    },

    {
        pergunta: "Diante de um problema difícil, você:",
        alternativaA: "Analisa todos os detalhes",
        alternativaB: "Pede ajuda a alguém",
        alternativaC: "Tenta algo diferente",
        alternativaD: "Respira e planeja com calma",
        perfilA: "B", perfilB: "C", perfilC: "D", perfilD: "A"
    },

    {
        pergunta: "Qual frase mais combina com você?",
        alternativaA: "Quero ver o mundo",
        alternativaB: "Valorizo minha paz",
        alternativaC: "Gosto de aprender sempre",
        alternativaD: "Amo estar com pessoas",
        perfilA: "D", perfilB: "C", perfilC: "A", perfilD: "B"
    },
    {
        pergunta: "Brancas jogam. O que você faria nesta posição?",
        imgPergunta: "../assets/quiz/posicao1.gif",
        alternativaA: "Avançar o cavalo para perto do rei adversário, criando ameaça imediata de ataque ao ponto fraco ao lado do rei. (Ng5)",
        alternativaB: "Fazer um lance tranquilo que reforça o centro e prepara o desenvolvimento das peças. (d3)",
        alternativaC: "Colocar o rei em segurança fazendo o roque, antes de qualquer coisa. (O-O)",
        alternativaD: "Abrir o centro com um avanço de peão, mantendo a tensão e as opções abertas. (d4)",
        perfilA: "A", perfilB: "B", perfilC: "C", perfilD: "D"
    }

]

// variáveis globais
let numeroDaQuestaoAtual = 0
let qtdA = 0
let qtdB = 0
let qtdC = 0
let qtdD = 0
let quantidadeDeQuestoes = listaDeQuestoes.length
let graficoProgresso = null

function onloadEsconder() {
    validarSessao();
    document.getElementById('pontuacao').style.display = "none"
    document.getElementById('jogo').style.display = "none"
}

function iniciarQuiz() {
    document.getElementById('pontuacao').style.display = "flex"
    document.getElementById('jogo').style.display = "flex"
    document.getElementById('btnIniciarQuiz').style.display = "none"

    document.getElementById('qtdQuestoes').innerHTML = quantidadeDeQuestoes

    preencherHTMLcomQuestaoAtual(0)
    atualizarBarraProgresso()

    btnSubmeter.disabled = false
    btnProx.disabled = true
    btnTentarNovamente.disabled = true
}

function preencherHTMLcomQuestaoAtual(index) {
    habilitarAlternativas(true)
    const questaoAtual = listaDeQuestoes[index]
    numeroDaQuestaoAtual = index
    console.log("questaoAtual")
    console.log(questaoAtual)
    document.getElementById("spanNumeroDaQuestaoAtual").innerHTML = Number(index) + 1 // ajustando porque o index começa em 0
    document.getElementById("spanEnunciado").innerHTML = questaoAtual.pergunta;       // id do seu front atual
    renderizarImagemPergunta(questaoAtual.imgPergunta);
    document.getElementById("labelOpcaoUm").innerHTML = questaoAtual.alternativaA;
    document.getElementById("labelOpcaoDois").innerHTML = questaoAtual.alternativaB;
    document.getElementById("labelOpcaoTres").innerHTML = questaoAtual.alternativaC;
    document.getElementById("labelOpcaoQuatro").innerHTML = questaoAtual.alternativaD;

    atualizarBarraProgresso()
}

function submeter() {
    const options = document.getElementsByName("option"); // recupera alternativas no html

    let hasChecked = false
    for (let i = 0; i < options.length; i++) {
        if (options[i].checked) {
            hasChecked = true
            break
        }
    }

    if (!hasChecked) {
        alert("Não há alternativas escolhidas. Escolha uma opção.")
    } else {
        btnSubmeter.disabled = true
        btnProx.disabled = false

        habilitarAlternativas(false)

        checarResposta()
    }
}

function habilitarAlternativas(trueOrFalse) {
    let opcaoEscolhida = trueOrFalse ? false : true

    primeiraOpcao.disabled = opcaoEscolhida
    segundaOpcao.disabled = opcaoEscolhida
    terceiraOpcao.disabled = opcaoEscolhida
    quartaOpcao.disabled = opcaoEscolhida
}

function avancar() {
    btnProx.disabled = true
    btnSubmeter.disabled = false

    desmarcarRadioButtons()

    if (numeroDaQuestaoAtual < quantidadeDeQuestoes - 1) {
        preencherHTMLcomQuestaoAtual(numeroDaQuestaoAtual)
    } else if (numeroDaQuestaoAtual == quantidadeDeQuestoes - 1) {
        alert("Atenção... a próxima é a ultima questão!")
        preencherHTMLcomQuestaoAtual(numeroDaQuestaoAtual)
    } else {
        finalizarJogo()
    }
}

function tentarNovamente() {
    // atualiza a página
    window.location.reload()
}

function checarResposta() {                                               // ALTERADO
    const questaoAtual = listaDeQuestoes[numeroDaQuestaoAtual] // questão atual

    const options = document.getElementsByName("option"); // recupera alternativas no html

    options.forEach((option) => {
        if (option.checked === true) {
            // "alternativaA" -> "perfilA" -> perfil dessa alternativa
            const perfil = questaoAtual[option.value.replace("alternativa", "perfil")]

            if (perfil == "A") {
                qtdA++
            } else if (perfil == "B") {
                qtdB++
            } else if (perfil == "C") {
                qtdC++
            } else if (perfil == "D") {
                qtdD++
            }

            numeroDaQuestaoAtual++
        }
    })
}



function desmarcarRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

// Desenha a barra de progresso do quiz com o Chart.js.
function atualizarBarraProgresso() {
    const respondidas = Math.min(numeroDaQuestaoAtual, quantidadeDeQuestoes)
    const restantes = quantidadeDeQuestoes - respondidas

    const dados = {
        labels: ["Progresso"],
        datasets: [
            {
                data: [respondidas],
                backgroundColor: ["#00b822"],
                borderWidth: 0
            },
            {
                data: [restantes],
                backgroundColor: ["#262626"],
                borderWidth: 0
            }
        ]
    }

    if (graficoProgresso) {
        graficoProgresso.data = dados
        graficoProgresso.update()
        return
    }

    graficoProgresso = new Chart(document.getElementById("barra_progressao"), {
        type: "bar",
        data: dados,
        options: {
            indexAxis: "y",
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: { enabled: false }
            },
            scales: {
                x: { stacked: true, display: false, max: quantidadeDeQuestoes },
                y: { stacked: true, display: false }
            },
            animation: { duration: 200 }
        }
    })
}

// A tela de resultado não é usada: o botão leva direto ao dashboard.
function verEstatisticas() {
    window.location = "./dashboard.html"
}

function finalizarJogo() {                                                // ALTERADO
    btnProx.disabled = true
    btnSubmeter.disabled = true

    fetch("/quiz/registrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            idUsuarioServer: sessionStorage.ID_USUARIO,
            qtdAServer: qtdA,
            qtdBServer: qtdB,
            qtdCServer: qtdC,
            qtdDServer: qtdD
        })
    }).then(function (resposta) {
        if (resposta.status == 201) {
            window.location = "./dashboard.html"
        } else {
            alert("Não foi possível salvar seu resultado.")
            btnTentarNovamente.disabled = false
        }
    }).catch(function (erro) {
        console.log(erro)
        alert("Erro de conexão com o servidor.")
        btnTentarNovamente.disabled = false
    })
}

// para mostrar a imagem no quiz
function renderizarImagemPergunta(caminho) {
    const img = document.getElementById("imgPergunta");
    if (caminho) {
        img.src = caminho;
        img.style.display = "block";
    } else {
        img.removeAttribute("src");
        img.style.display = "none";
    }
}



// function limparCoresBackgroundOpcoes() {
//     const options = document.getElementsByName("option");
//     options.forEach((option) => {
//         document.getElementById(option.labels[0].id).classList.remove("text-danger-with-bg")
//         document.getElementById(option.labels[0].id).classList.remove("text-success-with-bg")
//     })
// }