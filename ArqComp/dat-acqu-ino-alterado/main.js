// Importar bibliotecas para fazer a conexão com o banco de dados, o
// arduino e a interface como constantes
const serialport = require("serialport");
const express = require("express");
const mysql = require("mysql2");

// Constantes para conexão e transmissão de dados
const SERIAL_BAUD_RATE = 9600;
const SERVIDOR_PORTA = 3300;

// habilita ou desabilita a inserção de dados no banco de dados (Deve
// ficar desbilitado até termos o banco de dados)
const HABILITAR_OPERACAO_INSERIR = true;

// função para comunicação serial, que busca funções criadas mais pra
// frente no código
const serial = async (
    valoresSensorAnalogico,
    valoresSensorDigital,
) => {

    // conexão com o banco de dados MySQL, sendo o principal a porta 
    // correta do banco (Ainda não funciona devido a não ter o Banco de dados)
    let poolBancoDados = mysql.createPool(
        {
            host: 'localhost', //Colocar o nome do host (Conexão) do banco de dados
            user: 'dadosaqui', //Colocar o usuário do banco de dados
            password: 'dadosaqui', //Colocar a senha (Caso tenha) 
            database: 'dadosaqui', //Dizer qual é o banco de dados
            port: 3306 //Porta do seu banco de dados
        }
    ).promise();

    // lista as portas seriais disponíveis e procura pelo Arduino
    const portas = await serialport.SerialPort.list();
    const portaArduino = portas.find((porta) => porta.vendorId == 2341 && porta.productId == 43);
    if (!portaArduino) {
        throw new Error('O arduino não foi encontrado em nenhuma porta serial');
    }

    // configura a porta serial com o baud rate especificado
    // E o atribuindo a constante arduino
    const arduino = new serialport.SerialPort(
        {
            path: portaArduino.path,
            baudRate: SERIAL_BAUD_RATE
        }
    );

    // evento quando a porta serial é aberta
    // E mostra no console a porta e o baud rate
    arduino.on('open', () => {
        console.log(`A leitura do arduino foi iniciada na porta ${portaArduino.path} utilizando Baud Rate de ${SERIAL_BAUD_RATE}`);
    });

    // processa os dados recebidos do Arduino
    // Separando os dois dados por um ;
    arduino.pipe(new serialport.ReadlineParser({ delimiter: '\r\n' })).on('data', async (data) => {
        console.log(data);
        const valores = data.split(';');
        const sensorDigital = parseInt(valores[0]);
        const sensorAnalogico = parseFloat(valores[1]);

        // armazena os valores dos sensores nos arrays correspondentes
        // E faz a ação de envia-lor para o terminal
        valoresSensorAnalogico.push(sensorAnalogico);
        valoresSensorDigital.push(sensorDigital);

        // insere os dados no banco de dados (se habilitado)
        // Dizendo que SE a constante abaixo for verdadeira (true) irá executar a ação abaixo
        if (HABILITAR_OPERACAO_INSERIR) {

            // este insert irá inserir os dados na tabela "medida"
            // É um código de mysql para insersão de dados
            await poolBancoDados.execute(
                `INSERT INTO captura (temperatura, umidade, fkSensor) VALUES (?, ?, ?)`,
                [sensorAnalogico, sensorDigital, 1]
            );
            // Dizendo o que vai mostrar no console caso os valores sejam inseridos
            console.log("valores inseridos no banco: ", sensorDigital + ", " + sensorAnalogico + " 2 ");
        }

    });

    // evento para lidar com erros na comunicação serial
    // Mensagem vai aparecer no console
    arduino.on('error', (mensagem) => {
        console.error(`Erro no arduino (Mensagem: ${mensagem}`)
    });
}

// função para criar e configurar o servidor web
const servidor = (valoresSensorAnalogico, valoresSensorDigital) => {
  const app = express();

  // configurações de requisição e resposta
  app.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  // inicia o servidor na porta especificada
  // Definida na variável anetrior SERVIDOR_PORTA
  app.listen(SERVIDOR_PORTA, () => {
    console.log(`API executada com sucesso na porta ${SERVIDOR_PORTA}`);
  });

  // define os endpoints da API para cada tipo de sensor
  app.get("/sensores/analogico", (_, response) => {
    return response.json(valoresSensorAnalogico);
  });
  app.get("/sensores/digital", (_, response) => {
    return response.json(valoresSensorDigital);
  });
};

// função principal assíncrona para iniciar a comunicação serial e o servidor web
// É "puxada" lá na parte de cima do código
(async () => {
  // arrays para armazenar os valores dos sensores
  const valoresSensorAnalogico = [];
  const valoresSensorDigital = [];

  // inicia a comunicação serial
  await serial(valoresSensorAnalogico, valoresSensorDigital);

  // inicia o servidor web
  servidor(valoresSensorAnalogico, valoresSensorDigital);
})();
