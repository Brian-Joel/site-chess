var quizModel = require("../models/quizModel");

function registrar(req, res) {
    var idUsuario = req.body.idUsuarioServer;
    var qtdA = req.body.qtdAServer;
    var qtdB = req.body.qtdBServer;
    var qtdC = req.body.qtdCServer;
    var qtdD = req.body.qtdDServer;

    if (idUsuario == undefined) {
        res.status(400).send("Seu idUsuario está undefined!");
    } else if (qtdA == undefined) {
        res.status(400).send("Sua qtdA está undefined!");
    } else if (qtdB == undefined) {
        res.status(400).send("Sua qtdB está undefined!");
    } else if (qtdC == undefined) {
        res.status(400).send("Sua qtdC está undefined!");
    } else if (qtdD == undefined) {
        res.status(400).send("Sua qtdD está undefined!");
    } else {

        quizModel.registrar(idUsuario, qtdA, qtdB, qtdC, qtdD)
            .then(
                function (resultado) {
                    res.status(201).json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao registrar o quiz! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function historico(req, res) {
    var idUsuario = req.params.idUsuario;

    if (idUsuario == undefined) {
        res.status(400).send("Seu idUsuario está undefined!");
    } else {

        quizModel.historico(idUsuario)
            .then(
                function (resultado) {
                    res.status(200).json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao buscar o histórico! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}


function geral(req, res) {
    quizModel.geral()
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    registrar,
    historico,
    geral
}