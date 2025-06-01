var usuarioModel = require("../models/usuarioModel");
// var aquarioModel = require("../models/aquarioModel");

function autenticar(req, res) {
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;

  if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está indefinida!");
  } else {
    if (email == "" || senha == "") {
      return res.status(400).send(`Campos não preenchidos;`);
    }

    usuarioModel
      .autenticar(email, senha)
      .then(function (resultadoAutenticar) {
        console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
        console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

        if (resultadoAutenticar.length == 1) {
          console.log(resultadoAutenticar);
          if (resultadoAutenticar.length == 1) {
            console.log(resultadoAutenticar);
            res.json({
              id: resultadoAutenticar[0].id,
              nome: resultadoAutenticar[0].nome,
              cpf: resultadoAutenticar[0].cpf,
              email: resultadoAutenticar[0].email,
              senha: resultadoAutenticar[0].senha,
              fkEmpresa: resultadoAutenticar[0].fkEmpresa,
            });
          } else if (resultadoAutenticar.length == 0) {
            res.status(403).send("Credenciais inválidas.");
          } else {
            res.status(403).send("Mais de um usuário encontrado.");
          }
        }
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o login! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function cadastrar(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  var nome = req.body.nomeServer;
  var cpf = req.body.cpfServer;
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;
  var fkEmpresa = req.body.fkEmpresaServer;
  // Faça as validações dos valores
  if (nome == undefined) {
    res.status(400).send("Seu nome está undefined!");
  } else if (cpf == undefined) {
    res.status(400).send("Seu cpf está undefined!");
  } else if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está undefined!");
  } else if (fkEmpresa == undefined) {
    res.status(400).send("O código está undefined");
  } else {
    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    usuarioModel
      .cadastrar(nome, cpf, email, senha, fkEmpresa)
      .then(function (resultado) {
        res.json(resultado);
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o cadastro! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

module.exports = {
  autenticar,
  cadastrar,
};
