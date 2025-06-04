function login() {
  var email = document.getElementById("input_emailLogin").value;
  var senha = document.getElementById("input_senhaLogin").value;

  if (email == "" || senha == "") {
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
  }

  var corpo = {
    emailServer: email,
    senhaServer: senha,
  };

  fetch("/usuarios/autenticar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(corpo),
  })
    .then(function (resposta) {
      if (resposta.ok) {
        return resposta.json();
      } else {
        return resposta.text().then((msg) => {
          throw new Error(msg);
        });
      }
    })
    .then(function (dados) {
      Toastify({
        text: "Login Realizado com Sucesso!",
        duration: 2000,
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

      sessionStorage.EMAIL_USUARIO = dados.email;
      sessionStorage.NOME_USUARIO = dados.nome;
      sessionStorage.ID_EMPRESA = dados.fkEmpresa;

      setTimeout(() => {
        window.location.href = "./dashboard/dashboard-visao-geral.html";
      }, 2000);
    })
    .catch(function (erro) {
      Toastify({
        text: "Erro: Não foi possível realizar a requisição",
        duration: 250,
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

      console.error("Erro ao tentar login:", erro.message);
    });
}
