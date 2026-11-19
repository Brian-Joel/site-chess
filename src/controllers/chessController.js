var chessModel = require('../models/chessModel');


function listarTrilhas(req, res) {
    chessModel.listarTrilhas().then(function (resultado) {

        if (resultado.length > 0) {
            res.status(200).json(resultado);

        } else {
            res.status(204).send('Nenhum resultado encontrado!');
        }

    }).catch(function (erro) {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    })
}


function listarPuzzles(req, res) {
    var idTrilha = req.params.idTrilha;

    chessModel.listarPuzzles(idTrilha).then(function (resultado) {

        if (resultado.length > 0) {
            res.status(200).json(resultado);

        } else {
            res.status(204).send('Nenhum resultado encontrado!');
        }

    }).catch(function (erro) {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    });
}



module.exports = {
    listarTrilhas,
    listarPuzzles
};