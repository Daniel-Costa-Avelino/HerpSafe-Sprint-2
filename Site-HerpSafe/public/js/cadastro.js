function cadastro() {
  var nome = document.getElementById("input_nomeCadastro").value;
  var cpf = document.getElementById("input_cpf").value;
  var email = document.getElementById("input_emailCadastro").value;
  var senha = document.getElementById("input_senhaCadastro").value;
  var confirmarsenha = document.getElementById(
    "input_confirmarsenhaCadastro"
  ).value;
  var fkEmpresa = document.getElementById("input_codigo").value;

  if (
    nome == "" ||
    cpf == "" ||
    email == "" ||
    senha == "" ||
    fkEmpresa == ""
  ) {
    alert(`Prencha todos os campos.`);
  } else if (senha !== confirmarsenha) {
    alert(`As senhas não coincidem.`);
  } else if (nome.length <= 3 || nome.indexOf(" ") == -1) {
    //validação nome
    alert(`Nome - Deve conter nome e sobrenome\n`);
  } else if (
    email == "" ||
    email.indexOf("@") == -1 ||
    email.indexOf(".com") == -1
  ) {
    // validação email
    alert(`Email - Deve estar no formato correto\n`);
  } else if (
    senha == "" ||
    senha.length < 8 ||
    senha == senha.toLowerCase(senha) ||
    senha == senha.toUpperCase(senha)
  ) {
    // validação senha
    alert(
      `Senha - Deve ter pelo menos 8 dígitos, 1 letra minúscula e 1 letra maiúscula \n`
    );
  } else if (cpf == "" || cpf.length != 11) {
    //validação CPF
    alert(`CPF - Deve ter 11 dígitos`);
  }

  //Requisições
  else {
    var corpo = {
      nomeServer: nome,
      cpfServer: cpf,
      emailServer: email,
      senhaServer: senha,
      fkEmpresaServer: fkEmpresa,
    };

    fetch("/usuarios/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(corpo),
    })
      .then(function (resposta) {
        if (resposta.ok) {
          alert("Cadastro realizado com sucesso!");
          window.location.href = "login.html";
        } else {
          resposta.text().then((msg) => {
            alert("Erro ao cadastrar: " + msg);
          });
        }
      })
      .catch(function (erro) {
        console.error("Erro na requisição:", erro);
      });
  }
}
