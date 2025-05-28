var express = require("express");
var router = express.Router();

var alertaController = require("../controllers/alertaController");

router.post("/buscarAlertas", function (req, res) {
    alertaController.buscarAlertas(req, res);
});

module.exports = router;