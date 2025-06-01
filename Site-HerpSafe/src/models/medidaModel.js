var database = require("../database/config");

function buscarUltimasMedidas(idRecinto, limite_linhas) {
  var instrucaoSql = `SELECT 
        temperatura as temperatura, 
        umidade as umidade,
                        dt_Hr_Captura as momento,
                        DATE_FORMAT(dt_Hr_Captura,'%H:%i:%s') as momento_grafico
                    FROM captura
                    WHERE fksensor = ${idSensor}
                    ORDER BY idCaptura DESC LIMIT ${limite_linhas}`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idRecinto) {
  var instrucaoSql = `SELECT 
        temperatura as temperatura, 
        umidade as umidade,
                        DATE_FORMAT(dt_Hr_Captura,'%H:%i:%s') as momento_grafico 
                        FROM captura 
                        WHERE fksensor = ${idSensor} 
                    ORDER BY idCaptura DESC LIMIT 1`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  buscarUltimasMedidas,
  buscarMedidasEmTempoReal,
};
