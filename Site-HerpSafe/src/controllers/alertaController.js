var alertaModel = require("../models/alertaModel");

function buscarAlertas(req, res) {
  var idEmpresa = req.body.fkEmpresaServer;

  alertaModel
    .buscarAlertas(idEmpresa)
    .then((resultado) => {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).json([]);
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar os recintos: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function filtrarAlertas(req, res) {
  const nome_recinto = req.body.nomeRecinto;
  const dataAlerta = req.body.data;
  const tipoAlerta = req.body.tipo_alerta;

  if (
    nome_recinto == undefined ||
    dataAlerta == undefined ||
    tipoAlerta == undefined
  ) {
    res.status(500).send("Erro: alguns de seus componentes estão indefinidos!");
  } else {
    alertaModel
      .filtrarAlertas(nome_recinto, data, tipoAlerta)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((erro) => {
        console.log("Erro: não foi possível filtrar os alertas", erro);
      });
  }
}

module.exports = {
  buscarAlertas,
  filtrarAlertas,
};
