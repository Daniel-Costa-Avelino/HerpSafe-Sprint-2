var express = require("express");
var router = express.Router();

var prateleiraController = require("../controllers/prateleiraController");

router.post("/buscarPrateleirasPorEmpresa", function (req, res) {
  prateleiraController.buscarPrateleirasPorEmpresa(req, res);
});

router.post("/realizarUpdateTabelaCaptura", function (req, res) {
  prateleiraController.realizarUpdateTabelaCaptura(req, res);
});

router.post("/buscarCapturasPorPrateleira_Empresa", function (req, res) {
  prateleiraController.buscarCapturasPorPrateleira_Empresa(req, res);
});

router.post("/cadastrar", function (req, res) {
  prateleiraController.cadastrar(req, res);
});

module.exports = router;
