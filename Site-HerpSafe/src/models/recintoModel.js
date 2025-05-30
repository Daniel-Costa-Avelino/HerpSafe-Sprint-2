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
  pegarCapturasUmidade
}
