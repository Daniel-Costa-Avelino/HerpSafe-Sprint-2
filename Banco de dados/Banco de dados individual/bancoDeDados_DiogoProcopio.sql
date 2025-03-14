CREATE DATABASE HerbSafe;

USE HerbSafe;

CREATE TABLE Empresas (
idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
CNPJ CHAR(18),
NomeFantasia VARCHAR (100),
QtdFuncionarios INT, 
TelefoneDDD CHAR(11),
CEP CHAR(9),
NumLogradouro VARCHAR(6)
);

INSERT INTO Empresas VALUES 
	(DEFAULT, '12.345.678/0001-90', 'Serpentes Paulistas', 12, '11987654321', '01001-000', 150),
	(DEFAULT, '23.456.789/0001-80', 'Iguana Tropicália', 8, '11976543210', '02002-000', 225),
	(DEFAULT, '34.567.890/0001-70', 'Gecko Exóticos', 15, '11965432109', '03003-000', 340),
	(DEFAULT, '45.678.901/0001-60', 'Dragões do Brasil', 20, '11954321098', '04004-000', 410),
	(DEFAULT, '56.789.012/0001-50', 'Répteis & Cia', 10, '11943210987', '05005-000', 530);
    
SELECT * FROM Empresas;

CREATE TABLE FuncResponsavel (
idFuncionario INT PRIMARY KEY AUTO_INCREMENT,
Empresa VARCHAR(100),
NomeSobrenome VARCHAR(30),
Email VARCHAR(50),
Cargo VARCHAR(40),
CargaHoraria VARCHAR(20)
);

INSERT INTO FuncResponsavel VALUES
	(DEFAULT, 'Serpentes Paulistas', 'Ana Bittencourt', 'anabitt@hotmal.com', 'Bióloga', '8h-17h'),
    (DEFAULT, 'Iguana Tropicália', 'Felipe Rocha', 'ferocha@gmail.com', 'Veterinário', '8h-18h'),
    (DEFAULT, 'Gecko Exóticos', 'Beatriz Zanelli', 'biazanelli@gmail.com', 'Administradora', '8h-18h'),
    (DEFAULT, 'Dragões do Brasil', 'Bruno Kenzo', 'bkenzo@outlook.com', 'Biólogo', '8h-17h'),
    (DEFAULT, 'Répteis & Cia', 'Alexandre Soares', 'alesoares@gmail.com', 'Veterinário', '8h-18h');
    
SELECT * FROM FuncResponsavel;

CREATE TABLE Sensor (
idSensor INT PRIMARY KEY AUTO_INCREMENT,
Nome VARCHAR(20),
Codigo CHAR(7),
LocalInst VARCHAR(50),
Responsavel VARCHAR(30)
);

INSERT INTO Sensor VALUES
	(DEFAULT, 'DHT11', 'DHT-101', 'Área de crescimento e desenvolvimento', 'Ana Bittencourt'),
    (DEFAULT, 'DHT11', 'DHT-203', 'Área de manejo e reprodução', 'Felipe Rocha'),
    (DEFAULT, 'LM35', 'SLM-901', 'Área de crescimento e desenvolvimento', 'Beatriz Zanelli'),
    (DEFAULT, 'LM35', 'SLM-126', 'Área de manejo e reprodução', 'Bruno Kenzo'),
    (DEFAULT, 'DHT11', 'DHT-313', 'Área de crescimento e desenvolvimento', 'Alexandre Soares');
    
SELECT * FROM Sensor;

CREATE TABLE Captura (
idCaptura INT PRIMARY KEY AUTO_INCREMENT,
CodSensor CHAR(7),
NomeSensor VARCHAR (20),
TemperaturaGraus INT,
HumidadePorcent INT,
Ambiente VARCHAR(20),
CONSTRAINT chk_Ambiente
	CHECK (Ambiente IN ('Bom', 'Ruim', 'Estável'))
);

INSERT INTO Captura VALUES
	(DEFAULT, 'DHT-101', 'DHT-11', 31, 64, 'Estável'),
    (DEFAULT, 'DHT-203', 'DHT-11', 29, 83, 'Ruim'),
    (DEFAULT, 'SLM-901', 'LM35', 27, 58, 'Bom'),
    (DEFAULT, 'SLM-126', 'LM35', 36, 43, 'Ruim'),
    (DEFAULT, 'DHT-313', 'DHT-11', 30, 66, 'Estável');
    
    SELECT * FROM Captura;
    
SHOW TABLES;

USE HerbSafe;

SHOW TABLES;

SELECT * FROM Empresas;
SELECT * FROM FuncResponsavel;
SELECT * FROM Sensor;
SELECT * FROM Captura;
    