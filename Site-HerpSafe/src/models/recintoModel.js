var database = require("../database/config");

function buscarRecintosPorEmpresa(empresaId) {

  var instrucaoSql = `SELECT * FROM recinto WHERE fk_empresa = ${empresaId}`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function cadastrar(nome_recinto, numero_sensor1, numero_sensor2, dt_Instalacao) {
  
  var instrucaoSql = `INSERT INTO (nome_recinto, dt_Instalacao) recinto VALUES (${nome_recinto}, ${dt_Instalacao})`;
  return database.executar(instrucaoSql);
}


module.exports = {
  buscarRecintosPorEmpresa,
  cadastrar
}
