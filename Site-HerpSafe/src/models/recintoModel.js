const database = require("../database/config");

function buscarRecintosPorPrateleira(idPrateleira) {
  const instrucaoSql = `SELECT * FROM recinto WHERE fkPrateleira = ${idPrateleira}`;

  return database.executar(instrucaoSql);
}

function cadastrar(nome_recinto, fk_sensor, fk_sensor2, fkPrateleira) {
  
  const instrucaoSql = `INSERT INTO recinto (nome_recinto, fk_sensor1, fk_sensor2, fkPrateleira)  VALUES ('${nome_recinto}', ${fk_sensor}, ${fk_sensor2}, ${fkPrateleira})`;
  return database.executar(instrucaoSql);
}


function pegarCapturasTemperatura(id_recinto, numeroSensor) {
  const instrucaoSql = 
  `SELECT temperatura FROM recinto 
  JOIN sensor ON recinto.fk_sensor${numeroSensor} = sensor.idSensor 
	JOIN captura ON captura.fksensor = sensor.idSensor WHERE idrecinto = ${id_recinto};`

  return database.executar(instrucaoSql);
}

function pegarCapturasUmidade(id_recinto, numeroSensor){

  const instrucaoSql = 
   `SELECT umidade FROM recinto
      JOIN sensor ON recinto.fk_sensor${numeroSensor} = sensor.idSensor
      JOIN captura ON captura.fksensor = sensor.idSensor WHERE idrecinto = ${id_recinto};`

      return database.executar(instrucaoSql);

}

module.exports = {
  buscarRecintosPorPrateleira,
  cadastrar, 
  pegarCapturasTemperatura,
  pegarCapturasUmidade
}
