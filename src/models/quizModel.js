var database = require('../database/config');

function registrar(usuario, opcaoA, opcaoB, opcaoC, opcaoD) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function registrar(): ", usuario, opcaoA, opcaoB, opcaoC, opcaoD)
    var instrucaoSql = `INSERT INTO quiz_personalidade (fk_usuario, qtd_perfil_a, qtd_perfil_b, qtd_perfil_c, qtd_perfil_d)
VALUES ('${usuario}', '${opcaoA}', '${opcaoB}', '${opcaoC}', '${opcaoD}');`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



function historico(usuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function historico(): ", usuario)
    var instrucaoSql = `
        SELECT * FROM vw_historico
        WHERE fk_usuario = ${usuario}
        ORDER BY id ASC;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function geral() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function geral()")
    var instrucaoSql = `SELECT * FROM vw_panorama_comunidade;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    registrar,
    historico,
    geral
}