var express = require("express");
var router = express.Router();

var quizController = require("../controllers/quizController");

router.post("/registrar", function (req, res) {
    quizController.registrar(req, res);
});

router.get("/usuario/:idUsuario", function (req, res) {
    quizController.historico(req, res);
});

router.get("/geral", function (req, res) {
    quizController.geral(req, res);
});

module.exports = router;