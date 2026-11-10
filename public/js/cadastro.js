// vailidação de senha e de foto selecionado

let statusValidacao = false;
var fotoVar = "";

function validar() {

  let validacao = 0;
  let senha = senha_input.value;

  if (senha.length >= 8) {
    validacao++;
    reqCaractere.style.color = "green";
  }
  else {
    reqCaractere.style.color = "white";

  }

  if (senha != senha.toUpperCase() && senha != senha.toLowerCase()) {
    validacao++;
    reqCaixa.style.color = "green";
  }
  else {
    reqCaixa.style.color = "white";
  }

  if (senha.includes('0') || senha.includes('1') || senha.includes('2') || senha.includes('3') || senha.includes('4') || senha.includes('5') || senha.includes('6') || senha.includes('7') || senha.includes('8') || senha.includes('9')) {
    validacao++;
    reqNumero.style.color = "green";
  }
  else {
    reqNumero.style.color = "white";
  }

  if (validacao == 3) {
    senha_status.innerHTML = "🔒 Senha Forte";
    senha_status.style.color = "green";
    statusValidacao = true;
  } else if (validacao == 2) {
    senha_status.innerHTML = "⚠️ Senha Média";
    senha_status.style.color = "orange";
    statusValidacao = false;
  } else {
    senha_status.innerHTML = "❌ Senha Fraca";
    senha_status.style.color = "red";
    statusValidacao = false;
  }
}

// funcao de selecionar foto
function selecionarAvatar(elementoHtml) {
  const avatares = document.querySelectorAll('.avatar-item');

  for (let i = 0; i < avatares.length; i++) {
    avatares[i].classList.remove('selecionado');
  }

  elementoHtml.classList.add('selecionado');

  const elementoAtual = elementoHtml.querySelector('img');
  const descricao = elementoAtual.getAttribute('alt');
  const imagem = elementoAtual.getAttribute('src');

  fotoVar = imagem;
  console.log(`Foto selecionada: ${descricao}`)
}



// variaveis para determinar a etapa do cadastro
let etapa = 1;
const totalEtapas = 3;

// funcao do botao avancar
function avancar() {
  if (etapa < totalEtapas) {
    etapa++;
    atualizar();
  }
}

// funcção do botao voltar
function voltar() {
  if (etapa > 1) {
    etapa--;
    atualizar();
  }
}


// funcão responsavel por atualizar o bloco cadastro, cada vez que avança ou volte
function atualizar() {
  // controla o que aparece na tela cadastro [INPUTS]
  for (let i = 1; i <= totalEtapas; i++) {
    const conteudoEtapa = document.getElementById(`conteudo-etapa-${i}`);

    if (i == etapa) {
      conteudoEtapa.classList.add('ativo');
    } else {
      conteudoEtapa.classList.remove('ativo');
    }
  }

  // Controla as cores do circulo de etapas e texto
  for (let i = 1; i <= totalEtapas; i++) {
    const circulo = document.getElementById(`etapa-${i}`);
    const linha = document.getElementById(`linha-${i - 1}`);
    const texto = document.getElementById(`texto-${i}`)

    if (i <= etapa) {
      circulo.style.borderColor = '#00cc33';
      texto.style.color = '#00cc33';

      if (linha) {
        linha.style.backgroundColor = '#00cc33';
      }
    }
    else {
      circulo.style.borderColor = '#505050';

      if (linha) {
        linha.style.backgroundColor = '#505050';
        texto.style.color = '#505050';
      }
    }
  }

  // comportamento do botão "Voltar" (Esconde na primeira tela)
  const btnVoltar = document.getElementById('btnVoltar');
  const btnContinuar = document.getElementById('botao');

  if (etapa == 1) {
    btnVoltar.style.display = "none";
  }
  else if (etapa == totalEtapas) {
    btnVoltar.style.display = "none";
    btnContinuar.innerText = 'Finalizar Cadastro'
  }
  else {
    btnVoltar.style.display = "block";
  }

}


// executa para mostrar a etapa 1 quando é inicializado o html
atualizar();