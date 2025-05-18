// Validação de e-mail: deve ter ".com" e "@"
// Senha deve ter pelo menos: 1 caractere minúsculo, 1 caractere maiúsculo, 1 número e mínimo de 8 caracteres;
// CNPJ deve ter 14 dígitos e "000x" - talvez a "/"? - e se for filial acima de 0009?

function cadastro(){
    var nome = document.getElementById('input_nomeCadastro').value;
    var cpf = document.getElementById("input_cpf").value;
    var email = document.getElementById("input_emailCadastro").value;
    var senha = document.getElementById("input_senhaCadastro").value;
    var confirmarsenha = document.getElementById("input_confirmarsenhaCadastro").value;
    var codigo = document.getElementById("input_codigo").value;
}

if (nome == '' || cpf == '' || email == '' || senha == '' || codigo == ''){
    alert (`Prencha todos os campos.`);
    return
}

if (senha !== confirmarsenhasenha){
    alert (`As senhas não coincidem.`);
    return
}

//Requisições 
var corpo = {
    nomeServer: nome,
    cpfServer: cpf,
    emailServer: email,
    senhaServer: senha, 
    codigoServer:codigo
};

fetch("/usuarios/cadastrar", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
        body: JSON.stringify(corpo)
    }).then(function (resposta) {
        if (resposta.ok) {
            alert("Cadastro realizado com sucesso!");
            window.location.href = "login.html";
        } else {
            resposta.text().then(msg => {
                alert("Erro ao cadastrar: " + msg);
            });
        }
    }).catch(function (erro) {
        console.error("Erro na requisição:", erro);
    });

