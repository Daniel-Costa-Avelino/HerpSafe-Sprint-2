var database = require("../database/config");

function buscarRecintosPorPrateleira(idPrateleira) {

  var instrucaoSql = `SELECT * FROM recinto WHERE fkPrateleira = ${idPrateleira}`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function cadastrar(nome_recinto, numeroSerial1, numeroSerial2, fkPrateleira) {
  
  var instrucaoSql = `INSERT INTO recinto (nome_recinto, numeroSerial1 , numeroSerial2, fkPrateleira)  VALUES ('${nome_recinto}', ${numeroSerial1}, ${numeroSerial2}, ${fkPrateleira})`;
  return database.executar(instrucaoSql);
}


module.exports = {
  buscarRecintosPorPrateleira,
  cadastrar
}
