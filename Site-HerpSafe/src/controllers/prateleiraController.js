var prateleiraModel = require("../models/prateleiraModel");

function buscarPrateleirasPorEmpresa(req, res) {
  var fkEmpresa = req.body.fkEmpresaServer;

  prateleiraModel
    .buscarPrateleirasPorEmpresa(fkEmpresa)
    .then((resultado) => {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
        console.log(resultado);
      } else {
        res.status(204).json([]);
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar as prateleiras: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function buscarCapturasPorPrateleira_Empresa(req, res) {
  var fkEmpresa = req.body.fkEmpresaServer;

  prateleiraModel
    .buscarCapturasPorPrateleira_Empresa(fkEmpresa)
    .then((resultado) => {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
        console.log(resultado);
      } else {
        res.status(204).json([]);
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar as prateleiras: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function realizarUpdateTabelaCaptura(req, res) {
  var status = req.body.statusServer;
  var idCaptura = req.body.idCapturaServer;
  var mensagem = req.body.mensagemServer;

  prateleiraModel
    .realizarUpdateTabelaCaptura(status, idCaptura, mensagem)
    .then((resultado) => {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
        console.log(resultado);
      } else {
        res.status(204).json([]);
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar as prateleiras: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function cadastrar(req, res) {
  var idPrateleira = req.body.idPrateleira;
  var nome_prateleira = req.body.nome_cadastro;
  var fkEmpresa = req.body.id_empresa;

  if (idPrateleira == undefined) {
    res.status(400).send("Campo idPrateleira está indefinido!");
  } else if (nome_prateleira == undefined) {
    res.status(400).send("Campo nome_prateleira está indefinido!");
  } else if (fkEmpresa == undefined) {
    res.status(400).send("Campo fkEmpresa está indefinido");
  } else {
    prateleiraModel
      .cadastrar(idPrateleira, nome_prateleira, fkEmpresa)
      .then((resultado) => {
        res.status(201).json(resultado);
      })
      .catch((erro) => {
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
  buscarPrateleirasPorEmpresa,
  buscarCapturasPorPrateleira_Empresa,
  realizarUpdateTabelaCaptura
};
