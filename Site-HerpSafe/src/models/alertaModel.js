const database = require("../database/config");

function buscarAlertas(fkEmpresa) {
  const instrucaoSql = `
    SELECT * FROM captura as c
    JOIN sensor ON fkSensor = idSensor
    JOIN recinto on fkRecinto = idRecinto
    JOIN prateleira ON fkPrateleira = idPrateleira
    JOIN empresa ON fkEmpresa_prateleira = idEmpresa
    WHERE idEmpresa = ${fkEmpresa} AND c.alerta = 1;
    `;
  return database.executar(instrucaoSql);
}

function filtrarAlertas(nome_recinto, data, id_empresa) {
  const instrucaoSql = `
    SELECT temperatura, umidade, DATE(dt_Hr_Captura) AS 'data', mensagem, nome_recinto FROM captura
      JOIN sensor ON fksensor = idsensor  
      JOIN recinto ON fkRecinto = idRecinto 
      JOIN prateleira ON fkPrateleira = idPrateleira 
    WHERE alerta = 1 AND fkEmpresa_prateleira = ${id_empresa} AND nome_recinto = "${nome_recinto}" 
    AND DATE(dt_hr_Captura) = '${data}';
  `;

  return database.executar(instrucaoSql);
}

module.exports = {
  buscarAlertas,
  filtrarAlertas,
};
