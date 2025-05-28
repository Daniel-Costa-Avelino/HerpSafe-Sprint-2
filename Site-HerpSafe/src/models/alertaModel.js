var database = require("../database/config");

function buscarAlertas(fkEmpresa) {

    var instrucaoSql = `
    SELECT * FROM alertas
    JOIN sensor ON fkSensor = idSensor
    JOIN captura ON captura.fkSensor = sensor.idSensor
    JOIN recinto ON idRecinto = fkRecinto
    JOIN prateleira ON fkPrateleira = idPrateleira
    JOIN empresa ON fkEmpresa_prateleira = idEmpresa
    WHERE idEmpresa = ${fkEmpresa};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarAlertas
}
