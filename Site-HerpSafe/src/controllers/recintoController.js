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

function pegarCapturasTemperatura(req, res) {
  const idRecinto = req.body.idRecinto;
  const numeroSensor = req.body.fk_sensor;

  if(idRecinto == undefined || numeroSensor == undefined) {
    res.status(500).send("Alguns dos seus componentes estão como indefinidos!");
  } 
  else {
    recintoModel.pegarCapturasTemperatura(idRecinto, numeroSensor)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      console.log("Não foi possível pegar as capturadas de temperatura", error);
    }) 
  }
}

function pegarCapturasUmidade(req, res){

  const idRecinto = req.body.idRecinto;
  const numeroSensor = req.body.fk_sensor;

  if (idRecinto == undefined || numeroSensor == undefined){
    res.status(500).send(`Alguns dos seus componentes estão como indefinidos!`);
  }
  else{

    recintoModel.pegarCapturasUmidade(idRecinto, numeroSensor)
    .then((result) => {

      res.status(200).json(result);

    })

    .catch((error) => {

      console.log(`Não foi possível pegar as capturas de umidade`, error);

    })

  }

}

function pegarTotalSensores(req, res) {
  idRecinto = req.body.idRecinto;

  if(idRecinto == undefined) {
    res.status(500).send("O ID do seu recinto está indefinido!");
  }
  else {
    recintoModel.pegarTotalSensores(idRecinto)
    .then((result) => {
      res.status(200).json(result);
    })
  }
}

function pegarMaximoTemperatura(req, res) {
  const fkSensor1 = req.body.fk_sensor1;
  const fkSensor2 = req.body.fk_sensor2;

  if(fkSensor1 == undefined || fkSensor2 == undefined) {
    res.status(500).send("Sensores estão como indefinidos!");
  }
  else {
    recintoModel.pegarMaximoTemperatura(fkSensor1, fkSensor2)
    .then((result) => {
      res.status(200).json(result);
    })
  }

}

function pegarMaximoUmidade(req, res) {
  const fkSensor1 = req.body.fk_sensor1;
  const fkSensor2 = req.body.fk_sensor2;

  if(fkSensor1 == undefined || fkSensor2 == undefined) {
    res.status(500).send("Sensores estão como indefinidos!");
  }
  else {
    recintoModel.pegarMaximoUmidade(fkSensor1, fkSensor2)
    .then((result) => {
      res.status(200).json(result);
    })
  }

}

function pegarTotalSensores(req, res) {
  idRecinto = req.body.idRecinto;

  if(idRecinto == undefined) {
    res.status(500).send("O ID do seu recinto está indefinido!");
  }
  else {
    recintoModel.pegarTotalSensores(idRecinto)
    .then((result) => {
      res.status(200).json(result);
    })
  }
}

function pegarMaximoTemperatura(req, res) {
  const fkSensor1 = req.body.fk_sensor1;
  const fkSensor2 = req.body.fk_sensor2;

  if(fkSensor1 == undefined || fkSensor2 == undefined) {
    res.status(500).send("Sensores estão como indefinidos!");
  }
  else {
    recintoModel.pegarMaximoTemperatura(fkSensor1, fkSensor2)
    .then((result) => {
      res.status(200).json(result);
    })
  }

}

function pegarMaximoUmidade(req, res) {
  const fkSensor1 = req.body.fk_sensor1;
  const fkSensor2 = req.body.fk_sensor2;

  if(fkSensor1 == undefined || fkSensor2 == undefined) {
    res.status(500).send("Sensores estão como indefinidos!");
  }
  else {
    recintoModel.pegarMaximoUmidade(fkSensor1, fkSensor2)
    .then((result) => {
      res.status(200).json(result);
    })
  }

}

function alertas(req,res){
  const idRecinto = req.body.idRecinto;
  const numeroSensor = req.body.fk_sensor;

  if (idRecinto == undefined || numeroSensor == undefined) {
    res.status(500).send(`Alguns dos seus componentes estão como indefinidos!`);
  } else {
    alertasModel.pegarAlertasUltimas24h(idRecinto, numeroSensor)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        console.log(`Não foi possível pegar os alertas das últimas 24h`, error);
        res.status(500).send("Erro ao buscar alertas");
      });
  }
  
}

// function filtro (req, res){



// }

module.exports = {
  cadastrar,
  buscarRecintosPorPrateleira,
  pegarCapturasTemperatura,
  pegarCapturasUmidade,
  pegarTotalSensores,
  pegarMaximoTemperatura,
  pegarMaximoUmidade
}