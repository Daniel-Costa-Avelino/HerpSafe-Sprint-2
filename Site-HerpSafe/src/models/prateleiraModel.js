var database = require("../database/config");

function buscarPrateleirasPorEmpresa(fkEmpresa) {

  var instrucaoSql = `SELECT * FROM prateleira WHERE fkEmpresa_prateleira = ${fkEmpresa}`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function cadastrar(nome_recinto, numeroSerial1, numeroSerial2, fkPrateleira) {
  
  var instrucaoSql = `INSERT INTO recinto (nome_recinto, numeroSerial1 , numeroSerial2, fkPrateleira)  VALUES ('${nome_recinto}', ${numeroSerial1}, ${numeroSerial2}, ${fkPrateleira})`;
  return database.executar(instrucaoSql);
}


module.exports = {
  buscarPrateleirasPorEmpresa,
  cadastrar
}
