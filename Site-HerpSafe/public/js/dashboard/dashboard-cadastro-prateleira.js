function cadastrar() {
  var nome_cadastro = document.getElementById("input_nomeCadastro").value;
  var fkPrateleira = document.getElementById("input_fkPrateleira").value;
  var idEmpresa = sessionStorage.ID_EMPRESA;
  var header = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      idPrateleira: fkPrateleira,
      nome_cadastro: nome_cadastro,
      id_empresa: idEmpresa,
    }),
  };
  fetch("/prateleiras/cadastrar", header)
    .then((response) => {
      if (response.ok) {
        Toastify({
          text: "Prateleira Cadastrada com Sucesso!",
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

        return response.json();
      } else {
        Toastify({
          text: "Erro: não foi possível cadastrar a prateleira!",
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
        throw new Error("Erro");
      }
    })
    .catch((error) => {
      Toastify({
        text: "Erro: não foi possível fazer a requisição!",
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
      console.error("Erro na requisição:", error);
    });
}
