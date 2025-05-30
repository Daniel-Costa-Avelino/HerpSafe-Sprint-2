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

function pegarTotalSensores(id_recinto) {
  const  instrucaoSql = `SELECT COUNT(fk_sensor1) + COUNT(fk_sensor2) AS 'Total' FROM recinto WHERE idrecinto = ${id_recinto};`

  return database.executar(instrucaoSql);
}

function pegarMaximoTemperatura(fk_sensor1, fk_sensor2) {
  const instrucaoSql = `SELECT MAX(temperatura) AS 'temperatura' FROM captura WHERE fksensor IN (${fk_sensor1}, ${fk_sensor2});`;

  return database.executar(instrucaoSql);
}


function pegarMaximoUmidade(fk_sensor1, fk_sensor2) {
  const instrucaoSql = `SELECT MAX(umidade) AS 'umidade' FROM captura WHERE fksensor IN (${fk_sensor1}, ${fk_sensor2});`;

  return database.executar(instrucaoSql);
}

function alertas(idRecinto, numeroSensor){

  const intrucaoSql =
    `SELECT alerta FROM captura
    where idCaptura = ${id_caaptura} AND fksensor = ${fk_sensor}
    AND DATE (dt_Hr_Captura) = CURDATE()`;

}

// function filtro(){

//   const instrucaoSql = 
//     `SELECT DATE(dt_Hr_Captura) AS 'Dia' FROM captura;`

// }



module.exports = {
  buscarRecintosPorPrateleira,
  cadastrar, 
  pegarCapturasTemperatura,
  pegarCapturasUmidade,
  pegarTotalSensores,
  pegarMaximoTemperatura,
  pegarMaximoUmidade
}
