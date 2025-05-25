var express = require("express");
var router = express.Router();

var prateleiraController = require("../controllers/prateleiraController");

router.post("/buscarPrateleirasPorEmpresa", function (req, res) {
    prateleiraController.buscarPrateleirasPorEmpresa(req, res);
});

router.post("/cadastrar", function (req, res) {
    prateleiraController.cadastrar(req, res);
});

module.exports = router;