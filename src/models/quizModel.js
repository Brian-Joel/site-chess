var database = require("../database/config");

function listar() {
    var instrucaoSQL = `SELECT * FROM vw_quiz_estilo`;
    console.log("Executando a instrução SQL: \n" + instrucaoSQL);
    return database.executar(instrucaoSQL)
}

module.exports = {
    listar
};