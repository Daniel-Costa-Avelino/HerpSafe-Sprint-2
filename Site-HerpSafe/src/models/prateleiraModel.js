var database = require("../database/config");

function buscarPrateleirasPorEmpresa(fkEmpresa) {
  var instrucaoSql = `SELECT * FROM prateleira WHERE fkEmpresa_prateleira = ${fkEmpresa}`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
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

function buscarCapturasPorPrateleira_Empresa(fkEmpresa) {
  var instrucaoSql = `
    SELECT
  sensor.idSensor,
  captura.idCaptura,
  prateleira.idPrateleira,
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
JOIN prateleira ON recinto.fkPrateleira = prateleira.idPrateleira
JOIN (
    SELECT fkSensor, MAX(idCaptura) AS idCaptura
    FROM captura
    GROUP BY fkSensor
) AS ultimaCaptura ON captura.idCaptura = ultimaCaptura.idCaptura
JOIN especie ON especie.fkIdRecinto = recinto.idRecinto
JOIN metricas AS mTemp ON especie.fkMetricasTemperatura = mTemp.idMetricas
JOIN metricas AS mUmid ON especie.fkMetricasUmidade = mUmid.idMetricas
WHERE fkEmpresa_prateleira = ${fkEmpresa};
  `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function cadastrar(idPrateleira, nome_prateleira, fkEmpresa) {
  var instrucaoSql = `INSERT INTO prateleira (idPrateleira, nome, fkEmpresa_prateleira)  VALUES ('${idPrateleira}', '${nome_prateleira}', ${fkEmpresa})`;
  return database.executar(instrucaoSql);
}

module.exports = {
  buscarPrateleirasPorEmpresa,
  cadastrar,
  buscarCapturasPorPrateleira_Empresa,
  realizarUpdateTabelaCaptura
};
