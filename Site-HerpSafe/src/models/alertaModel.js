var database = require("../database/config");

function buscarAlertas(fkEmpresa) {

    var instrucaoSql = `
    SELECT * FROM alertas
    JOIN sensor ON fkSensor = idSensor
    JOIN captura ON captura.fkSensor = sensor.idSensor
    JOIN prateleira ON fkPrateleira = idPrateleira
    JOIN empresa ON fkEmpresa_prateleira = idEmpresa
    WHERE idEmpresa = ${fkEmpresa};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarAlertas(fkEmpresa) {

    var instrucaoSql = `
    SELECT * FROM captura
    JOIN sensor ON fkSensor = idSensor
    JOIN recinto on fkRecinto = idRecinto
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
