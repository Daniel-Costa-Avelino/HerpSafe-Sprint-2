var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
  usuarioController.cadastrar(req, res);
});

// Mesma coisa so que com o login
router.post("/autenticar", function (req, res) {
  usuarioController.autenticar(req, res);
});

// router.post("/buscarPorCodigo", function (req, res) {
//     usuarioController.autenticar(req, res);
// });

module.exports = router;
