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

function pegarCapturasTemperatura(id_recinto) {
  const instrucaoSql = `
    SELECT temperatura FROM captura 
  JOIN sensor ON fkSensor = idSensor WHERE fkRecinto = ${id_recinto};
  `;

  return database.executar(instrucaoSql);
}

function pegarCapturasUmidade(id_recinto) {
  const instrucaoSql = `
    SELECT umidade FROM captura 
    JOIN sensor ON fkSensor = idSensor WHERE fkRecinto = ${id_recinto};

  `;

  return database.executar(instrucaoSql);
}

function pegarTotalSensores(id_recinto) {
  const instrucaoSql = `
  
  SELECT COUNT(idSensor) AS 'sensores' FROM recinto JOIN sensor ON fkRecinto = idRecinto 
  WHERE idRecinto = ${id_recinto};
  
  ;`;

  return database.executar(instrucaoSql);
}

function pegarMaximoTemperatura(idRecinto) {
  const instrucaoSql = `
    SELECT max_emergencia FROM especie 
    JOIN metricas ON fkMetricasTemperatura = idMetricas WHERE fkIdRecinto = ${idRecinto};
  ;`;
  return database.executar(instrucaoSql);
}

function pegarMaximoUmidade(idRecinto) {
  const instrucaoSql = `
    SELECT max_emergencia FROM especie 
    JOIN metricas ON fkMetricasUmidade = idMetricas WHERE fkIdRecinto = ${idRecinto};
  ;`;
  return database.executar(instrucaoSql);
}

function alertas(idRecinto) {
  const instrucaoSql = `
  SELECT COUNT(*) AS 'quantidade' FROM captura 
	  JOIN sensor ON fksensor = idSensor 
  WHERE alerta = 1  AND fkRecinto = ${idRecinto} AND dt_Hr_Captura >= NOW() - INTERVAL 1 DAY;`;

  return database.executar(instrucaoSql);
}

function filtro(data_inicio, data_fim, idRecinto) {
  const instrucaoSql = `
  
  SELECT temperatura, umidade, date(dt_Hr_Captura) AS "Data" FROM captura
	  JOIN sensor ON fkSensor = idSensor 
	WHERE DATE(dt_Hr_Captura) BETWEEN "${data_inicio}" AND "${data_fim}" AND fkRecinto = ${idRecinto};
  `;

  return database.executar(instrucaoSql);
}

function abrirHistorico(id_recinto) {
  const instrucaoSql = `
  SELECT temperatura, umidade, mensagem FROM captura JOIN sensor ON idSensor = fksensor WHERE alerta = 1 AND fkRecinto = ${id_recinto};
  `;

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
  abrirHistorico,
};
