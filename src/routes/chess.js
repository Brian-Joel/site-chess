var express = require("express");
var router = express.Router();

var chessController = require('../controllers/chessController');

router.get("/trilhas", function (req, res) {
    chessController.listarTrilhas(req, res);
});

router.get("/trilhas/:idTrilha/puzzles", function (req, res) {
    chessController.listarPuzzles(req, res);
});


module.exports = router;