const database = require("../database/config");

function buscarRecintosPorPrateleira(idPrateleira) {
  const instrucaoSql = `SELECT * FROM recinto WHERE fkPrateleira = ${idPrateleira}`;

  return database.executar(instrucaoSql);
}

function cadastrar(
  nome_recinto,
  fkPrateleira,
  nomeEspecie,
  temperatura,
  umidade
) {
  const instrucaoSql = `
  
  INSERT INTO recinto (nome_recinto, fkPrateleira) VALUES ('${nome_recinto}', ${fkPrateleira});

  INSERT INTO especie (fkIdRecinto, nome, fkMetricasTemperatura, fkMetricasUmidade) 
  VALUES (LAST_INSERT_ID(), '${nomeEspecie}', ${temperatura}, ${umidade});
  `;
  return database.executar(instrucaoSql);
}

function pegarCapturasTemperatura(id_recinto, numeroSensor) {
  const instrucaoSql = `SELECT temperatura FROM recinto 
  JOIN sensor ON recinto.fk_sensor${numeroSensor} = sensor.idSensor 
	JOIN captura ON captura.fksensor = sensor.idSensor WHERE idrecinto = ${id_recinto};`;

  return database.executar(instrucaoSql);
}

function pegarCapturasUmidade(id_recinto, numeroSensor) {
  const instrucaoSql = `SELECT umidade FROM recinto
      JOIN sensor ON recinto.fk_sensor${numeroSensor} = sensor.idSensor
      JOIN captura ON captura.fksensor = sensor.idSensor WHERE idrecinto = ${id_recinto};`;

  return database.executar(instrucaoSql);
}

function pegarTotalSensores(id_recinto) {
  const instrucaoSql = `SELECT COUNT(fk_sensor1) + COUNT(fk_sensor2) AS 'Total' FROM recinto WHERE idrecinto = ${id_recinto};`;

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

function alertas(id_captura, fk_sensor) {
  const instrucaoSql = `SELECT alerta FROM captura
    where idCaptura = ${id_captura} AND fksensor = ${fk_sensor}
    AND DATE (dt_Hr_Captura) = CURDATE()`;

  return database.executar(instrucaoSql);
}

function filtro(data_inicio, data_fim, fksensor1, fksensor2) {
  const instrucaoSql = `select temperatura, umidade, date(dt_Hr_Captura) as "Data" FROM captura
	where date(dt_Hr_Captura) between "${data_inicio}" and "${data_fim}" and fksensor = ${fksensor1} or fksensor = ${fksensor2};`;

  return database.executar(instrucaoSql);
}

module.exports = {
  buscarRecintosPorPrateleira,
  cadastrar,
  pegarCapturasTemperatura,
  pegarCapturasUmidade,
  pegarTotalSensores,
  pegarMaximoTemperatura,
  pegarMaximoUmidade,
  alertas,
  filtro,
};
