var express = require("express");
var router = express.Router();

var indicadorController = require("../controllers/indicadorController");

router.post("/buscarRecintosMonitorados", function (req, res) {
    indicadorController.buscarRecintosMonitorados(req, res);
});

router.post("/buscarSensoresAtivos", function (req, res) {
    indicadorController.buscarSensoresAtivos(req, res);
});

router.post("/buscarAlertas", function (req, res) {
    indicadorController.buscarAlertas(req, res);
});

module.exports = router;