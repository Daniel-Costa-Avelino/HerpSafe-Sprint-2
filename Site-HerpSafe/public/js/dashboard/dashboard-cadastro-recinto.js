function cadastrar() {
  const nomeRecinto = document.getElementById("input_nomeRecinto").value;
  const fkPrateleira = document.getElementById("input_fkPrateleira").value;
  const especie = document.getElementById("select_recinto").value;
  let fkMetrica1 = 0;
  let fkMetrica2 = 0;

  if (nomeRecinto == "" || fkPrateleira == "" || especie == "") {
    Toastify({
      text: "Erro: Por favor, preencha todos os campos!",
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
          Toastify({
            text: "Cadastro de recinto realizado com sucesso!",
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
          throw new Error("Erro");
        }
      })

      .catch((error) => {
        Toastify({
          text: "Erro: não foi possível cadastrar o recinto!",
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
}
