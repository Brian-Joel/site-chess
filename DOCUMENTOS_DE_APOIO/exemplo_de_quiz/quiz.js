
const listaDeQuestoes = [

    {
        pergunta: "Qual mês tem 30 dias?",
        alternativaA: "Janeiro",
        alternativaB: "Dezembro",
        alternativaC: "Junho",
        alternativaD: "Agosto",
        alternativaCorreta: "alternativaC"
    },

    {
        pergunta: "Quantas horas tem em um dia?",
        alternativaA: "30 horas",
        alternativaB: "38 horas",
        alternativaC: "48 horas",
        alternativaD: "24 horas",
        alternativaCorreta: "alternativaD"
    },

    {
        pergunta: "Qual destes números é ímpar?",
        alternativaA: "Dez",
        alternativaB: "Doze",
        alternativaC: "Oito",
        alternativaD: "Onze",
        alternativaCorreta: "alternativaD"
    }

]

// variáveis globais    
let numeroDaQuestaoAtual = 0
let pontuacaoFinal = 0
let tentativaIncorreta = 0
let certas = 0
let erradas = 0
let quantidadeDeQuestoes = listaDeQuestoes.length
// let isUltima = numeroDaQuestaoAtual == quantidadeDeQuestoes-1 ? true : false

function onloadEsconder() {
    document.getElementById('pontuacao').style.display = "none"
    document.getElementById('jogo').style.display = "none"
}

function iniciarQuiz() {
    document.getElementById('pontuacao').style.display = "flex"
    document.getElementById('jogo').style.display = "flex"
    document.getElementById('btnIniciarQuiz').style.display = "none"

    document.getElementById('qtdQuestoes').innerHTML = quantidadeDeQuestoes

    preencherHTMLcomQuestaoAtual(0)

    btnSubmeter.disabled = false
    btnProx.disabled = true
    // btnConcluir.disabled = true
    btnTentarNovamente.disabled = true
}

function preencherHTMLcomQuestaoAtual(index) {
    habilitarAlternativas(true)
    const questaoAtual = listaDeQuestoes[index]
    numeroDaQuestaoAtual = index
    console.log("questaoAtual")
    console.log(questaoAtual)
    document.getElementById("spanNumeroDaQuestaoAtual").innerHTML = Number(index) + 1 // ajustando porque o index começa em 0
    document.getElementById("spanQuestaoExibida").innerHTML = questaoAtual.pergunta;
    document.getElementById("labelOpcaoUm").innerHTML = questaoAtual.alternativaA;
    document.getElementById("labelOpcaoDois").innerHTML = questaoAtual.alternativaB;
    document.getElementById("labelOpcaoTres").innerHTML = questaoAtual.alternativaC;
    document.getElementById("labelOpcaoQuatro").innerHTML = questaoAtual.alternativaD;
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
    limparCoresBackgroundOpcoes()
}

function tentarNovamente() {
    // atualiza a página
    window.location.reload()
}

function checarResposta() {
    const questaoAtual = listaDeQuestoes[numeroDaQuestaoAtual] // questão atual 
    const respostaQuestaoAtual = questaoAtual.alternativaCorreta // qual é a resposta correta da questão atual

    const options = document.getElementsByName("option"); // recupera alternativas no html

    let alternativaCorreta = null // variável para armazenar a alternativa correta

    options.forEach((option) => {
        if (option.value === respostaQuestaoAtual) {
            console.log("alternativaCorreta está no componente: " + alternativaCorreta)
            alternativaCorreta = option.labels[0].id
        }
    })

    // verifica se resposta assinalada é correta
    options.forEach((option) => {
        if (option.checked === true && option.value === respostaQuestaoAtual) {
            document.getElementById(alternativaCorreta).classList.add("text-success-with-bg")
            pontuacaoFinal++
            certas++
            document.getElementById("spanCertas").innerHTML = certas
            numeroDaQuestaoAtual++
        } else if (option.checked && option.value !== respostaQuestaoAtual) {
            const wrongLabelId = option.labels[0].id

            document.getElementById(wrongLabelId).classList.add("text-danger-with-bg")
            document.getElementById(alternativaCorreta).classList.add("text-success-with-bg")
            tentativaIncorreta++
            erradas++
            document.getElementById("spanErradas").innerHTML = erradas
            numeroDaQuestaoAtual++
        }
    })
}

function limparCoresBackgroundOpcoes() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).classList.remove("text-danger-with-bg")
        document.getElementById(option.labels[0].id).classList.remove("text-success-with-bg")
    })
}

function desmarcarRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

function finalizarJogo() {
    let textoParaMensagemFinal = null
    let classComCoresParaMensagemFinal = null
    const porcentagemFinalDeAcertos = pontuacaoFinal / quantidadeDeQuestoes

    if (porcentagemFinalDeAcertos <= 0.3) {
        textoParaMensagemFinal = "Parece que você não estudou..."
        classComCoresParaMensagemFinal = "text-danger-with-bg"
    }
    else if (porcentagemFinalDeAcertos > 0.3 && porcentagemFinalDeAcertos < 0.9) {
        textoParaMensagemFinal = "Pode melhorar na próxima, hein!"
        classComCoresParaMensagemFinal = "text-warning-with-bg"
    }
    else if (porcentagemFinalDeAcertos >= 0.9) {
        textoParaMensagemFinal = "Uau, parabéns!"
        classComCoresParaMensagemFinal = "text-success-with-bg"
    }

    textoParaMensagemFinal += "<br> Você acertou " + Math.round((porcentagemFinalDeAcertos) * 100) + "% das questões."


    document.getElementById('msgFinal').innerHTML = textoParaMensagemFinal
    document.getElementById('msgFinal').classList.add(classComCoresParaMensagemFinal)
    document.getElementById('spanPontuacaoFinal').innerHTML = pontuacaoFinal

    document.getElementById('jogo').classList.add("text-new-gray")

    btnProx.disabled = true
    btnSubmeter.disabled = true
    // btnConcluir.disabled = true
    btnTentarNovamente.disabled = false

}



//GRAFICO

// 1. Dados que vão vir do seu Banco de Dados (ex: MySQL)
// Quando você conectar ao BD, basta alimentar essas duas variáveis com o resultado da sua query
const labels = ['Progresso:'];
const valores = [10];

// 2. Estrutura de dados (Barras empilhadas)
const data = {
    labels: labels,
    datasets: [
        {
            label: 'Pontos totais',
            backgroundColor: '#00b822',
            data: valores,
            barThickness: 6,
            borderRadius: 4
        },
        {
            label: 'Fundo Cinza',
            backgroundColor: '#444444',
            data: valores.map(v => 100 - v),
            barThickness: 6,
            borderRadius: 4
        }
    ]
};

// 3. Configurações corrigidas
const config = {
    type: 'bar',
    data,
    options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        // AJUSTE CRUCIAL: Abre espaço na direita para os textos não cobrirem a barra
        layout: {
            padding: {
                right: 45
            }
        },
        plugins: {
            legend: false,
            tooltip: false
        },
        scales: {
            x: {
                stacked: true,
                display: false,
                max: 100
            },
            y: {
                stacked: true,
                display: false
            }
        }
    },
    plugins: [{
        id: 'textosCustomizados',
        afterDatasetsDraw(chart) {
            const { ctx, chartArea } = chart;
            ctx.save();
            ctx.fillStyle = '#ffffff';
            ctx.textBaseline = 'middle';

            valores.forEach((val, i) => {
                const yPos = chart.getDatasetMeta(0).data[i].y;

                // Nome do usuário (Acima da barra verde)
                ctx.font = '600 13px sans-serif';
                ctx.textAlign = 'left';
                ctx.fillText(labels[i], chartArea.left, yPos - 16);

                // Porcentagem (No espaço extra na direita, fora da barra)
                ctx.font = '500 12px sans-serif';
                ctx.textAlign = 'left'; // Mudado para left para alinhar na coluna extra
                ctx.fillText(val + ' pts', chartArea.right + 7, yPos); // chartArea.right + 10 joga o texto para a direita da barra
            });
            ctx.restore();
        }
    }]
};

// 4. Renderiza o gráfico finalizado
const grafico_2 = new Chart(
    document.getElementById('barra_progresso'),
    config
);