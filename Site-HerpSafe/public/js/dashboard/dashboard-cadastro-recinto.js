function cadastrar() {
    var nome_cadastro = document.getElementById("input_nomeCadastro").value;
    var data_cadastro = document.getElementById("input_dataCadastro").value;
    var header = {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: 
            JSON.stringfy({
                nome_cadastro: nome_cadastro, data_cadastro: data_cadastro
            })
        
        
    }
    fetch("/recinto/cadastrar",header
    )
    .then()

    .catch()
}