function cadastrar() {
  const nomeRecinto = document.getElementById("input_nomeRecinto").value;
  const fkPrateleira = document.getElementById("input_fkPrateleira").value;
  const especie = document.getElementById("select_recinto").value;
  let fkMetrica1 = 0;
  let fkMetrica2 = 0;

  if (nomeRecinto == "" || fkPrateleira == "" || especie == "") {
    alert("Por favor, preencha todos os componentes!");
  } else {
    if (especie == "Piton Real") {
      fkMetrica1 = 1;
      fkMetrica2 = 2;
    } else if (especie == "Jiboia Arco-Íris") {
      fkMetrica1 = 3;
      fkMetrica2 = 4;
    } else if (especie == "Jiboia") {
      fkMetrica1 = 5;
      fkMetrica2 = 6;
    }

    const header = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        nomeRecinto: nomeRecinto,
        fkPrateleira: fkPrateleira,
        especie: especie,
        metricaTemperatura: fkMetrica1,
        metricaUmidade: fkMetrica2,
      }),
    };

    fetch("/recinto/cadastrar", header)
      .then((response) => {
        if (response.ok) {
          alert("Cadastro de Recinto realizado com sucesso!");
          return response.json();
        } else {
          throw new Error("Erro");
        }
      })

      .catch((error) => {
        console.error("Erro na requisição:", error);
      });
  }
}
