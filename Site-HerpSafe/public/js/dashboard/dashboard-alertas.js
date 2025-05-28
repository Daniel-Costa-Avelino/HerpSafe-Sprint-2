document.addEventListener('DOMContentLoaded', function () {

    var corpo = {
        fkEmpresaServer: sessionStorage.getItem("ID_EMPRESA")
    };

    fetch("/alertas/buscarAlertas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(corpo)
    })
        .then(function (resposta) {
            if (resposta.ok) {
                return resposta.json();
            } else {
                return resposta.text().then(msg => {
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
                var data = new Date(dados[i].dt_Hr_Alerta);
                var dataFormatada = data.toLocaleDateString('pt-BR');
                var tipoCaptura = ''
                var captura = '';

                if (dados[i].tipo == 'DHT11') {
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
                                <p>${dados[i].tipo}: ${tipoCaptura} em <span style="color: #AB3030;">${captura}</span>
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