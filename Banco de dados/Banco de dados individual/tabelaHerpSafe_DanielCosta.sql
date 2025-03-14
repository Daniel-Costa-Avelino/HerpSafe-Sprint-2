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
umidade DECIMAL(5,2)
);

INSERT INTO capturaSensor VALUES
(default, 1, 28.5, 65.30),
(default, 2, 25.0, 70.25),
(default, 3, 30.2, 60.10),
(default, 4, 27.8, 66.80),
(default, 5, 26.3, 68.55);

SELECT * FROM capturaSensor;
SELECT temperatura,
CASE
WHEN temperatura >= 30 THEN 'Temperatura alta'
WHEN temperatura >= 15 AND temperatura < 30 THEN 'Temperatura média'
WHEN temperatura < 15 THEN 'Temperatura baixa'
END AS 'Classificações' FROM capturaSensor;