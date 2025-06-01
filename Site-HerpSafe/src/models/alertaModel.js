var database = require("../database/config");

function buscarAlertas(fkEmpresa) {
  var instrucaoSql = `
    SELECT * FROM captura as c
    JOIN sensor ON fkSensor = idSensor
    JOIN recinto on fkRecinto = idRecinto
    JOIN prateleira ON fkPrateleira = idPrateleira
    JOIN empresa ON fkEmpresa_prateleira = idEmpresa
    WHERE idEmpresa = ${fkEmpresa} AND c.alerta = 1;
    `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  buscarAlertas,
};
