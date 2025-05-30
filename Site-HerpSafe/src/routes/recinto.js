var express = require("express");
var router = express.Router();

var recintoController = require("../controllers/recintoController");

router.post("/buscarRecintosPorPrateleira", function (req, res) {
  recintoController.buscarRecintosPorPrateleira(req, res);
});

router.post("/cadastrar", function (req, res) {
  recintoController.cadastrar(req, res);
});

router.post("/pegarCapturasTemperatura", function(req, res) {
  recintoController.pegarCapturasTemperatura(req, res);
})

router.post("/pegarCapturasUmidade", function(req, res) {
  recintoController.pegarCapturasUmidade(req, res);
})


// router.post("/filtro", function(req, res){

//   recintoController.filtro(req, res);

// })

router.post("ultimas24", function(req, res){

  recintoController.ultimas24(req, res);

})

module.exports = router;
