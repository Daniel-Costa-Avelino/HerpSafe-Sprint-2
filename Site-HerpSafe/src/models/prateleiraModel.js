var database = require("../database/config");

function buscarPrateleirasPorEmpresa(fkEmpresa) {
  var instrucaoSql = `SELECT * FROM prateleira WHERE fkEmpresa_prateleira = ${fkEmpresa}`;

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
};
