# AGENTS.md

## Visão geral

- **Objetivo da aplicação:** Desenvolver um sistema web estruturado onde o usuário passa por uma tela de login/cadastro antes de acessar o ecossistema principal. O sistema conta com um dashboard de estatísticas com gráficos (Chart.js), uma seção "Sobre" (contando a paixão pessoal pelo xadrez) e um tabuleiro de xadrez funcional pós-login, integrando regras completas, bot inteligente heurístico com variação, indicação de xeque, destaque de movimentos legais, promoção de peão e salvamento de dados no back-end.

- **Problema que resolve:** Oferece uma plataforma simples e interativa para jogar xadrez contra a máquina ou jogar multiplayer local após autenticação, permitindo acompanhar o progresso individual e gerenciar o histórico de partidas.

- **Principais usuários:** Entusiastas de xadrez, estudantes e jogadores amadores que buscam autenticação, treino, jogabilidade fluida e visualização de estatísticas de desempenho.


## Tecnologias

- **Linguagens:** HTML5, CSS3, JavaScript (Vanilla), Node.js, MySQL.

- **Estilização:** CSS3 (Flexbox e CSS Grid para renderização e alinhamento do tabuleiro, além de layouts responsivos para telas de login, estatísticas, perfil e navegação).

- **Banco de Dados:** MySQL (para armazenamento de cadastros de usuários, dados de perfil e estatísticas básicas de partidas).

- **Ferramentas e Bibliotecas:** VS Code, Git / GitHub, Chart.js, chess.js, chessboard.js, jQuery e web-data-viz;


## Comandos

- Para executar o front-end localmente:
  - Abra o VS Code na pasta do projeto.
  - Utilize o arquivo login.html como ponto de inicio no navegador.
- Para o back-end e banco de dados:
  - Execute o script SQL localizado na pasta database/ no MySQL Workbench para criar a base de dados e as tabelas.
  - Inicie o servidor Node.js na pasta de back-end.
  - usar npm i apenas uma vez para instalar as dependencias.
  - usar npm start para executar o comando do data-viz;

## Arquitetura e Fluxo de Navegação

O projeto está organizado na seguinte estrutura de pastas e segue o fluxo onde o tabuleiro e o dashboard só são acessados após a validação do login:

Novos arquivos criados pelo agente devem seguir rigorosamente esta estrutura de 5 passos:
- *Passo 1 (/public)*: Arquivos HTML (ex: cadastro.html), CSS e JS necessários para que o front-end funcione. Tudo que o usuário vai ver e interagir.
- *Passo 2 (/src/routes)*: Rotas e caminhos por onde os dados serão enviados.
- *Passo 3 (/src/controllers)*: Validações e regras de negócio pelas quais o dado precisa passar antes de montar a query.
- *Passo 4 (/src/models)*: Criação de toda query (INSERT, SELECT, etc.) que será efetuada no banco de dados.
- *Passo 5 (/src/database/config.js)*: Configuração e credenciais de banco de dados para efetuar a query montada.
obs: colocar routess, controler e etc

## Padrões de desenvolvimento

- Utilizar const por padrão e let apenas quando houver necessidade de reatribuição.

- Padrão de nomenclatura limpo e descritivo para arquivos, funções e variáveis (em português/camelCase).

- Manter funções modulares (separando a lógica de autenticação, o motor do bot, estilizações dinâmicas e manipulação de DOM).

- quando implementar o codigo pro git-hub, utilizar as nomenclaturas ideias: feat, fix, e etc.

## Cuidados e restrições

- Garantir que o acesso às páginas protegidas (index.html, estatisticas.html, sobre.html) valide se o usuário está devidamente logado, redirecionando para o login.html caso contrário.

- Evitar dependências externas pesadas ou instáveis que dependam de CDNs sem fallback no navegador.

- Garantir que a comunicação assíncrona com o back-end (Node.js/MySQL) trate erros de conexão para não quebrar a experiência de jogo do usuário.

- O bot utiliza avaliação material combinada com aleatoriedade controlada para garantir dinamismo e evitar loops travados; manter essa estrutura leve para rodar de forma fluida no front-end.

- Este projeto tem fins acadêmicos (curso de Análise e Desenvolvimento de Sistemas). Não implemente padrões arquiteturais de nível sênior, complexidade desnecessária ou bibliotecas externas não solicitadas. 

- *Comentários de Código:* O agente deve incluir comentários curtos e explicativos acima de funções assíncronas (async/await, fetch) e lógicas de banco de dados, para facilitar a compreensão didática do código.

- *Tratamento de Erros:* Sempre inclua blocos try/catch ou tratamento .catch() em requisições e operações de banco de dados, retornando mensagens de erro claras via console.log para facilitar o debug.

- Os arquivos listados no .gitignore não devem ser modificados pelo agente.

- O agente nunca deve realizar alterações estruturais no banco de dados, como criar ou excluir tabelas de forma autônoma sem solicitação explícita.

## Regra geral: 

Antes de implementar uma alteração, siga as tecnologias, arquitetura, convenções e restrições descritas neste documento. Caso alguma informação esteja ausente, analise o código existente e siga os padrões já adotados no projeto.

 A cada alteração realizada por você, gere um relatório simples no próprio prompt contendo: 
1) Qual necessidade foi tratada.
2) Quais arquivos foram alterados/adicionados.
3) O que exatamente foi feito no código.
4) O funcionamento esperado da funcionalidade.
