const nomeUsuario = document.getElementById("nome_usuario_alerta");

nomeUsuario.innerHTML = sessionStorage.NOME_USUARIO;

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
      for (let i = 0; i < dados.length; i++) {
        console.log(dados[i]);
      }

      console.log("Alertas:", dados);

      sessionStorage.ALERTAS = JSON.stringify(dados);

      var section_alertas = document.querySelector(".principal-alertas-scroll");

      for (var i = 0; i < dados.length; i++) {
        var data = new Date(dados[i].dt_Hr_Captura);
        var dataFormatada = data.toLocaleDateString("pt-BR");
        var tipoCaptura = "";
        var captura = "";

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
    .catch(function (erro) {
      console.error("Erro ao tentar login:", erro.message);
      //document.getElementById("p_mensagem").innerText = "Erro: " + erro.message;
    });
});

function filtro() {
  var nome_recinto = input_nome_recinto.value;
  var data = input_data.value;
  var tipo_alerta = select_tipo_alerta.value;

  if (nome_recinto != "" || data != "" || tipo_alerta != "") {
    if (nome_recinto != "") {
    }
  } else {
    alert(`Preencha pelo menos um dos campos para prosseguir`);
  }
}
