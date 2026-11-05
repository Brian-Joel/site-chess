// variaveis para determinar a etapa do cadastro
let etapa = 1;
const totalEtapas = 3;

// funcao do botao avancar
function avancar() {
  if (etapa < totalEtapas) {
    etapa++;
    atualizar();
  }
  else {
    alert("Cadastro enviado com sucesso para a trilha Xeque-Mate!");
  }
}

// funcção do botao voltar
function voltar() {
  if (etapa > 1) {
    etapa--;
    atualizar();
  }
  else {

    const resposta = confirm('Deseja realmente sair do cadastro?');

    if (resposta) {
      console.log('usuario clicou em SIM');
      window.location.href = './index.html';
    }
    else {
      console.log('usuario clicou em NÃO');
    }
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

  // Controla as cores do circulo de etapas
  for (let i = 1; i <= totalEtapas; i++) {
    const circulo = document.getElementById(`etapa-${i}`);
    const linha = document.getElementById(`linha-${i - 1}`);

    if (i <= etapa) {
      circulo.style.borderColor = '#00cc33';

      if (linha) {
        linha.style.backgroundColor = '#00cc33';
      }
    }
    else {
      circulo.style.borderColor = '#505050';

      if (linha) {
        linha.style.backgroundColor = '#505050';
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