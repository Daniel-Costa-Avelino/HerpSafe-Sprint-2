function cadastrar() {
    var nome_cadastro = document.getElementById("input_nomeCadastro").value;
    var fkPrateleira = document.getElementById("input_fkPrateleira").value;
    var idEmpresa = sessionStorage.ID_EMPRESA;
    var header = {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: 
            JSON.stringify({
                idPrateleira: fkPrateleira,
                nome_cadastro: nome_cadastro,
                id_empresa: idEmpresa
            }),
            
    }
    fetch("/prateleiras/cadastrar",header)
    .then(response => {
        if(response.ok) {
            return response.json();
        }
        else {
            throw new Error("Erro");
        }

})

    .catch(error => {
        console.error("Erro na requisição:", error);
    });
}