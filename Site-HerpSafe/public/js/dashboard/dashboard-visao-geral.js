function button1(btn) {
    var div_prateleira = btn.parentElement;
    var id = div_prateleira.getAttribute('value');
    console.log(id);

    var corpo = {
        fkPrateleiraServer: id
    };

    fetch("/recinto/buscarRecintosPorPrateleira", {
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
                console.log(dados[i].nome_recinto);
            }

            console.log("Recintos:", dados);

            sessionStorage.RECINTOS_TODOS = JSON.stringify(dados);

            var div_box_recinto = document.querySelector(".box-recinto");
            div_box_recinto.innerHTML = ''

            for (let i = 0; i < dados.length; i++) {
                div_box_recinto.innerHTML += `
                                    <div class="recinto1-box" value = "${dados[i].idrecinto}" onclick = guardarIdRecinto(this)>
                                        <p class="titulo-box-recinto">${dados[i].nome_recinto}</p class="titulo-box-recinto">
                                        <div class="temp-umidade">
                                            <div class="temperatura-recinto1">
                                                <p>Temperatura</p>
                                                <img src="../assets/imgs/tempMedia.png" alt="Temperatura">
                                            </div>
                                            <div class="umidade-recinto1">
                                                <p>Umidade</p>
                                                <img src="../assets/imgs/UmiMedia.png" alt="Umidade">
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


    const listarRecintos = document.querySelector(".expandir-recintos");

    listarRecintos.classList.toggle("ativo");

}

function guardarIdRecinto(div) {
    var valor_div = div.getAttribute('value');
    console.log(valor_div);

    sessionStorage.ID_RECINTO_INDIVIDUAL = valor_div;

    window.location.href = "../../dashboard/dashboard-detalhamento.html";
}

document.addEventListener('DOMContentLoaded', function () {

    var corpo = {
        fkEmpresaServer: sessionStorage.getItem("ID_EMPRESA")
    };

    fetch("/prateleiras/buscarPrateleirasPorEmpresa", {
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
                console.log(dados[i].nome);
            }

            console.log("Prateleiras:", dados);
            //sessionStorage.ID_EMPRESA = dados.fkEmpresa;

            sessionStorage.PRATELEIRAS = JSON.stringify(dados);

            var div_prateleiras = document.querySelector(".Pratileiras");

            for (let i = 0; i < dados.length; i++) {
                div_prateleiras.innerHTML += `
                     <div class="Pratileira1" value = ${dados[i].idPrateleira}>
                                 <button class="button-pratileira1" onclick="button1(this)">${dados[i].nome}</button>
                                 <div class="expandir-recintos">
                                 <div class="box-recinto">
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


document.addEventListener('DOMContentLoaded', function () {

    var corpo = {
        fkEmpresaServer: sessionStorage.getItem("ID_EMPRESA")
    };

    fetch("/indicadores/buscarRecintosMonitorados", {
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

            console.log("Recintos:", dados);

            sessionStorage.RECINTOS = JSON.stringify(dados);

            var div_qtdRecintosMonitorados = document.getElementById("div_qtdRecintosMonitorados");
            div_qtdRecintosMonitorados.innerHTML = `${dados[0].qtdRecintosEmpresa}`;


        })
        .catch(function (erro) {
            console.error("Erro ao tentar login:", erro.message);
            //document.getElementById("p_mensagem").innerText = "Erro: " + erro.message;
        });


});


document.addEventListener('DOMContentLoaded', function () {

    var corpo = {
        fkEmpresaServer: sessionStorage.getItem("ID_EMPRESA")
    };

    fetch("/indicadores/buscarSensoresAtivos", {
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

            console.log("Sensores ativos:", dados);

            sessionStorage.SENSORES = JSON.stringify(dados);

            var div_qtdSensoresAtivos = document.getElementById("div_qtdSensoresAtivos");
            div_qtdSensoresAtivos.innerHTML = `${dados[0].qtdSensoresAtivos}`;


        })
        .catch(function (erro) {
            console.error("Erro ao tentar login:", erro.message);
            //document.getElementById("p_mensagem").innerText = "Erro: " + erro.message;
        });
});


document.addEventListener('DOMContentLoaded', function () {

    var corpo = {
        fkEmpresaServer: sessionStorage.getItem("ID_EMPRESA")
    };

    fetch("/indicadores/buscarAlertas", {
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

            console.log("Alertas nas últimas 24 horas:", dados);

            sessionStorage.ALERTAS_ULTIMAS_24_HORAS = JSON.stringify(dados);

            var div_qtdAlertas_ultimas_24_horas = document.getElementById("div_qtdAlertas");
            div_qtdAlertas_ultimas_24_horas.innerHTML = `${dados[0].total_alertas_24h}`;


        })
        .catch(function (erro) {
            console.error("Erro ao tentar login:", erro.message);
            //document.getElementById("p_mensagem").innerText = "Erro: " + erro.message;
        });


});
