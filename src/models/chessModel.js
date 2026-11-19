var database = require('../database/config');

function listarTrilhas() {

    var instrucaoSql = `
        SELECT *
        FROM trilhas
        ORDER BY ordem;
    `;

    console.log('Executando a instrução SQL: \n' + instrucaoSql);
    return database.executar(instrucaoSql);
}


function listarPuzzles(idTrilha) {
    var instrucaoSql = `SELECT * FROM puzzles WHERE trilha_id = ${idTrilha} ORDER BY ordem`;
    console.log('Executando a instrução SQL: \n' + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listarTrilhas,
    listarPuzzles
};

