const nomeUsuario = document.getElementById("nome_usuario");
const numeroSensoresRecinto = document.getElementById(
  "numero-sensores-recinto"
);
const filterHistorico = document.getElementById("filter_historico");

const botaoFiltrar = document.getElementById("filtrar_data");

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
          console.log(`Retorno Temp Máxima`)
          console.log(json);
          temperaturaMaxima.innerHTML = json[0].max_temperatura;
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
          console.log(`Retorno Umidade Máxima`)
          console.log(json)
          umidadeMaxima.innerHTML = `${json[0].max_umidade}%`;
        });
      }
    })
    .catch((erro) => {
      console.log("Erro: não foi possível pegar o máximo de umidade", erro);
    });
}

function pegarMetricasTemperatura() {

  const temp_urgente_min = document.getElementById("temp_urgente_min");
  const temp_cuidado_min = document.getElementById("temp_cuidado_min");
  const temp_boa = document.getElementById("temp_boa");
  const temp_cuidado_max = document.getElementById("temp_cuidado_max");
  const temp_urgente_max = document.getElementById("temp_urgente_max");

  const header = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idRecinto: sessionStorage.ID_RECINTO_INDIVIDUAL,
    }),
  };

  fetch("http://localhost:3333/recinto/pegarMetricasTemperatura", header)
    .then(respostaTemp => {
      if (respostaTemp.ok) {
        respostaTemp.json().then(metricasTemp => {

          console.log(metricasTemp)

          temp_urgente_min.innerHTML = `Menos de ${metricasTemp[0].min_atencao}ºC`
          temp_cuidado_min.innerHTML = `${metricasTemp[0].min_atencao}ºC`
          temp_boa.innerHTML = `${metricasTemp[0].min_ok}ºC - ${metricasTemp[0].max_ok}ºC`
          temp_cuidado_max.innerHTML = `${metricasTemp[0].max_atencao}ºC`
          temp_urgente_max.innerHTML = `Mais de ${metricasTemp[0].max_atencao}ºC`
        })
      }
    })
}

function pegarMetricasUmidade() {

  const umi_urgente_min = document.getElementById("umi_urgente_min");
  const umi_cuidado_min = document.getElementById("umi_cuidado_min");
  const umi_boa = document.getElementById("umi_boa");
  const umi_cuidado_max = document.getElementById("umi_cuidado_max");
  const umi_urgente_max = document.getElementById("umi_urgente_max");

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
    .then(respostaUmi => {
      if (respostaUmi.ok) {
        respostaUmi.json().then(metricasUmi => {

          console.log(`Métricas umi:`)
          console.log(metricasUmi)

          umi_urgente_min.innerHTML = `Menos de ${metricasUmi[0].min_atencao}%`
          umi_cuidado_min.innerHTML = `${metricasUmi[0].min_atencao}%`
          umi_boa.innerHTML = `${metricasUmi[0].min_ok}% - ${metricasUmi[0].max_ok}%`
          umi_cuidado_max.innerHTML = `${metricasUmi[0].max_atencao}%`
          umi_urgente_max.innerHTML = `Mais de ${metricasUmi[0].max_atencao}%`
        })
      }
    })
}

function atualizarStatusCaptura() {

  let status = 0;
  let mensagem = "";
  let temp = "";
  let umid = "";

  var corpo = {
    idRecinto: sessionStorage.getItem("ID_RECINTO_INDIVIDUAL"),
  };

  fetch("/recinto/atualizarStatusCaptura", {
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
      console.log(dados);

      let alertaTemp = document.getElementById("alertaTemp")
      let alertaUmid = document.getElementById("alertaUmid")

      console.log("minOkTemp" + dados[0].minOkTemp)
      console.log("maxOkTemp" + dados[0].maxOkTemp)
      console.log("minAtencaoTemp" + dados[0].minAtencaoTemp)
      console.log("maxAtencaoTemp" + dados[0].maxAtencaoTemp)
      console.log("minEmergenciaTemp" + dados[0].minEmergenciaTemp)
      console.log("maxEmergenciaTemp" + dados[0].maxEmergenciaTemp)

      let idCaptura = dados[0].idCaptura;

      if (
        (dados[0].temperatura >= dados[0].minOkTemp && dados[0].temperatura <= dados[0].maxOkTemp)
        &&
        (dados[0].umidade >= dados[0].minOkUmid && dados[0].umidade <= dados[0].maxOkUmid)
      ) {
        status = 0;
        temp = "estável";
        umid = "estável";
        alertaTemp.src = "../assets/icons/certoVerde.png"
        alertaUmid.src = "../assets/icons/certoVerde.png"
      } else {

        if ((dados[0].temperatura >= dados[0].minOkTemp && dados[0].temperatura <= dados[0].maxOkTemp)) {
          temp = "estável";
          alertaTemp.src = "../assets/icons/certoVerde.png";
        } else if (dados[0].temperatura >= dados[0].minAtencaoTemp && dados[0].temperatura <= dados[0].maxAtencaoTemp) {
          temp = "em nível de atenção"
          status = 1;
          alertaTemp.src = "../assets/icons/alertaAmarelo.png"
        } else {
          temp = "em nível de urgência"
          status = 2
          alertaTemp.src = "../assets/icons/alertaVermelho.png"
        }

        if ((dados[0].umidade >= dados[0].minOkUmid && dados[0].umidade <= dados[0].maxOkUmid)) {
          umid = "estável";
          alertaUmid.src = "../assets/icons/certoVerde.png";
        } else if (dados[0].umidade >= dados[0].minAtencaoUmid && dados[0].umidade <= dados[0].maxAtencaoUmid) {
          umid = "em nível de atenção"
          alertaUmid.src = "../assets/icons/alertaAmarelo.png"

          if (status < 1) {
            status = 1;
          }
        }
        else {
          umid = "em nível de urgência"
          alertaUmid.src = "../assets/icons/alertaVermelho.png"
          status = 2;
        }

        mensagem = `Atenção! há um problema no recinto ${dados[0].idRecinto} - ${dados[0].nome_recinto}.
          A temperatura está ${temp} e a umidade está ${umid}.
        `;

      }
      var corpo2 = {
        statusServer: status,
        idCapturaServer: idCaptura,
        mensagemServer: mensagem
      };

      fetch("/recinto/realizarUpdateTabelaCaptura", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(corpo2),
      }).then(function (resposta) {
        if (resposta.ok) {
          return resposta.json();
        } else {
          return resposta.text().then((msg) => {
            throw new Error(msg);
          });
        }
      })
    })
    .catch(function (erro) {
      console.error("Erro ao atualizar status da captura:", erro.message);
    });
};

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

function botaoHistorico() {
  sessionStorage.setItem("Abrir_Botao_Historico", "false");
}

function abrirHistorico() {
  sessionStorage.Abrir_Botao_Historico = "true";

  const header = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idRecinto: sessionStorage.ID_RECINTO_INDIVIDUAL,
    }),
  };

  fetch("http://localhost:3333/recinto/abrirHistorico", header)
    .then((resultado) => {
      if (resultado.ok) {
        resultado.json().then((alerta) => {
          let alertasRecinto = [];
          alerta.forEach((alertaMensagemIndividual) => {
            let temperatura = alertaMensagemIndividual.temperatura;
            let umidade = alertaMensagemIndividual.umidade;
            let alertaMensagem = alertaMensagemIndividual.mensagem;
            let dtHoraCaptura = alertaMensagemIndividual.dt_Hr_Captura;

            let alertaRecintoInformacoes = {
              temperatura,
              umidade,
              alertaMensagem,
              dtHoraCaptura,
            };

            alertasRecinto.push(alertaRecintoInformacoes);
          });

          const alertasRecintoSession = JSON.stringify(alertasRecinto);
          sessionStorage.setItem(
            "Alertas_Recinto_Individual",
            alertasRecintoSession
          );
        });
      }
    })
    .catch((error) => {
      console.log("Erro: não foi possível pegar os alertas do recinto", error);
    });

  window.location.href = "../../dashboard/dashboard-alertas.html";
}

document.addEventListener("DOMContentLoaded", pegarCapturasTemperatura);
document.addEventListener("DOMContentLoaded", pegarCapturasUmidade);
document.addEventListener("DOMContentLoaded", pegarTotalSensoresPorRecinto);
document.addEventListener("DOMContentLoaded", pegarMaximoTemperatura);
document.addEventListener("DOMContentLoaded", pegarMaximoUmidade);
document.addEventListener("DOMContentLoaded", alertas);
document.addEventListener("DOMContentLoaded", pegarMetricasTemperatura);
document.addEventListener("DOMContentLoaded", pegarMetricasUmidade);
document.addEventListener("DOMContentLoaded", atualizarStatusCaptura);
document.addEventListener("DOMContentLoaded", botaoHistorico);
botaoHistorico.addEventListener("click", filtro);
botaoFiltrar.addEventListener("click", filtro);
filterHistorico.addEventListener("click", abrirHistorico);