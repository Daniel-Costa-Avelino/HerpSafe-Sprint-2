// Validação de e-mail: deve ter ".com" e "@"
// Senha deve ter pelo menos: 1 caractere minúsculo, 1 caractere maiúsculo, 1 número e mínimo de 8 caracteres;
// CNPJ deve ter 14 dígitos e "000x" - talvez a "/"? - e se for filial acima de 0009?

var nomeCadastro = "";
var emailCadastro = "";
var senhaCadastro = "";
var cnpjCadastro = "";


function cadastro() {

    var alertaCadastro = "Os campos abaixo não foram preenchidos ou estão incorretos:\n\n";
    var erro = 0;

    nomeCadastro = input_nomeCadastro.value;
    emailCadastro = input_emailCadastro.value;
    senhaCadastro = input_senhaCadastro.value;
    cnpjCadastro = input_cnpjCadastro.value;

    console.log(nomeCadastro, emailCadastro, senhaCadastro, cnpjCadastro)

    if (nomeCadastro == "" || nomeCadastro.length <= 3 || nomeCadastro.indexOf(" ") == -1) { //validação nome

        alertaCadastro += `- Nome - Deve conter nome e sobrenome\n`;
        nomeCadastro = "";
        input_nomeCadastro.innerHTML = "";
        erro += 1;
    } 
    
    if (emailCadastro == "" || emailCadastro.indexOf("@") == -1 || emailCadastro.indexOf(".com") == -1) { // validação email

        alertaCadastro += `- Email - Deve estar no formato correto\n`;
        emailCadastro = "";
        input_emailCadastro.innerHTML = "";
        erro += 1;
    } 
    
    if (senhaCadastro == "" || senhaCadastro == nomeCadastro.toLowerCase || senhaCadastro == nomeCadastro.toUpperCase || senhaCadastro.length < 8) { // validação senha

        alertaCadastro += `- Senha - Deve ter pelo menos 8 dígitos, 1 letra minúscula e 1 letra maiúscula \n`;
        senhaCadastro = "";
        input_senhaCadastro.innerHTML = "";
        erro += 1;
    } 
    
    if (cnpjCadastro == "" || cnpjCadastro.length != 14) { //validação CNPJ

        alertaCadastro += `- CNPJ - Deve ter 14 dígitos`;
        cnpjCadastro = "";
        input_cnpjCadastro.innerHTML = "";
        erro += 1;

    } 
    
    if (erro == 0) {
    
        alertaCadastro = `Usuário criado com sucesso!`
        sessionStorage.setItem('email',emailCadastro);
        sessionStorage.setItem('senha',senhaCadastro);

    } else {

        alertaCadastro = alertaCadastro;

    }
    
    alert(alertaCadastro);

}

function login() {

    var email = "";
    var senha = "";
    var alertaLogin = "";

    emailCadastro = sessionStorage.getItem('email');
    senhaCadastro = sessionStorage.getItem('senha');

    email = input_emailLogin.value;
    senha = input_senhaLogin.value;

    if (email != emailCadastro || senha != senhaCadastro) {

        alertaLogin = `Credenciais de acesso inválidas` //Credenciais incorretas

    } else {

        alertaLogin = `Login confirmado com sucesso!`

    }

    alert(alertaLogin);

}