var recintoModel = require("../models/recintoModel");

function buscarRecintosPorPrateleira(req, res) {
  var idPrateleira = req.body.fkPrateleiraServer;

  recintoModel.buscarRecintosPorPrateleira(idPrateleira).then((resultado) => {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).json([]);
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar os recintos: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}


function cadastrar(req, res) {
  var nome_recinto = req.body.nome_cadastro;
  var n1Cadastro = req.body.n1Cadastro;
  var n2Cadastro = req.body.n2Cadastro;
  var fkPrateleira = req.body.fkPrateleira

  if (nome_recinto == undefined) {
    res.status(400).send("nome_recinto está undefined!");
  } else if (n1Cadastro == undefined) {
    res.status(400).send("n1Cadastro está undefined!");
  }
  else if (n2Cadastro == undefined) {
    res.status(400).send("n2Cadastro está undefined!");
  }
  else if (fkPrateleira == undefined) {
    res.status(400).send("fkPrateleira está undefined");
  }
  else {
    recintoModel.cadastrar(nome_recinto, n1Cadastro, n2Cadastro, fkPrateleira)
      .then((resultado) => {
        res.status(201).json(resultado);
      }
      ).catch((erro) => {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o cadastro! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

module.exports = {
  cadastrar,
  buscarRecintosPorPrateleira
}