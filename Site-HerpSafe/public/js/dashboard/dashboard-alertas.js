const { head } = require("../../../src/routes");

const nomeUsuario = document.getElementById("nome_usuario_alerta");
[];
nomeUsuario.innerHTML = sessionStorage.NOME_USUARIO;

if (sessionStorage.Alertas_Recinto_Individual == undefined) {
  sessionStorage.setItem("Alertas_Recinto_Individual", false);
} else {
  const botaoHistorico = JSON.parse(sessionStorage.Alertas_Recinto_Individual);
  const botaoAberto = sessionStorage.Abrir_Botao_Historico;

  if (botaoAberto == "true") {
    const section_alertas = document.querySelector(".principal-alertas-scroll");

    for (let i = 0; i < botaoHistorico.length; i++) {
      section_alertas.innerHTML += `
                <div class="principal-alertas-scroll-container">
                        <div class="principal-alertas-scroll-data">
                            <img src="../assets/icons/icon-data.svg" alt="Icon Data">
                            <p>${botaoHistorico[i].dtHoraCaptura.substring(
                              0,
                              10
                            )}</p>
                        </div>
                        <div class="alertas-recinto-texto">
                            <img src="../assets/icons/icon-status-recinto-vermelho.svg" alt="Status Recinto">
                            <div>
                                <h1>Alerta Urgente:</h1>
                                <p>Temperatura: ${
                                  botaoHistorico[i].temperatura
                                } graus <br>
                                   Umidade: ${botaoHistorico[i].umidade}% <br> 
                                   <span style="color: #AB3030;"></span>
                                   Mensagem:
                                ${botaoHistorico[i].alertaMensagem}
                                </p>
                            </div>
                        </div>
                    </div>
                `;
    }
  } else {
    document.addEventListener("DOMContentLoaded", function () {
      var corpo = {
        fkEmpresaServer: sessionStorage.getItem("ID_EMPRESA"),
      };

      fetch("/alertas/buscarAlertas", {
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
          sessionStorage.ALERTAS = JSON.stringify(dados);

          const section_alertas = document.querySelector(
            ".principal-alertas-scroll"
          );

          for (var i = 0; i < dados.length; i++) {
            let data = new Date(dados[i].dt_Hr_Captura);
            let dataFormatada = data.toLocaleDateString("pt-BR");
            let tipoCaptura = "";
            let captura = "";

            if (dados[i].mensagem.includes(`Umidade`)) {
              tipoCaptura = "Umidade";
              captura = `${dados[i].umidade}%`;
            } else {
              tipoCaptura = "Temperatura";
              captura = `${dados[i].temperatura}° graus`;
            }

            section_alertas.innerHTML += `
                <div class="principal-alertas-scroll-container">
                        <div class="principal-alertas-scroll-data">
                            <img src="../assets/icons/icon-data.svg" alt="Icon Data">
                            <p>${dataFormatada}</p>
                        </div>
                        <div class="alertas-recinto-texto">
                            <img src="../assets/icons/icon-status-recinto-vermelho.svg" alt="Status Recinto">
                            <div>
                                <h1>${dados[i].nome_recinto}:</h1>
                                <p>${tipoCaptura} em <span style="color: #AB3030;">${captura}</span> - 
                                ${dados[i].mensagem}
                                </p>
                            </div>
                        </div>
                    </div>
                `;
          }
        })
        .catch(() => {
          const section_alertas = document.querySelector(
            ".principal-alertas-scroll"
          );

          section_alertas.innerHTML = `<p>Sem alertas no momento!</p>`;
        });
    });
  }
}

function filtro() {
  const nome_recinto = input_nome_recinto.value;
  const data = input_data.value;
  const tipo_alerta = select_tipo_alerta.value;

  if (nome_recinto != "" && data != "" && tipo_alerta != "") {
    const header = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nomeRecinto: nome_recinto,
        data: data,
        tipoAlerta: tipo_alerta,
      }),
    };
    fetch("http://localhost:3333/alertas/filtrarAlertas", header)
      .then((result) => {
        if (result.ok) {
          result.json().then((dadosFiltrados) => {
            console.log(dadosFiltrados);
          });
        }
      })
      .catch((error) => {
        console.log(
          "Erro: não foi possível filtrar os dados dos alertas",
          error
        );
      });
  } else {
    alert(`Preencha todos os campos para prosseguir`);
  }
}

function setarStatusFalso() {
  sessionStorage.Abrir_Botao_Historico = "false";
}
window.addEventListener("beforeunload", setarStatusFalso);
