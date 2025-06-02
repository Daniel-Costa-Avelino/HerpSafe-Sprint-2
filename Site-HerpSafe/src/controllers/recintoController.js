var recintoModel = require("../models/recintoModel");

function buscarRecintosPorPrateleira(req, res) {
  var idPrateleira = req.body.fkPrateleiraServer;

  recintoModel
    .buscarRecintosPorPrateleira(idPrateleira)
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

function cadastrar(req, res) {
  const nomeRecinto = req.body.nomeRecinto;
  const fkPrateleira = req.body.fkPrateleira;

  const nomeEspecie = req.body.especie;
  const fkMetricaTemperatura = req.body.metricaTemperatura;
  const fkMetricaUmidade = req.body.metricaUmidade;

  if (nomeRecinto == undefined) {
    res.status(400).send("nome_recinto está undefined!");
  } else if (fkPrateleira == undefined) {
    res.status(400).send("fkPrateleira está undefined");
  } else if (fkMetricaTemperatura == undefined) {
    res.status(400).send("Métrica de Temperatura está undefined");
  } else if (fkMetricaUmidade == undefined) {
    res.status(400).send("Métrica de Umidade está undefined");
  } else if (nomeEspecie == undefined) {
    res.status(400).send("Nome da Espécie está undefined");
  } else {
    recintoModel
      .cadastrar(
        nomeRecinto,
        fkPrateleira,
        nomeEspecie,
        fkMetricaTemperatura,
        fkMetricaUmidade
      )
      .then((resultado) => {
        res.status(200).json(resultado);
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

function pegarCapturasTemperatura(req, res) {
  const idRecinto = req.body.idRecinto;

  if (idRecinto == undefined) {
    res.status(500).send("Alguns dos seus componentes estão como indefinidos!");
  } else {
    recintoModel
      .pegarCapturasTemperatura(idRecinto)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        console.log(
          "Não foi possível pegar as capturadas de temperatura",
          error
        );
      });
  }
}

function pegarCapturasUmidade(req, res) {
  const idRecinto = req.body.idRecinto;

  if (idRecinto == undefined) {
    res.status(500).send(`Alguns dos seus componentes estão como indefinidos!`);
  } else {
    recintoModel
      .pegarCapturasUmidade(idRecinto)
      .then((result) => {
        res.status(200).json(result);
      })

      .catch((error) => {
        console.log(`Não foi possível pegar as capturas de umidade`, error);
      });
  }
}

function pegarTotalSensores(req, res) {
  idRecinto = req.body.idRecinto;

  if (idRecinto == undefined) {
    res.status(500).send("O ID do seu recinto está indefinido!");
  } else {
    recintoModel.pegarTotalSensores(idRecinto).then((result) => {
      res.status(200).json(result);
    });
  }
}

function pegarMaximoTemperatura(req, res) {
  const idRecinto = req.body.idRecinto;

  if (idRecinto == undefined) {
    res.status(500).send("Recinto esta como indefinido!");
  } else {
    recintoModel.pegarMaximoTemperatura(idRecinto).then((result) => {
      res.status(200).json(result);
    });
  }
}

function pegarMaximoUmidade(req, res) {
  const fkSensor1 = req.body.fk_sensor1;
  const fkSensor2 = req.body.fk_sensor2;

  if (fkSensor1 == undefined || fkSensor2 == undefined) {
    res.status(500).send("Sensores estão como indefinidos!");
  } else {
    recintoModel.pegarMaximoUmidade(fkSensor1, fkSensor2).then((result) => {
      res.status(200).json(result);
    });
  }
}

function pegarTotalSensores(req, res) {
  idRecinto = req.body.idRecinto;

  if (idRecinto == undefined) {
    res.status(500).send("O ID do seu recinto está indefinido!");
  } else {
    recintoModel.pegarTotalSensores(idRecinto).then((result) => {
      res.status(200).json(result);
    });
  }
}

function pegarMaximoTemperatura(req, res) {
  const idRecinto = req.body.idRecinto;

  if (idRecinto == undefined) {
    res.status(500).send("Recinto esta como indefinido!");
  } else {
    recintoModel.pegarMaximoTemperatura(idRecinto).then((result) => {
      res.status(200).json(result);
    });
  }
}

function pegarMaximoUmidade(req, res) {
  const idRecinto = req.body.idRecinto;

  if (idRecinto == undefined) {
    res.status(500).send("Recinto esta como indefinido!");
  } else {
    recintoModel.pegarMaximoUmidade(idRecinto).then((result) => {
      res.status(200).json(result);
    });
  }
}

function alertas(req, res) {
  const idRecinto = req.body.idRecinto;

  if (idRecinto == undefined) {
    res.status(500).send(`Alguns dos seus componentes estão como indefinidos!`);
  } else {
    recintoModel
      .alertas(idRecinto)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        console.log(`Não foi possível pegar os alertas das últimas 24h`, error);
        res.status(500).send("Erro ao buscar alertas");
      });
  }
}

function filtro(req, res) {
  const dataInicio = req.body.data_inicio;
  const dataFim = req.body.data_fim;
  const fk_sensor1 = req.body.fkSensor1;
  const fk_sensor2 = req.body.fkSensor2;

  if (
    dataInicio == undefined ||
    dataFim == undefined ||
    fk_sensor1 == undefined ||
    fk_sensor2 == undefined
  ) {
    res.status(500).send("Algum valor está indefinido!");
  } else {
    recintoModel
      .filtro(dataInicio, dataFim, fk_sensor1, fk_sensor2)
      .then((result) => {
        res.status(200).json(result);
      });
  }
}

module.exports = {
  cadastrar,
  buscarRecintosPorPrateleira,
  pegarCapturasTemperatura,
  pegarCapturasUmidade,
  pegarMaximoUmidade,
  pegarMaximoTemperatura,
  filtro,
  pegarTotalSensores,
  alertas,
};
