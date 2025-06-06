var express = require("express");
var router = express.Router();

var recintoController = require("../controllers/recintoController");

router.post("/buscarRecintosPorPrateleira", function (req, res) {
  recintoController.buscarRecintosPorPrateleira(req, res);
});

router.post("/buscarRecintosPorPrateleira_captura", function (req, res) {
  recintoController.buscarRecintosPorPrateleira_captura(req, res);
});

router.post("/cadastrar", function (req, res) {
  recintoController.cadastrar(req, res);
});

router.post("/pegarCapturasTemperatura", function (req, res) {
  recintoController.pegarCapturasTemperatura(req, res);
});

router.post("/pegarCapturasUmidade", function (req, res) {
  recintoController.pegarCapturasUmidade(req, res);
});

router.post("/pegarTotalSensores", function (req, res) {
  recintoController.pegarTotalSensores(req, res);
});

router.post("/pegarMaximoTemperatura", function (req, res) {
  recintoController.pegarMaximoTemperatura(req, res);
});

router.post("/pegarMaximoUmidade", function (req, res) {
  recintoController.pegarMaximoUmidade(req, res);
});

router.post("/pegarMetricasTemperatura", function (req, res) {
  recintoController.pegarMetricasTemperatura(req, res);
});

router.post("/pegarMetricasUmidade", function (req, res) {
  recintoController.pegarMetricasUmidade(req, res);
});

router.post("/atualizarStatusCaptura", function (req, res) {
  recintoController.atualizarStatusCaptura(req, res);
});

router.post("/realizarUpdateTabelaCaptura", function (req, res) {
  recintoController.realizarUpdateTabelaCaptura(req, res);
});

router.post("/filtro", function (req, res) {
  recintoController.filtro(req, res);
});

router.post("/alertas", function (req, res) {
  recintoController.alertas(req, res);
});

router.post("/abrirHistorico", function (req, res) {
  recintoController.abrirHistorico(req, res);
});

module.exports = router;
