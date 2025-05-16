var recintoModel = require("../models/recintoModel");

// function buscarRecintoPorEmpresa(req, res) {
//   var idUsuario = req.params.idUsuario;

//   recintoModel.buscarRecintoPorEmpresa(idUsuario).then((resultado) => {
//     if (resultado.length > 0) {
//       res.status(200).json(resultado);
//     } else {
//       res.status(204).json([]);
//     }
//   }).catch(function (erro) {
//     console.log(erro);
//     console.log("Houve um erro ao buscar os aquarios: ", erro.sqlMessage);
//     res.status(500).json(erro.sqlMessage);
//   });
// }


function cadastrar(req, res) {
  var nome_recinto = req.body.input_nomeCadastro;
  var dt_Instalacao = req.body.input_dataCadastro;

  if (nome_recinto == undefined) {
    res.status(400).send("nome_recinto está undefined!");
  } else if (dt_Instalacao == undefined) {
    res.status(400).send("dt_Instalacao está undefined!");
  } else {

    recintoModel.cadastrar(nome_recinto, dt_Instalacao)
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
  cadastrar
}