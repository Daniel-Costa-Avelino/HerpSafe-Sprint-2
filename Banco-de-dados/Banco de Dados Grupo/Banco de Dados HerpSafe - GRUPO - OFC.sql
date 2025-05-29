CREATE DATABASE HerpSafe;
USE HerpSafe;-- --------------------------------------------------------------------------------------------------------------------------------------------------------

CREATE TABLE endereco (
idEndereco INT PRIMARY KEY AUTO_INCREMENT,
rua VARCHAR(255) NOT NULL,
numero VARCHAR(10) NOT NULL,
bairro VARCHAR(255) NOT NULL,
cidade VARCHAR(100) NOT NULL,
estado CHAR(2) NOT NULL,
cep VARCHAR(9) NOT NULL
);

INSERT INTO endereco (rua, numero, bairro, cidade, estado, cep)
VALUES 
('Rua das Flores', '123', 'Centro', 'São Paulo', 'SP', '01000-000'),
('Av. Brasil', '456', 'Jardins', 'São Paulo', 'SP', '01400-000');

-- -----------------------------------------------------------------------------------------------------------------------------------------------------------------

CREATE TABLE empresa (
idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
razao_social VARCHAR(255) NOT NULL,
nomeFantasia VARCHAR(255) NOT NULL,
cnpj VARCHAR(18) NOT NULL UNIQUE,
porte VARCHAR(8) NOT NULL,
  CONSTRAINT chk_Porte
      CHECK (porte IN('Grande', 'Medio', 'Pequeno')),
      fkEndereco INT NOT NULL,
CONSTRAINT fkendereco_Empresa FOREIGN KEY (fkEndereco)
    REFERENCES endereco(idEndereco)
); 

INSERT INTO empresa (razao_social, nomeFantasia, cnpj, porte, fkEndereco)
VALUES 
('Empresa Grande Ltda', 'EmpG', '00.000.000/0001-00', 'Grande', 1),
('Empresa Pequena ME', 'EmpP', '11.111.111/0001-11', 'Pequeno', 2);

INSERT INTO empresa (razao_social, nomeFantasia, cnpj, porte, fkEndereco)
VALUES ('Empresa do Kali Linux', 'Kalinux', '00.000.002/0001-02', 'Grande', 3);

----------------------------------------------------------------------------------------------------------------------------------------------------------------

CREATE TABLE funcionario (
idFuncionario INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(80) NOT NULL,
email VARCHAR(200)NOT NULL UNIQUE,
cpf VARCHAR(14) NOT NULL,
senha VARCHAR(20) NOT NULL,
fkEmpresa INT NOT NULL,
CONSTRAINT fkEmpresa_funcionario FOREIGN KEY (fkEmpresa)
    REFERENCES empresa(idEmpresa)
);

INSERT INTO funcionario (nome, email, cpf, senha, fkEmpresa)
VALUES 
('João Silva', 'joao@empG.com', '123.456.789-00', 'senha123', 1),
('Maria Souza', 'maria@empP.com', '987.654.321-00', 'senha456', 2);

-- ------------------------------------------------------------------------------------------------------------------------------------------------

CREATE TABLE prateleira (
idPrateleira INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45),
status_prateleira VARCHAR(10),
fkEmpresa_prateleira INT,
CONSTRAINT fkPrateleiraEmpresa FOREIGN KEY (fkEmpresa_prateleira)
    REFERENCES empresa(idEmpresa)
); 

SELECT * FROM prateleira;

INSERT INTO prateleira (nome, status_prateleira, fkEmpresa_prateleira)
VALUES 
('Prateleira A', 'Ativa', 1),
('Prateleira B', 'Inativa', 1);

SELECT * FROM prateleira;

-- ---------------------------------------------------------------------------------------------------------------------------------------------------
CREATE TABLE recinto(
idrecinto INT PRIMARY KEY AUTO_INCREMENT,
nome_recinto VARCHAR(40) NOT NULL,
status_recinto VARCHAR(10),
fk_sensor INT,
fk_sensor2 INT,
fkPrateleira INT NOT NULL,
CONSTRAINT fkPrateleiraRecinto FOREIGN KEY (fkPrateleira) REFERENCES prateleira(idPrateleira)
);
ALTER TABLE recinto ADD CONSTRAINT fkSensor_1 FOREIGN KEY (fk_sensor) REFERENCES sensor(idSensor);
ALTER TABLE recinto ADD CONSTRAINT fkSensor_2 FOREIGN KEY (fk_sensor2) REFERENCES sensor(idSensor);

SELECT * FROM recinto;

-- ----------------------------------------------------------------------------------------------------------------------------------------------

CREATE TABLE sensor (
idSensor INT PRIMARY KEY AUTO_INCREMENT,
numero_Serie CHAR(8) NOT NULL,
status_Sensor VARCHAR(10) NOT NULL,
      CONSTRAINT chk_StatusSensor
             CHECK (Status_Sensor IN('Ativo', 'Manutenção', 'Inativo')),
tipo VARCHAR(5) NOT NULL,
      CONSTRAINT chk_Tipo
           CHECK (tipo IN('DHT11', 'LM35'))
);
SELECT * FROM sensor;

INSERT INTO sensor (numero_Serie, status_Sensor, tipo)
VALUES 
('ABC12345', 'Ativo', 'DHT11'),
('DEF67890', 'Manutenção', 'LM35');

SELECT * FROM recinto;
SELECT COUNT(fk_sensor1), COUNT(fk_sensor2) FROM recinto WHERE idrecinto = 2;

-- Selecionando a temperatura e umidade máxima da captura
SELECT MAX(temperatura) FROM captura WHERE fksensor = 5;
SELECT MAX(temperatura) FROM captura WHERE fksensor = 6;

SELECT MAX(umidade) FROM captura WHERE fksensor = 5;
SELECT MAX(umidade) FROM captura WHERE fksensor = 6;


-- Exibir os alertas com base no sensor específico
SELECT alerta, mensagem FROM captura WHERE fksensor = 5 OR fksensor = 6; 

UPDATE captura SET alerta = 2 WHERE idCaptura = 2;
UPDATE captura SET mensagem = "LM35: Temperatura em 36 graus fora dos padrões estabelecidos. O limite é 25 graus.
Plano de ação: Ligar camisas de resfriamento" WHERE idCaptura = 2;

select * from captura;
SELECT * FROM sensor;

-- ----------------------------------------------------------------------------------------------------------------------------------------------------

CREATE TABLE captura(
idCaptura INT PRIMARY KEY AUTO_INCREMENT,
temperatura FLOAT NOT NULL,
umidade FLOAT NOT NULL,
dt_Hr_Captura DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
alerta TINYINT,
mensagem VARCHAR (100),
fksensor INT NOT NULL,
CONSTRAINT fkCapturaSensor FOREIGN KEY (fksensor)
    REFERENCES sensor(idsensor)
); 
ALTER TABLE captura MODIFY COLUMN mensagem VARCHAR(255);

SELECT * FROM captura;

-- Pegando Captura de Temperatura do Sensor 1 para Plotar no gráfico
SELECT temperatura, umidade FROM recinto JOIN sensor ON recinto.fk_sensor = sensor.idSensor 
					  JOIN captura ON captura.fksensor = sensor.idSensor WHERE idrecinto = 1;

-- Pegando Captura de Umidade do sensor 1 para Plotar no gráfico
SELECT umidade FROM recinto JOIN sensor ON recinto.fk_sensor = sensor.idSensor 
					  JOIN captura ON captura.fksensor = sensor.idSensor WHERE idrecinto = 1;                      
 
-- Pegando Captura de Temperatura do sensor 2 para Plotar no gráfico                      
SELECT temperatura FROM recinto JOIN sensor ON recinto.fk_sensor2 = sensor.idSensor 
					  JOIN captura ON captura.fksensor = sensor.idSensor WHERE idrecinto = 1; 
 
-- Pegando Captura de Umidade do sensor 2 para Plotar no gráfico                      
SELECT umidade FROM recinto JOIN sensor ON recinto.fk_sensor2 = sensor.idSensor 
					  JOIN captura ON captura.fksensor = sensor.idSensor WHERE idrecinto = 1;

INSERT INTO captura (temperatura, umidade, fksensor)
VALUES 
(28.5, 70.2, 5),
(29.5, 67.2, 5),
(27.3, 68.6, 5),
(27.7, 69.3, 5),
(28.4, 70.3, 5),
(29.2, 72.4, 5);

INSERT INTO captura (temperatura, umidade, fksensor)
VALUES 
(25.5, 69.2, 6),
(27.3, 68.5, 6),
(23.7, 67.1, 6),
(26.4, 74.2, 6),
(24.2, 72.4, 6);

-- ------------------------------------------------------------------------------------------------------------------------------------------------------
CREATE TABLE metricas(
idMetricas INT PRIMARY KEY AUTO_INCREMENT,
max FLOAT NOT NULL,
min FLOAT NOT NULL,
tipo VARCHAR(45),
CONSTRAINT cktipo CHECK (tipo in ("DHT11", "LM35"))
);

INSERT INTO metricas (max, min, tipo)
VALUES 
(30.0, 15.0, 'DHT11'),
(60.0, 20.0, 'LM35');

-- -----------------------------------------------------------------------------------------------------------------------------------------------
CREATE TABLE metricas_do_recinto(
fkIdRecinto INT,
fkIdMetricas INT,
especie VARCHAR(45),
CONSTRAINT pkComposta PRIMARY KEY (fkIdRecinto, fkIdMetricas),
CONSTRAINT fkMetricasIdRecinto FOREIGN KEY (fkIdRecinto)
REFERENCES recinto(idRecinto),
CONSTRAINT fkMetricasIdMetricas FOREIGN KEY (fkIdMetricas)
REFERENCES metricas(idMetricas) 
);

-- -----------------------------------------------------------------------------------------------------------------------------------------------
SELECT * FROM empresa;
SELECT * FROM sensor;
SELECT * FROM captura;
SELECT * FROM funcionario;
SELECT * FROM endereco;
SELECT * FROM local_instalacao;
SELECT * FROM alertas;
SELECT * FROM metricas;
SELECT * FROM recinto;

SELECT * FROM alertas;

SELECT recinto, 
       IFNULL((dt_Manutencao), 'Sem manutenção') AS data_ultima_manutencao
FROM local_instalacao; 

SELECT idCaptura as id,
temperatura as temperatura,
	CASE
		WHEN temperatura > 30 THEN 'Calor Excessivo'
        WHEN temperatura BETWEEN 20 AND 30 THEN 'Temperatura Ideal'
        ELSE 'Frio'
	END AS condicao_temperatura
FROM captura;