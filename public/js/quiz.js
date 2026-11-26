const listaDeQuestoes = [

    // Q1: agressivo na B, posicional na A, versátil na D, defensivo na C
    {
        pergunta: "Brancas jogam. O que você faria nesta posição?",
        imgPergunta: "../assets/quiz/posicao1.gif",
        alternativaA: "Fazer um lance tranquilo que reforça o centro e prepara o desenvolvimento das peças. (d3)",
        alternativaB: "Avançar o cavalo para perto do rei adversário, criando ameaça imediata de ataque ao ponto fraco ao lado do rei. (Ng5)",
        alternativaC: "Colocar o rei em segurança fazendo o roque, antes de qualquer coisa. (O-O)",
        alternativaD: "Abrir o centro com um avanço de peão, mantendo a tensão e as opções abertas. (d4)",
        perfilA: "B", perfilB: "A", perfilC: "C", perfilD: "D"
    },

    // Q3: agressivo na D, posicional na A, defensivo na C, versátil na B
    {
        pergunta: "Brancas jogam. O que você faria nesta posição?",
        imgPergunta: "../assets/quiz/posicao3.gif",
        alternativaA: "Recuar o bispo para uma casa segura, consolidando a estrutura. (Be2)",
        alternativaB: "Trazer a dama para uma casa central, conectando as torres e mantendo a tensão. (Qd2)",
        alternativaC: "Fazer o roque e tirar o rei do centro o quanto antes. (O-O)",
        alternativaD: "Levar o bispo para pressionar o cavalo adversário, criando uma cravada e ameaça de ataque. (Bb5)",
        perfilA: "B", perfilB: "D", perfilC: "C", perfilD: "A"
    },

    // Q9: A → Agressivo, B → Posicional, C → Defensivo, D → Versátil.
    {
        pergunta: "Numa posição difícil, com o relógio correndo, você:",
        alternativaA: "Ataca de forma ousada, mesmo com risco, para tentar virar o jogo.",
        alternativaB: "Mantém a calma e busca o lance mais sólido, sem se desesperar.",
        alternativaC: "Defende com unhas e dentes e espera o adversário errar.",
        alternativaD: "Avalia as opções e escolhe o plano que a posição pede, sem se prender a um estilo.",
        perfilA: "A", perfilB: "B", perfilC: "C", perfilD: "D"
    },

    // Q4: agressivo na B, posicional na D, defensivo na C, versátil na A
    {
        pergunta: "Brancas jogam. O que você faria nesta posição?",
        imgPergunta: "../assets/quiz/posicao4.gif",
        alternativaA: "Avançar o peão da ala do rei para ganhar espaço e criar passagem. (f4)",
        alternativaB: "Avançar o peão lateral para tentar abrir espaço na ala. (hxg6) (se houver peça preta em g6 para capturar)",
        alternativaC: "Manter o rei recuado, protegendo a estrutura e esperando o adversário se mexer. (Kg2)",
        alternativaD: "Melhorar a posição do rei, aproximando-o do centro para apoiar os peões. (Kf2)",
        perfilA: "D", perfilB: "A", perfilC: "C", perfilD: "B"
    },

    // Q5: agressivo na C, posicional na B, defensivo na A, versátil na D
    {
        pergunta: "Brancas jogam. O que você faria nesta posição?",
        imgPergunta: "../assets/quiz/posicao5.gif",
        alternativaA: "Trocar um par de peças para aliviar a pressão e simplificar. (Nxd5)",
        alternativaB: "Reforçar o controle do centro com um lance de peão sólido. (c4)",
        alternativaC: "Lançar um peão para frente para abrir linhas de ataque contra o rei adversário. (e5)",
        alternativaD: "Manter a tensão no centro, desenvolvendo uma peça e esperando. (Be2)",
        perfilA: "C", perfilB: "B", perfilC: "A", perfilD: "D"
    },

    // Mapeamento: A → Posicional (peão), B → Versátil (dama), C → Agressivo (cavalo), D → Defensivo (rei).
    {
        pergunta: "Qual peça de xadrez mais combina com você?",
        alternativaA: "O Peão — simples, mas essencial; avança devagar e nunca recua.",
        alternativaB: "A Dama — poderosa e versátil, atua em qualquer parte do tabuleiro.",
        alternativaC: "O Cavalo — imprevisível, salta por cima dos obstáculos e aparece onde ninguém espera.",
        alternativaD: "O Rei — fica no centro das atenções, mas precisa de proteção constante.",
        perfilA: "B", perfilB: "D", perfilC: "A", perfilD: "C"
    },

    // Q7:  A → Agressivo, B → Posicional, C → Defensivo, D → Versátil.
    {
        pergunta: "Que tipo de jogador você mais admira no xadrez?",
        alternativaA: "Os que sacrificam peças e criam ataques brilhantes, como Mikhail Tal.",
        alternativaB: "Os que dominam a posição com precisão cirúrgica, como Anatoly Karpov.",
        alternativaC: "Os que resistem a tudo e vencem nos detalhes, como Tigran Petrosian.",
        alternativaD: "Os que jogam qualquer estilo com maestria, como Magnus Carlsen.",
        perfilA: "A", perfilB: "B", perfilC: "C", perfilD: "D"
    },

    // Q2: agressivo na A, posicional na C, defensivo na B, versátil na D
    {
        pergunta: "Brancas jogam. O que você faria nesta posição?",
        imgPergunta: "../assets/quiz/posicao2.gif",
        alternativaA: "Levar o bispo para perto do cavalo adversário, criando pressão e ameaça de ataque. (Bb5)",
        alternativaB: "Fazer o roque e garantir a segurança do rei antes de pensar em ataque. (O-O)",
        alternativaC: "Desenvolver o bispo para uma casa central, ocupando uma diagonal forte. (Bd3)",
        alternativaD: "Empurrar um peão lateral para controlar uma casa importante e esperar a resposta do adversário. (a3)",
        perfilA: "A", perfilB: "C", perfilC: "B", perfilD: "D"
    },

    // Q8: A → Agressivo, B → Posicional, C → Defensivo, D → Versátil.
    {
        pergunta: "Você comete um erro numa partida importante. O que você faz?",
        alternativaA: "Parto para o ataque imediatamente, tentando compensar com agressividade.",
        alternativaB: "Avalio a posição com calma e busco a melhor forma de corrigir o erro.",
        alternativaC: "Simplifico o jogo e tento segurar a posição até o final.",
        alternativaD: "Mudo meu plano e adapto o estilo ao que a posição pede agora.",
        perfilA: "A", perfilB: "B", perfilC: "C", perfilD: "D"
    },

    // Q10: A → Agressivo, B → Posicional, C → Defensivo, D → Versátil.
    {
        pergunta: "Se você pudesse escolher uma única qualidade para levar para todas as suas partidas, qual seria?",
        alternativaA: "Coragem para sacrificar e atacar sem medo.",
        alternativaB: "Paciência para construir vantagens aos poucos.",
        alternativaC: "Resistência para defender até o último lance.",
        alternativaD: "Flexibilidade para mudar de plano quando a posição pedir.",
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

// conjunto de radius para habilitar ou desabilitar
function habilitarAlternativas(habilitar) {
    let desabilitar = !habilitar;

    primeiraOpcao.disabled = desabilitar
    segundaOpcao.disabled = desabilitar
    terceiraOpcao.disabled = desabilitar
    quartaOpcao.disabled = desabilitar
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

function checarResposta() {   
    const questaoAtual = listaDeQuestoes[numeroDaQuestaoAtual] // questão atual

    const options = document.getElementsByName("option"); // recupera alternativas no html

    options.forEach((option) => {
        if (option.checked === true) {
            // "alternativaA" -> "perfilA" -> perfil dessa alternativa | mudança de nome no value
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

    // Atualiza a barra assim que a resposta é contabilizada, sem esperar o "Continuar".
    atualizarBarraProgresso()
}


// desmarca todos
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
    // Garante que a barra de progresso fique cheia (10/10) antes de sair da tela.
    numeroDaQuestaoAtual = quantidadeDeQuestoes
    atualizarBarraProgresso()

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