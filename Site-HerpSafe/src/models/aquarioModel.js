var database = require("../database/config");

function buscarRecintosPorEmpresa(empresaId) {

  var instrucaoSql = `SELECT * FROM recinto a WHERE fk_empresa = ${empresaId}`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function cadastrar(empresaId, nome_recinto) {
  
  var instrucaoSql = `INSERT INTO (nome_recinto, fk_empresa) recinto VALUES (${nome_recinto}, ${empresaId})`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}


module.exports = {
  buscarRecintosPorEmpresa,
  cadastrar
}
