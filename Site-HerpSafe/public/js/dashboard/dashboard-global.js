const botaoSair = document.getElementById("sair_conta");

function logout() {
    sessionStorage.removeItem("Abrir_Botao_Historico");
    sessionStorage.removeItem("Alertas_Recinto_Individual");
    sessionStorage.removeItem("EMAIL_USUARIO");
    sessionStorage.removeItem("ID_EMPRESA");
    sessionStorage.removeItem("ID_RECINTO_INDIVIDUAL");

    sessionStorage.removeItem("NOME_USUARIO");
    sessionStorage.removeItem("PRATELEIRAS");
    sessionStorage.removeItem("RECINTOS");

    sessionStorage.removeItem("RECINTOS_COM_PROBLEMAS");
    sessionStorage.removeItem("RECINTOS_QTD");
    sessionStorage.removeItem("RECINTOS_TODOS_INFOS");
    sessionStorage.removeItem("SENSORES");
}

botaoSair.addEventListener("click", logout)