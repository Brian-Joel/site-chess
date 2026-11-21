var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.get("/listar", function (req, res) {
    usuarioController.listar(req, res);
});

router.get('/:id/buscar', function (req, res) {
    usuarioController.buscar(req, res);
})

router.post('/:id/nome', function (req, res) {
    usuarioController.atualizarNome(req, res);
})

router.post('/:id/email', function (req, res) {
    usuarioController.atualizarEmail(req, res);
})

router.post('/:id/senha', function (req, res) {
    usuarioController.atualizarSenha(req, res);
})

router.post('/:id/foto', function (req, res) {
    usuarioController.atualizarFoto(req, res);
})

router.delete('/:id', function (req, res) {
    usuarioController.excluir(req, res);
})


module.exports = router;