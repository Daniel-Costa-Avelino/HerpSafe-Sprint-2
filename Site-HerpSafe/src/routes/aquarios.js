var express = require("express");
var router = express.Router();

var empresaController = require("../controllers/empresaController");

router.get("/:empresaId", function (req, res) {
  aquarioController.buscarRecintosPorEmpresa(req, res);
});

router.post("/cadastrar", function (req, res) {
  recintoController.cadastrar(req, res);
});

module.exports = router;