CREATE DATABASE sprint1_HerbSafe;

USE sprint1_HerbSafe;

CREATE TABLE funcionario(
idFuncionario INT PRIMARY KEY AUTO_INCREMENT,
nomeFuncionario VARCHAR(50),
cpfFuncionario CHAR(14) UNIQUE,
emailFuncionario VARCHAR(60) UNIQUE,
idEmpresa INT,
senha VARCHAR(10) UNIQUE,
cargoFuncionario VARCHAR(20)
CONSTRAINT chkCargo CHECK(cargoFuncionario IN('Gerente', 'Analista', 'Assistente', 'Supervisor'))
);

INSERT INTO funcionario VALUES
(default, 'João Silva', '123.456.789-00', 'joao.silva@email.com', 1, 'abc1234567', 'Gerente'),
(default, 'Maria Souza', '987.654.321-00', 'maria.souza@email.com', 2, 'senha12345', 'Analista'),
(default, 'Carlos Oliveira', '456.789.123-00', 'carlos.oliveira@email.com', 3, 'qwerty2023', 'Supervisor'),
(default, 'Ana Pereira', '789.123.456-00', 'ana.pereira@email.com', 4, 'zxcasdqwe1', 'Assistente'),
(default, 'Roberto Lima', '321.654.987-00', 'roberto.lima@email.com', 5, '123qweasd9', 'Assistente');

SELECT * FROM funcionario;
SELECT nomeFuncionario AS 'Nome do funcionário',
emailFuncionario AS 'Email do funcionário',
cargoFuncionario AS 'Cargo do funcionário'
FROM funcionario WHERE cargoFuncionario LIKE 'A%';

CREATE TABLE empresa (
idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
nomeEmpresa VARCHAR(30),
cnpjEmpresa CHAR(18) UNIQUE,
contatoEmpresa VARCHAR(50)
);

INSERT INTO empresa VALUES
(default, 'Terrário Tech', '12.345.678/0001-99', 'contato@terrariotech.com'),
(default, 'Herpetofauna Solutions', '98.765.432/0001-88', 'suporte@herpetofauna.com'),
(default, 'ReptiHouse', '45.678.912/0001-77', 'contato@reptihouse.com'),
(default, 'Vivarium Systems', '78.912.345/0001-66', 'info@vivariumsystems.com'),
(default, 'Serpentário Corp', '32.165.498/0001-55', 'contato@serpentariocorp.com');

SELECT * FROM empresa;
SELECT nomeEmpresa AS 'Nome da empresa',
contatoEmpresa AS 'Contato da empresa'
FROM empresa WHERE contatoEmpresa LIKE 'C%';

CREATE TABLE sensor(
idSensor INT PRIMARY KEY AUTO_INCREMENT,
statusSensor VARCHAR(15)
CONSTRAINT chkStatus CHECK(statusSensor IN('Ativo', 'Inativo', 'Manutenção')),
codigoSensor INT UNIQUE,
idEmpresa INT
);

INSERT INTO sensor VALUES
(default, null , 1001, 1),
(default, 'Ativo', 1002, 1),
(default, 'Ativo', 1003, 1),
(default, 'Ativo', 1004, 2),
(default, 'Ativo', 1005, 2);

SELECT * FROM sensor;
SELECT IFNULL(statusSensor, 'Sem status') AS 'Status do sensor' FROM sensor;

CREATE TABLE capturaSensor(
idCaptura INT PRIMARY KEY AUTO_INCREMENT,
idSensor INT,
temperatura FLOAT,
umidade DECIMAL(5,2),
dtRegistro DATETIME DEFAULT current_timestamp
);

INSERT INTO capturaSensor VALUES
(default, 1, 28.5, 65.30, default),
(default, 2, 25.0, 70.25, default),
(default, 3, 30.2, 60.10, default),
(default, 4, 27.8, 66.80, default),
(default, 5, 26.3, 68.55, default);

SELECT * FROM capturaSensor;
SELECT temperatura,
CASE
WHEN temperatura >= 30 THEN 'Temperatura alta'
WHEN temperatura >= 15 AND temperatura < 30 THEN 'Temperatura média'
WHEN temperatura < 15 THEN 'Temperatura baixa'
END AS 'Classificações' FROM capturaSensor;

CREATE TABLE mensagemAlerta (
	idAlerta INT PRIMARY KEY AUTO_INCREMENT,
    mensagem VARCHAR(70) NOT NULL,
    idSensor INT,
    dtAlerta DATETIME DEFAULT current_timestamp
);

INSERT INTO mensagemAlerta VALUES
(default, "Temperatura e umidade estão próximas do máximo", 1, default),
(default, "Temperatura e umidade passaram do máximo, ajustar urgentemente", 1, default),
(default, "Temperatura próximo do máximo ", 2, default),
(default, "Umidade está abaixo do mínimo", 2, default),
(default, "Temperatura e umidade passaram do máximo, ajustar urgentemente", 2, default);

SELECT * FROM mensagemAlerta;
SELECT concat("O sensor de id: ", idSensor,
" capturou os dados e a mensagem é: ", mensagem,
" e a data desse alerta é: ", dtAlerta)
AS 'Alerta' FROM mensagemAlerta;

CREATE TABLE localDeInstalacao (
	idLocalInstalacao INT PRIMARY KEY AUTO_INCREMENT,
    recintoInstalacao VARCHAR(40),
    reptilRecinto VARCHAR(45),
    dtInstalacao DATETIME,
    dtManutencao DATETIME,
    idEmpresa INT,
    idSensor INT
);

INSERT INTO localDeInstalacao VALUES
(default, 'Terrário Central', 'Jiboia', '2023-05-10 14:30:00', '2024-05-10 10:00:00', 1, 1),
(default, 'Viveiro Tropical', 'Iguana-Verde', '2022-11-22 09:15:00', '2024-11-22 11:30:00', 2, 2),
(default, 'Habitat Desértico', 'Dragão Barbudo', '2023-08-05 16:45:00', '2024-08-05 09:00:00', 3, 3),
(default, 'Pântano Artificial', 'Jacaré-do-Papo-Amarelo', '2021-12-14 08:00:00', '2023-12-14 14:20:00', 4, 4),
(default, 'Serpentário Exótico', 'Cobra Coral', '2023-03-29 12:10:00', '2024-03-29 13:45:00', 5, 5);

SELECT * FROM localDeInstalacao;
SELECT recintoInstalacao AS 'Recinto de instalação', reptilRecinto AS 'Réptil do recinto'
FROM localDeInstalacao WHERE idSensor <= 3;

CREATE TABLE parametros (
	idParametros INT PRIMARY KEY AUTO_INCREMENT,
	idLocalInstalacao INT,
    maxTemperatura FLOAT,
    minTemperatura FLOAT,
    maxUmidade FLOAT,
    minUmidade FLOAT
);

INSERT INTO parametros VALUES
(default, 1, 32.0, 24.0, 80.0, 60.0),
(default, 2, 35.0, 26.0, 75.0, 50.0),
(default, 3, 38.0, 28.0, 60.0, 30.0),
(default, 4, 30.0, 22.0, 90.0, 70.0),
(default, 5, 33.0, 25.0, 85.0, 65.0);

SELECT * FROM parametros;
SELECT concat("O local de id: ", idLocalInstalacao ,
" tem como temperatura máxima: ", maxTemperatura,
", temperatura mínima: ", minTemperatura,
", umidade máxima: ", maxUmidade,
", umidade mínima: ", minUmidade) AS 'Mensagem sobre parâmetros' FROM parametros;

CREATE TABLE endereco (
	idEndereco INT PRIMARY KEY AUTO_INCREMENT,
    idEmpresa INT,
    cep CHAR(9),
    estado VARCHAR(30),
    cidade VARCHAR(30),
    bairro VARCHAR(30),
    rua VARCHAR(30),
    numeroLogradouro INT
);

INSERT INTO endereco VALUES
(default, 1, '01001-000', 'São Paulo', 'São Paulo', 'Centro', 'Rua dos Répteis', 123),
(default, 2, '20040-020', 'Rio de Janeiro', 'Rio de Janeiro', 'Copacabana', 'Avenida das Iguanas', 456),
(default, 3, '30130-009', 'Minas Gerais', 'Belo Horizonte', 'Savassi', 'Travessa dos Dragões', 789),
(default, 4, '40020-005', 'Bahia', 'Salvador', 'Pelourinho', 'Largo dos Jacarés', 101),
(default, 5, '80010-150', 'Paraná', 'Curitiba', 'Batel', 'Alameda das Serpentes', 202);

SELECT * FROM endereco;
SELECT * FROM endereco WHERE cidade LIKE 'S%';