const nomeUsuario = document.getElementById("nome_usuario");
const numeroSensoresRecinto = document.getElementById(
  "numero-sensores-recinto"
);

const botaoHistorico = document.getElementById("filter_historico");

nomeUsuario.innerHTML = sessionStorage.NOME_USUARIO;

function pegarCapturasTemperatura() {
  const header = {
    method: "POST",
    headers: {
      "Content-Type": "Application/json",
    },
    body: JSON.stringify({
      idRecinto: sessionStorage.ID_RECINTO_INDIVIDUAL,
    }),
  };

  fetch("http://localhost:3333/recinto/pegarCapturasTemperatura", header)
    .then((result) => {
      result.json().then((json) => {
        const sensorTemp = document
          .getElementById(`temperatura`)
          .getContext("2d");

        new Chart(sensorTemp, {
          type: "line",
          data: {
            labels: ["1", "2", "3", "4", "5"],
            datasets: [
              {
                label: `Temperatura do sensor 1`,
                data: [
                  json[0].temperatura,
                  json[1].temperatura,
                  json[2].temperatura,
                  json[3].temperatura,
                  json[4].temperatura,
                ],
                borderWidth: 1,
                backgroundColor: "#EA4949",
                borderColor: "#FFF",
              },
            ],
          },

          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      });
    })

    .catch((error) => {
      console.log("Erro: não foi possível fazer a requisição", error);
    });
}

function pegarCapturasUmidade() {
  const header = {
    method: "POST",
    headers: {
      "Content-Type": "Application/json",
    },
    body: JSON.stringify({
      idRecinto: sessionStorage.ID_RECINTO_INDIVIDUAL,
    }),
  };

  fetch("http://localhost:3333/recinto/pegarCapturasUmidade", header)
    .then((result) => {
      result.json().then((json) => {
        const sensorTemp = document.getElementById(`umidade`).getContext("2d");

        new Chart(sensorTemp, {
          type: "line",
          data: {
            labels: ["1", "2", "3", "4", "5"],
            datasets: [
              {
                label: `Umidade do sensor 1`,
                data: [
                  json[0].umidade,
                  json[1].umidade,
                  json[2].umidade,
                  json[3].umidade,
                  json[4].umidade,
                ],
                borderWidth: 1,
              },
            ],
          },

          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      });
    })

    .catch((error) => {
      console.log("Erro: não foi possível fazer a requisição", error);
    });
}

function pegarTotalSensoresPorRecinto() {
  const header = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idRecinto: sessionStorage.ID_RECINTO_INDIVIDUAL,
    }),
  };

  fetch("http://localhost:3333/recinto/pegarTotalSensores", header)
    .then((result) => {
      if (result.ok) {
        result.json().then((json) => {
          numeroSensoresRecinto.innerHTML = json[0].sensores;
        });
      }
    })
    .catch((error) => {
      console.log(
        "Erro: não foi possível pegar o total de sensores do recinto",
        error
      );
    });
}

function pegarMaximoTemperatura() {
  const temperaturaMaxima = document.getElementById("temperatura-maxima");

  const header = {
    method: "POST",
    headers: {
      "Content-Type": "Application/json",
    },
    body: JSON.stringify({
      idRecinto: sessionStorage.ID_RECINTO_INDIVIDUAL,
    }),
  };

  fetch("http://localhost:3333/recinto/pegarMaximoTemperatura", header)
    .then((resultado) => {
      if (resultado.ok) {
        resultado.json().then((json) => {
          temperaturaMaxima.innerHTML = json[0].max_emergencia;
        });
      }
    })
    .catch((erro) => {
      console.log(
        "Erro: não foi possível pegar o máximo de temperatura dos Sensores",
        erro
      );
    });
}

function pegarMaximoUmidade() {
  const umidadeMaxima = document.getElementById("umidade-maxima");
  const idRecinto = sessionStorage.ID_RECINTO_INDIVIDUAL;

  const header = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idRecinto: idRecinto,
    }),
  };

  fetch("http://localhost:3333/recinto/pegarMaximoUmidade", header)
    .then((result) => {
      if (result.ok) {
        result.json().then((json) => {
          umidadeMaxima.innerHTML = `${json[0].max_emergencia}%`;
        });
      }
    })
    .catch((erro) => {
      console.log("Erro: não foi possível pegar o máximo de umidade", erro);
    });
}

function pegarMetricasTemperatura() {
  const header = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idRecinto: sessionStorage.ID_RECINTO_INDIVIDUAL,
    }),
  };

  fetch("http://localhost:3333/recinto/pegarMetricasTemperatura", header).then(resposta => {
    console.log(resposta);
  })
}

function pegarMetricasUmidade() {
  const header = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idRecinto: sessionStorage.ID_RECINTO_INDIVIDUAL,
    }),
  };

  fetch("http://localhost:3333/recinto/pegarMetricasUmidade", header)  
}

function alertas() {
  const idRecinto = sessionStorage.ID_RECINTO_INDIVIDUAL;

  fetch("/recinto/alertas", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      idRecinto,
    }),
  })
    .then((res) => res.json())
    .then((json) => {
      document.getElementById("24-alerta").innerHTML = json[0].quantidade;
    })

    .catch((err) => {
      console.error("Erro:", err);
    });
}

function filtro() {
  const data_inicio = data_de.value;
  const data_fim = data_ate.value;

  if (data_inicio == "" || data_fim == "") {
    alert("Preencha todos os campos");
  } else {
    const header = {
      method: "POST",
      headers: {
        "Content-type": "Application/json",
      },
      body: JSON.stringify({
        data_inicio: data_inicio,
        data_fim: data_fim,
        idRecinto: sessionStorage.ID_RECINTO_INDIVIDUAL,
      }),
    };

    fetch("/recinto/filtro", header).then((result) => {
      result.json().then((json) => {
        console.log(json.length);

        if (json.length > 0) {
          const divGraficoTemp = document.getElementById("grafico_temperatura");
          const divGraficoUmi = document.getElementById("grafico_umidade");

          divGraficoTemp.innerHTML = "";
          divGraficoTemp.innerHTML = `<canvas id="temperatura"><canvas>`;
          divGraficoUmi.innerHTML = "";
          divGraficoUmi.innerHTML = `<canvas id="umidade"><canvas>`;

          const sensorTemp = document
            .getElementById(`temperatura`)
            .getContext("2d");

          new Chart(sensorTemp, {
            type: "line",
            data: {
              labels: ["1", "2", "3", "4", "5", "6"],
              datasets: [
                {
                  label: `Início: ${data_inicio} - Fim: ${data_fim}`,
                  data: [
                    json[0].temperatura,
                    json[1].temperatura,
                    json[2].temperatura,
                    json[3].temperatura,
                    json[4].temperatura,
                  ],
                  borderWidth: 1,
                  backgroundColor: "#EA4949",
                  borderColor: "#FFF",
                },
              ],
            },

            options: {
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            },
          });
          const sensorUmi = document.getElementById(`umidade`).getContext("2d");

          new Chart(sensorUmi, {
            type: "line",
            data: {
              labels: ["1", "2", "3", "4", "5", "6"],
              datasets: [
                {
                  label: `Início: ${data_inicio} - Fim: ${data_fim}`,
                  data: [
                    json[0].umidade,
                    json[1].umidade,
                    json[2].umidade,
                    json[3].umidade,
                    json[4].umidade,
                  ],
                  borderWidth: 1,
                },
              ],
            },

            options: {
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            },
          });
        } else {
          alert("Não existem dados para a data selecionada!");
        }
      });
    });
  }
}

document.addEventListener("DOMContentLoaded", pegarCapturasTemperatura);
document.addEventListener("DOMContentLoaded", pegarCapturasUmidade);
document.addEventListener("DOMContentLoaded", pegarTotalSensoresPorRecinto);
document.addEventListener("DOMContentLoaded", pegarMaximoTemperatura);
document.addEventListener("DOMContentLoaded", pegarMaximoUmidade);
document.addEventListener("DOMContentLoaded", alertas);
document.addEventListener("DOMContentLoaded", pegarMetricasTemperatura);
document.addEventListener("DOMContentLoaded", pegarMetricasUmidade);
botaoHistorico.addEventListener("click", filtro);
