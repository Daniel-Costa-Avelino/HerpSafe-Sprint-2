var database = require("../database/config");

function buscarRecintosMonitorados(fkEmpresa) {
  var instrucaoSql = `SELECT COUNT(idRecinto) AS qtdRecintosEmpresa FROM recinto
    JOIN prateleira ON fkPrateleira = idPrateleira
    JOIN empresa ON fkEmpresa_prateleira = idEmpresa
    WHERE fkEmpresa_prateleira = ${fkEmpresa};`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarSensoresAtivos(fkEmpresa) {
  var instrucaoSql = `SELECT COUNT(idSensor) AS qtdSensoresAtivos FROM sensor 
    JOIN recinto ON fkRecinto = idRecinto
    JOIN prateleira ON fkPrateleira = idPrateleira
    JOIN empresa ON fkEmpresa_prateleira = idEmpresa
    WHERE fkEmpresa_prateleira = ${fkEmpresa};`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarAlertas(fkEmpresa) {
  var instrucaoSql = `SELECT COUNT(*) AS total_alertas_24h
    FROM captura as c
    JOIN sensor ON fkSensor = idSensor
    JOIN recinto ON fkRecinto = idRecinto
    JOIN prateleira ON fkPrateleira = idPrateleira
    JOIN empresa ON fkEmpresa_prateleira = idEmpresa
    WHERE c.dt_Hr_Captura BETWEEN NOW() - INTERVAL 1 DAY AND NOW() AND fkEmpresa_prateleira = ${fkEmpresa} AND c.alerta >= 1`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarRecintosComProblemas(fkEmpresa) {
  var instrucaoSql = `SELECT COUNT(*) AS recintos_com_problemas
    FROM recinto as r
    JOIN prateleira ON fkPrateleira = idPrateleira
    JOIN empresa ON fkEmpresa_prateleira = idEmpresa
    WHERE fkEmpresa_prateleira = ${fkEmpresa} AND r.status_recinto = "Alerta"`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  buscarRecintosMonitorados,
  buscarSensoresAtivos,
  buscarAlertas,
  buscarRecintosComProblemas,
};
