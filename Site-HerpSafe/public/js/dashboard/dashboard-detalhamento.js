const nomeUsuario = document.getElementById("nome_usuario");
const numeroSensoresRecinto = document.getElementById(
  "numero-sensores-recinto"
);

const botaoHistorico = document.getElementById("filter_historico");

nomeUsuario.innerHTML = sessionStorage.NOME_USUARIO;

function filterHistorico() {
  window.location.href = "../../dashboard/dashboard-alertas.html";

  // const header = {
  //     method: "POST",
  //     headers: {
  //         "Content-Type": "Applcication/json"
  //     },
  //     body: JSON.stringify{

  //     }
  // }
}

function pegarCapturasTemperatura(numeroSensor) {
  const header = {
    method: "POST",
    headers: {
      "Content-Type": "Application/json",
    },
    body: JSON.stringify({
      idRecinto: sessionStorage.ID_RECINTO_INDIVIDUAL,
      fk_sensor: numeroSensor,
    }),
  };

  fetch("http://localhost:3333/recinto/pegarCapturasTemperatura", header)
    .then((result) => {
      result.json().then((json) => {
        const sensorTemp = document
          .getElementById(`temperatura${numeroSensor}`)
          .getContext("2d");

        new Chart(sensorTemp, {
          type: "line",
          data: {
            labels: ["1", "2", "3", "4", "5", "6"],
            datasets: [
              {
                label: `Temperatura do sensor ${numeroSensor}`,
                data: [
                  json[0].temperatura,
                  json[1].temperatura,
                  json[2].temperatura,
                  json[3].temperatura,
                  json[4].temperatura,
                  json[5].temperatura,
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
// Function para pegar as capturas de umidade
function pegarCapturasUmidade(numeroSensor) {
  const header = {
    method: "POST",
    headers: {
      "Content-type": "Application/json",
    },
    body: JSON.stringify({
      idRecinto: sessionStorage.ID_RECINTO_INDIVIDUAL,
      fk_sensor: numeroSensor,
    }),
  };

  fetch("http://localhost:3333/recinto/pegarCapturasUmidade", header)
    .then((result) => {
      result.json().then((json) => {
        const sensorUmi = document
          .getElementById(`umidade${numeroSensor}`)
          .getContext(`2d`);

        new Chart(sensorUmi, {
          type: `line`,
          data: {
            labels: [`1`, `2`, `3`, `4`, `5`, `6`],
            datasets: [
              {
                label: `Umidade do Sensor ${numeroSensor}`,
                data: [
                  json[0].umidade,
                  json[1].umidade,
                  json[2].umidade,
                  json[3].umidade,
                  json[4].umidade,
                  json[5].umidade,
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
      console.log(`Erro: Não foi possível fazer a requisição`, error);
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
          numeroSensoresRecinto.innerHTML = json[0].Total;
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
  const jsonRecintos = JSON.parse(sessionStorage.RECINTOS_TODOS);

  const header = {
    method: "POST",
    headers: {
      "Content-Type": "Application/json",
    },
    body: JSON.stringify({
      fk_sensor1: jsonRecintos[0].fk_sensor1,
      fk_sensor2: jsonRecintos[0].fk_sensor2,
    }),
  };

  fetch("http://localhost:3333/recinto/pegarMaximoTemperatura", header)
    .then((resultado) => {
      if (resultado.ok) {
        resultado.json().then((json) => {
          temperaturaMaxima.innerHTML = json[0].temperatura;
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
  const jsonRecintos = JSON.parse(sessionStorage.RECINTOS_TODOS);

  const header = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fk_sensor1: jsonRecintos[0].fk_sensor1,
      fk_sensor2: jsonRecintos[0].fk_sensor2,
    }),
  };

  fetch("http://localhost:3333/recinto/pegarMaximoUmidade", header)
    .then((result) => {
      if (result.ok) {
        result.json().then((json) => {
          umidadeMaxima.innerHTML = `${json[0].umidade}%`;
        });
      }
    })
    .catch((erro) => {
      console.log("Erro: não foi possível pegar o máximo de umidade", erro);
    });
}

pegarCapturasTemperatura(1);
pegarCapturasTemperatura(2);
pegarCapturasUmidade(1);
pegarCapturasUmidade(2);

function alertas() {
  const idRecinto = sessionStorage.ID_RECINTO_INDIVIDUAL;
  const fk_sensor = numeroSensor;

  fetch("/recinto/ultimas24", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      idRecinto,
      fk_sensor,
    }),
  })
    .then((res) => res.json())
    .then((json) => {
      console.log("Alertas:", json);
      document.getElementById("resultado").innerText = JSON.stringify(
        json,
        null,
        2
      );
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
    const recinto = JSON.parse(sessionStorage.RECINTOS_TODOS);

    const header = {
      method: "POST",
      headers: {
        "Content-type": "Application/json",
      },
      body: JSON.stringify({
        fkSensor1: recinto[0].fk_sensor1,
        fkSensor2: recinto[0].fk_sensor2,
        data_inicio: data_inicio,
        data_fim: data_fim,
      }),
    };

    fetch("/recinto/filtro", header).then((result) => {
      result.json().then((json) => {
        const divGraficoTemp = document.getElementById("grafico_temperatura");
        const divGraficoUmi = document.getElementById("grafico_umidade");

        divGraficoTemp.innerHTML = "";
        divGraficoTemp.innerHTML = `<canvas id="temperatura1"><canvas>`;
        divGraficoUmi.innerHTML = "";
        divGraficoUmi.innerHTML = `<canvas id="umidade1"><canvas>`;

        const sensorTemp = document
          .getElementById(`temperatura1`)
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
                  json[5].temperatura,
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
        const sensorUmi = document.getElementById(`umidade1`).getContext("2d");

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
                  json[5].umidade,
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
    });
  }
}

document.addEventListener("DOMContentLoaded", pegarTotalSensoresPorRecinto);
document.addEventListener("DOMContentLoaded", pegarMaximoTemperatura);
document.addEventListener("DOMContentLoaded", pegarMaximoUmidade);
botaoHistorico.addEventListener("click", filterHistorico);
