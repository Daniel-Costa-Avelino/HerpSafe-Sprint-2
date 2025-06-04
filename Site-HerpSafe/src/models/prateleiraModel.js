var database = require("../database/config");

function buscarPrateleirasPorEmpresa(fkEmpresa) {
  var instrucaoSql = `SELECT * FROM prateleira WHERE fkEmpresa_prateleira = ${fkEmpresa}`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function realizarUpdateTabelaCaptura(fkSensor, status, idCaptura) {
  var instrucaoSql = `
        UPDATE captura SET alerta = ${status} WHERE fkSensor = ${fkSensor} AND idCaptura = ${idCaptura};
  `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarCapturasPorPrateleira_Empresa(fkEmpresa) {
  var instrucaoSql = `
    SELECT
    captura.idCaptura,
    sensor.idSensor,
    prateleira.idPrateleira,
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
    FROM prateleira
    JOIN recinto ON recinto.fkPrateleira = prateleira.idPrateleira
    JOIN sensor ON sensor.fkRecinto = recinto.idRecinto
    JOIN captura ON captura.fkSensor = sensor.idSensor
    JOIN especie ON especie.fkIdRecinto = recinto.idRecinto
    JOIN metricas AS mTemp ON especie.fkMetricasTemperatura = mTemp.idMetricas
    JOIN metricas AS mUmid ON especie.fkMetricasUmidade = mUmid.idMetricas
    WHERE fkEmpresa_Prateleira = ${fkEmpresa}
    ORDER BY dt_Hr_captura DESC LIMIT 1;
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
