const database = require("../database/config");

function buscarRecintosPorPrateleira(idPrateleira) {
  const instrucaoSql = `
  SELECT * FROM recinto 
  WHERE fkPrateleira = ${idPrateleira};
  `;

  return database.executar(instrucaoSql);
}

function buscarRecintosPorPrateleira_captura(idPrateleira, idRecinto) {
  const instrucaoSql = `
   SELECT * FROM recinto 
   LEFT JOIN sensor ON fkRecinto = idRecinto
   JOIN captura ON fkSensor = idSensor
   WHERE fkPrateleira = ${idPrateleira} AND idRecinto = ${idRecinto}
   ORDER BY dt_Hr_Captura DESC LIMIT 1;
   `;

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
    SELECT MAX(temperatura) FROM captura 
      JOIN sensor ON fkSensor = idSensor 
    WHERE fkRecinto = ${idRecinto} AND dt_Hr_Captura >= NOW() - INTERVAL 1 DAY;
  ;`;
  return database.executar(instrucaoSql);
}

function pegarMaximoUmidade(idRecinto) {
  const instrucaoSql = `
    SELECT MAX(umidade) FROM captura 
      JOIN sensor ON fkSensor = idSensor 
    WHERE fkRecinto = ${idRecinto} AND dt_Hr_Captura >= NOW() - INTERVAL 1 DAY;
  ;`;
  return database.executar(instrucaoSql);
}
function pegarMetricasTemperatura(idRecinto) {
  const instrucaoSql = `
    SELECT min_ok, max_ok, min_atencao, max_atencao, min_emergencia, max_emergencia, tipo 
    FROM metricas
    JOIN especie as e ON fkMetricasTemperatura = idMetricas
    WHERE e.fkIdRecinto = ${idRecinto};
  ;`;
  return database.executar(instrucaoSql);
}

function pegarMetricasUmidade(idRecinto) {
  const instrucaoSql = `
    SELECT min_ok, max_ok, min_atencao, max_atencao, min_emergencia, max_emergencia, tipo 
    FROM metricas
    JOIN especie as e ON fkMetricasUmidade = idMetricas
    WHERE e.fkIdRecinto = ${idRecinto};
  ;`;
  return database.executar(instrucaoSql);
}

function atualizarStatusCaptura(idRecinto) {
  const instrucaoSql = `
    SELECT
  sensor.idSensor,
  captura.idCaptura,
  recinto.idRecinto,
  recinto.nome_recinto,
  especie.nome,
  captura.temperatura AS temperatura,
  captura.umidade AS umidade,
  mTemp.max_atencao AS maxAtencaoTemp,
  mTemp.max_emergencia AS maxEmergenciaTemp,
  mTemp.max_ok AS maxOkTemp,
  mTemp.min_atencao AS minAtencaoTemp,
  mTemp.min_emergencia AS minEmergenciaTemp,
  mTemp.min_ok AS minOkTemp,
  mUmid.max_atencao AS maxAtencaoUmid,
  mUmid.max_emergencia AS maxEmergenciaUmid,
  mUmid.max_ok AS maxOkUmid,
  mUmid.min_atencao AS minAtencaoUmid,
  mUmid.min_emergencia AS minEmergenciaUmid,
  mUmid.min_ok AS minOkUmid
FROM captura
JOIN sensor ON captura.fkSensor = sensor.idSensor
JOIN recinto ON sensor.fkRecinto = recinto.idRecinto
JOIN (
    SELECT fkSensor, MAX(idCaptura) AS idCaptura
    FROM captura
    GROUP BY fkSensor
) AS ultimaCaptura ON captura.idCaptura = ultimaCaptura.idCaptura
JOIN especie ON especie.fkIdRecinto = recinto.idRecinto
JOIN metricas AS mTemp ON especie.fkMetricasTemperatura = mTemp.idMetricas
JOIN metricas AS mUmid ON especie.fkMetricasUmidade = mUmid.idMetricas
WHERE fkRecinto = ${idRecinto};
  ;`;
  return database.executar(instrucaoSql);
}

function realizarUpdateTabelaCaptura(status, idCaptura, mensagem) {
  var instrucaoSql = `
        UPDATE captura SET alerta = ${status} WHERE idCaptura = ${idCaptura};
        UPDATE captura SET mensagem = '${mensagem}' WHERE idCaptura = ${idCaptura};
  `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
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
    SELECT temperatura, umidade, mensagem, dt_Hr_Captura FROM captura JOIN sensor ON idSensor = fksensor WHERE alerta = 1 AND fkRecinto = ${id_recinto};
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
  pegarMetricasTemperatura,
  pegarMetricasUmidade,
  atualizarStatusCaptura,
  realizarUpdateTabelaCaptura,
  alertas,
  filtro,
  abrirHistorico,
  buscarRecintosPorPrateleira_captura,
};
