function cadastrar() {
  var nome_cadastro = document.getElementById("input_nomeCadastro").value;
  var n1Cadastro = document.getElementById("input_n1Cadastro").value;
  var n2Cadastro = document.getElementById("input_n2Cadastro").value;
  var fkPrateleira = document.getElementById("input_fkPrateleira").value;
  var header = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      nome_cadastro: nome_cadastro,
      n1Cadastro: n1Cadastro,
      n2Cadastro: n2Cadastro,
      fkPrateleira: fkPrateleira,
    }),
  };
  fetch("/recinto/cadastrar", header)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Erro");
      }
    })

    .catch((error) => {
      console.error("Erro na requisição:", error);
    });
}
