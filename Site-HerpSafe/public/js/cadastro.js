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
    Toastify({
      text: "Erro: Por favor, preencha todos os campos",
      duration: 3000,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "#0B371F",
      },
    }).showToast();
  } else if (senha !== confirmarsenha) {
    Toastify({
      text: "Erro: As senhas não coincidem",
      duration: 3000,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "#0B371F",
      },
    }).showToast();
  } else if (nome.length <= 3 || nome.indexOf(" ") == -1) {
    Toastify({
      text: "Erro: É necessário ter nome e sobrenome",
      duration: 3000,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "#0B371F",
      },
    }).showToast();
  } else if (
    email == "" ||
    email.indexOf("@") == -1 ||
    email.indexOf(".com") == -1
  ) {
    // validação email
    Toastify({
      text: "Erro: O e-mail deve estar no formato correto",
      duration: 3000,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "#0B371F",
      },
    }).showToast();
  } else if (
    senha == "" ||
    senha.length < 8 ||
    senha == senha.toLowerCase(senha) ||
    senha == senha.toUpperCase(senha)
  ) {
    Toastify({
      text: "Erro: As senha Deve ter pelo menos 8 dígitos, 1 letra minúscula e 1 letra maiúscula",
      duration: 3000,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "#0B371F",
      },
    }).showToast();
  } else if (cpf == "" || cpf.length != 11) {
    //validação CPF
    Toastify({
      text: "Erro: O CPF deve ter 11 dígitos",
      duration: 3000,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "#0B371F",
      },
    }).showToast();
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
          Toastify({
            text: "Erro: Não foi possível realizar o cadastro",
            duration: 3000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
              background: "#0B371F",
            },
          }).showToast();
          console.log(resposta);
        }
      })
      .catch(function (erro) {
        Toastify({
          text: "Erro: Houve um problema na requisição",
          duration: 3000,
          destination: "https://github.com/apvarun/toastify-js",
          newWindow: true,
          close: true,
          gravity: "top",
          position: "right",
          stopOnFocus: true,
          style: {
            background: "#0B371F",
          },
        }).showToast();

        console.log(erro);
      });
  }
}
