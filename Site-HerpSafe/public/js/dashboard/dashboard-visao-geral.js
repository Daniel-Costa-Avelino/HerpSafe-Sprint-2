function button1() {
    const listarRecintos = document.querySelector(".expandir-recintos");

    listarRecintos.classList.toggle("ativo");
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
                     <div class="Pratileira1">
                                 <button class="button-pratileira1" onclick="button1()">${dados[i].nome}</button>
                                 <div class="expandir-recintos">
                                     <div class="box-recinto">
                                         <div class="recinto1-box">
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
                                         <!-- Box 2-->
                                         <div class="recinto1-box">
                                             <p class="titulo-box-recinto">Recinto 2</p class="titulo-box-recinto">
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
