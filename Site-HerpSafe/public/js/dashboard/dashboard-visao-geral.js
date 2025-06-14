const nomeUsuario = document.getElementById("nome_usuario");

nomeUsuario.innerHTML = sessionStorage.NOME_USUARIO;

function button1(btn) {
  const div_prateleira = btn.parentElement;
  const id = div_prateleira.getAttribute("value");

  const div_box_recinto = document.querySelector(".box-recinto");
  div_box_recinto.innerHTML = "";

  const listarRecintos = document.querySelector(".expandir-recintos");
  listarRecintos.classList.toggle("ativo");

  const corpo = {
    fkPrateleiraServer: id,
  };

  fetch("/recinto/buscarRecintosPorPrateleira", {
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
      sessionStorage.RECINTOS_QTD = dados.length;
      sessionStorage.RECINTOS_TODOS_INFOS = JSON.stringify(dados);
      var dadosRecintos = dados;

      for (let i = 0; i < dados.length; i++) {

        div_box_recinto.innerHTML += `
             <div class="recinto1-box" value = "${dados[i].idRecinto}" onclick = guardarIdRecinto(this)>
                                         <p class="titulo-box-recinto">${dados[i].nome_recinto}</p class="titulo-box-recinto">
                                         <div class="temp-umidade">
                                             <div class="temperatura-recinto1">
                                                 <p>Temperatura</p>
                                                 <img src="" alt="Temperatura">
                                             </div>
                                             <div class="umidade-recinto1">
                                                 <p>Umidade</p>
                                                 <img src="" alt="Umidade">
                                             </div>
                                         </div>
                                     </div>                        
        `;

      }
      buscarRecintosPorPrateleira_captura(id, dadosRecintos);
    })
    .catch(function (erro) {
      console.error("Erro ao tentar login:", erro.message);
      div_box_recinto.innerHTML = "<h1>Sem recintos cadastrados!</h1>";
    });
}

function buscarRecintosPorPrateleira_captura(fkPrateleira, dados) {
  var recintos = sessionStorage.RECINTOS_QTD;
  var recintos_infos = [];
  console.log(dados);

  for (let i = 0; i < recintos; i++) {
    recintos_infos.push(dados[i])

    const corpo2 = {
      fkPrateleiraServer: fkPrateleira,
      idRecintoServer: recintos_infos[i].idRecinto
    };

    fetch("/recinto/buscarRecintosPorPrateleira_captura", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(corpo2),
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
        var imgTemp;
        var imgUmid;

        if ((dados[i].mensagem).includes("A temperatura está estável")) {
          imgTemp = '../assets/dashboard/temperatura-ok.svg';
        } else if ((dados[i].mensagem).includes("A temperatura está em nível de atenção")) {
          imgTemp = '../assets/dashboard/temperatura-atencao.svg';
        } else {
          imgTemp = '../assets/dashboard/temperatura-urgencia.svg';
        }

        if ((dados[i].mensagem).includes("a umidade está estável")) {
          imgUmid = '../assets/dashboard/umidade-ok.svg';
        } else if ((dados[i].mensagem).includes("a umidade está em nível de atenção")) {
          imgUmid = '../assets/dashboard/umidade-atencao.svg';
        } else {
          imgUmid = '../assets/dashboard/umidade-urgencia.svg';
        }

        var div_infos_temperatura = document.querySelector(".temperatura-recinto1");
        var div_infos_umidade = document.querySelector(".umidade-recinto1");

        div_infos_temperatura.innerHTML = `
        <p>Temperatura</p>
        <img src="${imgTemp}" alt="Temperatura">
        `;

        div_infos_umidade.innerHTML = `
        <p>Umidade</p>
        <img src="${imgUmid}" alt="Umidade">
        `;

      })
      .catch(function (erro) {
        console.error("Erro ao buscar recintos por prateleira", erro.message);
        //div_box_recinto.innerHTML = "<h1>Sem recintos cadastrados!</h1>";
      });
  }
}


function guardarIdRecinto(div) {
  var valor_div = div.getAttribute("value");
  console.log(div);

  sessionStorage.ID_RECINTO_INDIVIDUAL = valor_div;

  window.location.href = "../../dashboard/dashboard-detalhamento.html";
}

document.addEventListener("DOMContentLoaded", function () {
  var corpo = {
    fkEmpresaServer: sessionStorage.getItem("ID_EMPRESA"),
  };

  fetch("/prateleiras/buscarPrateleirasPorEmpresa", {
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
      sessionStorage.PRATELEIRAS = JSON.stringify(dados);

      var div_prateleiras = document.querySelector(".Pratileiras");

      for (let i = 0; i < dados.length; i++) {

        if (dados[i].status_prateleira == 0) {
          div_prateleiras.innerHTML += `
          <div class="Pratileira1" value = ${dados[i].idPrateleira}>
                                 <button style = "background-color: green;"class="button-pratileira1" onclick="button1(this)">${dados[i].nome}</button>
                                 <div class="expandir-recintos">
                                  <div class="box-recinto">
                                  </div>
                                 </div>
                    </div >
          `;
        } else if (dados[i].status_prateleira == 1) {
          div_prateleiras.innerHTML += `
          <div class="Pratileira1" value = ${dados[i].idPrateleira}>
                                 <button style = "background-color: yellow;"class="button-pratileira1" onclick="button1(this)">${dados[i].nome}</button>
                                 <div class="expandir-recintos">
                                  <div class="box-recinto">
                                  </div>
                                 </div>
                    </div >
          `;
        } else if (dados[i].status_prateleira == 2) {
          div_prateleiras.innerHTML += `
          <div class="Pratileira1" value = ${dados[i].idPrateleira}>
                                 <button style = "background-color: red;"class="button-pratileira1" onclick="button1(this)">${dados[i].nome}</button>
                                 <div class="expandir-recintos">
                                  <div class="box-recinto">
                                  </div>
                                 </div>
                    </div >
          `;
        }
      }
    })
    .catch(function (erro) {
      console.error("Erro ao tentar login:", erro.message);
      //document.getElementById("p_mensagem").innerText = "Erro: " + erro.message;
    });
});

document.addEventListener("DOMContentLoaded", function () {
  var corpo = {
    fkEmpresaServer: sessionStorage.getItem("ID_EMPRESA"),
  };

  fetch("/indicadores/buscarRecintosMonitorados", {
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
      sessionStorage.RECINTOS = JSON.stringify(dados);

      var div_qtdRecintosMonitorados = document.getElementById(
        "div_qtdRecintosMonitorados"
      );
      div_qtdRecintosMonitorados.innerHTML = `${dados[0].qtdRecintosEmpresa} `;
    })
    .catch(function (erro) {
      console.error("Erro ao buscar recintos monitorados:", erro.message);
      //document.getElementById("p_mensagem").innerText = "Erro: " + erro.message;
    });
});

document.addEventListener("DOMContentLoaded", function () {
  var corpo = {
    fkEmpresaServer: sessionStorage.getItem("ID_EMPRESA"),
  };

  fetch("/indicadores/buscarSensoresAtivos", {
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
      sessionStorage.SENSORES = JSON.stringify(dados);

      var div_qtdSensoresAtivos = document.getElementById(
        "div_qtdSensoresAtivos"
      );
      div_qtdSensoresAtivos.innerHTML = `${dados[0].qtdSensoresAtivos} `;
    })
    .catch(function (erro) {
      console.error("Erro ao buscar sensores ativos:", erro.message);
      //document.getElementById("p_mensagem").innerText = "Erro: " + erro.message;
    });
});

document.addEventListener("DOMContentLoaded", function () {
  var corpo = {
    fkEmpresaServer: sessionStorage.getItem("ID_EMPRESA"),
  };

  fetch("/indicadores/buscarAlertas", {
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
      sessionStorage.ALERTAS_ULTIMAS_24_HORAS = JSON.stringify(dados);

      var div_qtdAlertas_ultimas_24_horas =
        document.getElementById("div_qtdAlertas");
      div_qtdAlertas_ultimas_24_horas.innerHTML = `${dados[0].total_alertas_24h} `;
    })
    .catch(function (erro) {
      console.error("Erro ao buscar alertas:", erro.message);
      //document.getElementById("p_mensagem").innerText = "Erro: " + erro.message;
    });
});

document.addEventListener("DOMContentLoaded", function () {
  var corpo = {
    fkEmpresaServer: sessionStorage.getItem("ID_EMPRESA"),
  };

  fetch("/indicadores/buscarRecintosComProblemas", {
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
      sessionStorage.RECINTOS_COM_PROBLEMAS = JSON.stringify(dados);

      var recintos_com_problemas = document.getElementById(
        "div_qtdRecintosComProblemas"
      );
      recintos_com_problemas.innerHTML = `${dados[0].recintos_com_problemas} `;
    })
    .catch(function (erro) {
      console.error("Erro ao buscar recintos com problema:", erro.message);
      //document.getElementById("p_mensagem").innerText = "Erro: " + erro.message;
    });
});

document.addEventListener("DOMContentLoaded", function () {
  var corpo = {
    fkEmpresaServer: sessionStorage.getItem("ID_EMPRESA"),
  };

  fetch("/prateleiras/buscarCapturasPorPrateleira_Empresa", {
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

      for (let i = 0; i < dados.length; i++) {
        var status = 0;
        var idCaptura = dados[i].idCaptura;
        var mensagem = '';
        var temp;
        var umid;

        console.log("minOkTemp" + dados[i].minOkTemp)
        console.log("maxOkTemp" + dados[i].maxOkTemp)
        console.log("minAtencaoTemp" + dados[i].minAtencaoTemp)
        console.log("maxAtencaoTemp" + dados[i].maxAtencaoTemp)
        console.log("minEmergenciaTemp" + dados[i].minEmergenciaTemp)
        console.log("maxEmergenciaTemp" + dados[i].maxEmergenciaTemp)

        if (
          (dados[i].temperatura >= dados[i].minOkTemp && dados[i].temperatura <= dados[i].maxOkTemp)
          &&
          (dados[i].umidade >= dados[i].minOkUmid && dados[i].umidade <= dados[i].maxOkUmid)
        ) {
          status = 0;
          temp = "estável";
          umid = "estável";
        } else {

          if ((dados[i].temperatura >= dados[i].minOkTemp && dados[i].temperatura <= dados[i].maxOkTemp)) {
            temp = "estável";
          } else if (dados[i].temperatura >= dados[i].minAtencaoTemp && dados[i].temperatura <= dados[i].maxAtencaoTemp) {
            temp = "em nível de atenção"
            status = 1;
          } else {
            temp = "em nível de urgência"
            status = 2
          }

          if ((dados[i].umidade >= dados[i].minOkUmid && dados[i].umidade <= dados[i].maxOkUmid)) {
            umid = "estável";
          } else if (dados[i].umidade >= dados[i].minAtencaoUmid && dados[i].umidade <= dados[i].maxAtencaoUmid) {
            umid = "em nível de atenção"

            if (status < 1) {
              status = 1;
            }
          }
          else {
            umid = "em nível de urgência"
            status = 2;
          }

          mensagem = `Atenção! há um problema no recinto ${dados[i].idRecinto} - ${dados[i].nome_recinto}.
          A temperatura está ${temp} e a umidade está ${umid}.
        `;

        }
        var corpo2 = {
          statusServer: status,
          idCapturaServer: idCaptura,
          mensagemServer: mensagem
        };

        fetch("/prateleiras/realizarUpdateTabelaCaptura", {
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

      }
    })
    .catch(function (erro) {
      console.error("Erro ao buscar recintos com problema:", erro.message);
    });
});
