CREATE DATABASE HerpSafe;
USE HerpSafe;

-- --------------------------------------------------------------------------------------------------------------------------------------------------------

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

-- -----------------------------------------------------------------------------------------------------------------------------------------------------------------

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

-- -------------------------------------------------------------------------------------------------------------------------------------------------------------

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

-- -----------------------------------------------------------------------------------------------------------------------------------------------
CREATE TABLE prateleira (
idPrateleira INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45),
status_prateleira VARCHAR(45),
fkEmpresa_prateleira INT,
CONSTRAINT fkPrateleiraEmpresa FOREIGN KEY (fkEmpresa_prateleira)
    REFERENCES empresa(idEmpresa)
); 

INSERT INTO prateleira (nome, status_prateleira, fkEmpresa_prateleira)
VALUES 
('Prateleira A', 'Ativa', 1),
('Prateleira B', 'Inativa', 1);

-- ---------------------------------------------------------------------------------------------------------------------------------------------------

CREATE TABLE recinto(
idrecinto INT PRIMARY KEY AUTO_INCREMENT,
nome_recinto VARCHAR(40) NOT NULL,
numeroSerial1 CHAR(8) NOT NULL,
numeroSerial2 CHAR(8),
fkPrateleira INT NOT NULL,
CONSTRAINT fkPrateleiraRecinto FOREIGN KEY (fkPrateleira) REFERENCES prateleira(idPrateleira)
);

INSERT INTO recinto (nome_recinto, dt_Instalacao, status_recinto, fkPrateleira)
VALUES 
('Recinto 1', '2023-01-10', 1, 1),
('Recinto 2', '2023-06-15', 0, 2);

-- ----------------------------------------------------------------------------------------------------------------------------------------------

CREATE TABLE sensor (
idSensor INT PRIMARY KEY AUTO_INCREMENT,
numero_Serie CHAR(8) NOT NULL,
status_Sensor VARCHAR(10) NOT NULL,
      CONSTRAINT chk_StatusSensor
             CHECK (Status_Sensor IN('Ativo', 'Manutenção', 'Inativo')),
tipo VARCHAR(5) NOT NULL,
      CONSTRAINT chk_Tipo
           CHECK (tipo IN('DHT11', 'LM35')),
fkRecinto INT NOT NULL,
CONSTRAINT fkRecinto FOREIGN KEY (fkRecinto)
    REFERENCES recinto(idrecinto)
);

INSERT INTO sensor (numero_Serie, status_Sensor, tipo, fkRecinto)
VALUES 
('ABC12345', 'Ativo', 'DHT11', 1),
('DEF67890', 'Manutenção', 'LM35', 2);

-- ----------------------------------------------------------------------------------------------------------------------------------------------------

CREATE TABLE captura(
idCaptura INT PRIMARY KEY AUTO_INCREMENT,
temperatura FLOAT NOT NULL,
umidade FLOAT NOT NULL,
dt_Hr_Captura DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
fksensor INT NOT NULL,
CONSTRAINT fkCapturaSensor FOREIGN KEY (fksensor)
    REFERENCES sensor(idsensor)
);

INSERT INTO captura (temperatura, umidade, fksensor)
VALUES 
(28.5, 70.2, 1),
(22.4, 65.0, 2);

-- ------------------------------------------------------------------------------------------------------------------------------------------------------

CREATE TABLE alertas(
dt_Hr_Alerta DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
mensagem VARCHAR(100),
      CONSTRAINT chk_Alerta
           CHECK (mensagem IN('Atenção', 'Cuidado', 'Perigo', 'Crítico', 'Extremo')),
nivelAlerta INT,
CONSTRAINT pkAssociativa PRIMARY KEY (fkMetricas, fkCaptura, fkSensor),
fkMetricas INT UNIQUE,
CONSTRAINT fkAlerta_metricas FOREIGN KEY (fkMetricas) REFERENCES metricas(idMetricas),
fkCaptura INT UNIQUE,
CONSTRAINT fkCaptura_alerta FOREIGN KEY (fkCaptura) REFERENCES captura(idCaptura),
fkSensor INT NOT NULL,
CONSTRAINT fkSensor_captura FOREIGN KEY (fkSensor) REFERENCES sensor(idSensor)
);

INSERT INTO alertas (mensagem, nivelAlerta, fkMetricas, fkCaptura, fkSensor)
VALUES 
('Atenção', 1, 1, 1, 1),
('Perigo', 3, 2, 2, 2);
  
  -- -----------------------------------------------------------------------------------------------------------------------------------------------
  
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
SELECT * FROM empresa;
SELECT * FROM sensor;
SELECT * FROM captura;
SELECT * FROM funcionario;
SELECT * FROM endereco;
SELECT * FROM local_instalacao;
SELECT * FROM alertas;
SELECT * FROM metricas;
SELECT * FROM recinto;


SELECT * FROM local_instalacao WHERE serpente LIKE '%Jiboia%';

SELECT * FROM sensor WHERE Tipo_leitura LIKE '%temperatura%';

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

SELECT CONCAT(nome, ' - ', cargo) AS Cargo_Funcionario
FROM funcionario;

/* ------------------------------------------------------*/
/*SELECT COM JOIN*/
SELECT * FROM empresa JOIN endereco ON empresa.idEmpresa = endereco.fkEmpresa;
SELECT * FROM funcionario JOIN empresa ON funcionario.fkEmpresa = empresa.idEmpresa;
SELECT * FROM sensor JOIN local_instalacao ON sensor.fkLocalInstalacao = local_instalacao.idLocal_instalacao
JOIN metricas ON metricas.idMetricas = local_instalacao.fkMetricas;
SELECT * FROM local_instalacao JOIN metricas ON metricas.idMetricas = local_instalacao.fkMetricas;
SELECT * FROM alertas JOIN captura ON captura.idCaptura = alertas.fkCaptura;
SELECT * FROM captura JOIN sensor ON captura.fkSensorTemperatura = sensor.idSensor JOIN sensor AS sensor2 ON captura.fkSensorUmidade = sensor2.idSensor;