    function login(){
    var email = document.getElementById("input_emailLogin").value;
    var senha = document.getElementById("input_senhaLogin").value;
    var codigo = document.getElementById("input_codigoLogin").value;

    }

    if (email == "" || senha == "" || codigo == ""){
        alert(`Preencha todos os campos para continuar.`); 
        return;
    }

    var corpo = {
        emailServer: email,
        senhaServer: senha,
        codigoServer: codigo
    };

        fetch("/usuarios/autenticar", {
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
        alert("Login realizado com sucesso!");
        console.log("Usuário logado:", dados);

        window.location.href = "dashboard.html";
    })
    .catch(function (erro) {
        console.error("Erro ao tentar login:", erro.message);
        document.getElementById("p_mensagem").innerText = "Erro: " + erro.message;
    });
