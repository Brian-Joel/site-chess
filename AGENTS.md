# AGENTS.md

## Visão geral

- **Objetivo da aplicação:** Desenvolver a plataforma web **Xeque-mate**, onde o usuário passa por uma tela de login/cadastro antes de acessar o ecossistema principal. O sistema tem como propósito democratizar o ensino do xadrez, conectando teoria e prática de forma visual e interativa através de conteúdo teórico sobre as regras básicas e cultura do jogo, quizzes interativos e um dashboard de estatísticas com gráficos (Chart.js) para acompanhamento da evolução.

- **Problema que resolve:** Facilita o aprendizado inicial de xadrez e estimula o raciocínio lógico, oferecendo um ambiente leve e acessível para estudar as regras, testar conhecimentos em quizzes e visualizar o progresso individual ao longo do tempo.

- **Principais usuários:** Iniciantes, estudantes e entusiastas de xadrez que desejam aprender as regras básicas, conhecer a cultura do esporte, praticar com quizzes e acompanhar suas estatísticas de desempenho.


## Tecnologias

- **Linguagens:** HTML5, CSS3, JavaScript (Vanilla), Node.js, MySQL.

- **Estilização:** CSS3 (Flexbox e CSS Grid para organização visual das telas de login, conteúdo teórico, quizzes e dashboards responsivos).

- **Banco de Dados:** MySQL (para armazenamento relacional de cadastros de usuários e estatísticas dos quizzes).

- **Ferramentas e Bibliotecas:** VS Code, Git / GitHub, API Chart.js e web-data-viz.


## Comandos

- Para executar o front-end localmente:
  - Abra o VS Code na pasta do projeto.
  - Utilize o arquivo `login.html` como ponto de início no navegador.
- Para o back-end e banco de dados:
  - Execute o script SQL localizado na pasta `database/` no MySQL Workbench para criar a base de dados e as tabelas.
  - Inicie o servidor Node.js na pasta de back-end.
  - Usar `npm i` apenas uma vez para instalar as dependências.
  - Usar `npm start` para executar o servidor/ambiente do projeto.


## Arquitetura e Fluxo de Navegação

O projeto está organizado na seguinte estrutura de pastas e segue o fluxo onde a área de teoria, os quizzes e o dashboard só são acessados após a validação do login:

Novos arquivos criados pelo agente devem seguir rigorosamente esta estrutura de 5 passos:
- *Passo 1 (/public)*: Arquivos HTML (ex: `cadastro.html`, `login.html`, `quiz.html`, `dashboard.html`), CSS e JS necessários para que o front-end funcione. Tudo que o usuário vai ver e interagir.
- *Passo 2 (/src/routes)*: Rotas e caminhos por onde os dados de usuários e estatísticas serão enviados.
- *Passo 3 (/src/controllers)*: Validações e regras de negócio pelas quais o dado precisa passar antes de montar a query.
- *Passo 4 (/src/models)*: Criação de toda query (`INSERT`, `SELECT`, etc.) que será efetuada no banco de dados.
- *Passo 5 (/src/database/config.js)*: Configuração e credenciais de banco de dados para efetuar a query montada.


## Padrões de desenvolvimento

- Utilizar `const` por padrão e `let` apenas quando houver necessidade de reatribuição.

- Padrão de nomenclatura limpo e descritivo para arquivos, funções e variáveis (em português/camelCase).

- Manter funções modulares (separando a lógica de autenticação, a lógica do quiz, a renderização dos gráficos e a manipulação de DOM).

- Quando implementar o código para o GitHub, utilizar as nomenclaturas de commit semântico: `feat`, `fix`, `docs`, etc.


## Cuidados e restrições

- Garantir que o acesso às páginas protegidas (conteúdo teórico, quiz, dashboard/estatísticas, sobre) valide se o usuário está devidamente logado, redirecionando para o `login.html` caso contrário.

- Evitar dependências externas pesadas ou bibliotecas de tabuleiro não previstas no escopo atual, mantendo o projeto puramente nas tecnologias definidas (`HTML`, `CSS`, `JavaScript`, `Node.js`, `MySQL` e `Chart.js`).

- Garantir que a comunicação assíncrona com o back-end (Node.js/MySQL) trate erros de conexão para não interromper a experiência do usuário durante os quizzes ou visualização de gráficos.

- Este projeto tem fins acadêmicos (curso de Análise e Desenvolvimento de Sistemas). Não implemente padrões arquiteturais de nível sênior, complexidade desnecessária ou bibliotecas externas não solicitadas.

- *Comentários de Código:* O agente deve incluir comentários curtos e explicativos acima de funções assíncronas (`async/await`, `fetch`) e lógicas de banco de dados, para facilitar a compreensão didática do código.

- *Tratamento de Erros:* Sempre inclua blocos `try/catch` ou tratamento `.catch()` em requisições e operações de banco de dados, retornando mensagens de erro claras via `console.log` para facilitar o debug.

- Os arquivos listados no `.gitignore` não devem ser modificados pelo agente.

- O agente nunca deve realizar alterações estruturais no banco de dados, como criar ou excluir tabelas de forma autônoma sem solicitação explícita.


## Regra geral

Antes de implementar uma alteração, siga as tecnologias, arquitetura, convenções e restrições descritas neste documento. Caso alguma informação esteja ausente, analise o código existente e siga os padrões já adotados no projeto.

A cada alteração realizada por você, gere um relatório simples no próprio prompt contendo:
1) Qual necessidade foi tratada.
2) Quais arquivos foram alterados/adicionados.
3) O que exatamente foi feito no código.
4) O funcionamento esperado da funcionalidade.
