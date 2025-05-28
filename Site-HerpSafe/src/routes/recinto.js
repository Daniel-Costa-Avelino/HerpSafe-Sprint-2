var express = require("express");
var router = express.Router();

var recintoController = require("../controllers/recintoController");

router.post("/buscarRecintosPorPrateleira", function (req, res) {
  recintoController.buscarRecintosPorPrateleira(req, res);
});

router.post("/cadastrar", function (req, res) {
  recintoController.cadastrar(req, res);
});

module.exports = router;