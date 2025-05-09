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

INSERT INTO empresa(razao_social, nomeFantasia, cnpj, porte, email, senha) VALUES
('Jiboias Brasil Ltda', 'Animais Brasil', '15.251.660/0001-12', 'Grande', 'jiboias.brasil@gmail.com', 'jiboias123'),
('I Azeredo Souza Criação de Répteis LTDA', 'Criatório Brasil Répteis', '30.683.842/0001-56', 'Pequeno','criatorio.brasil@gmail.com', 'criatorio123'),
('CRIADOURO RECANTO DA JIBOIA LTDA', 'Recanto da Jiboia', '34.108.953/0001-90', 'Pequeno','recanto.jiboia@gmail.com', 'recanto123'),
('Fauna Criadouro LTDA', 'Fauna Criadouro', '27.764.846/0001-54', 'Pequeno','fauna.criadouro@gmail.com', 'fauna123'),
('Criatório BR LTDA', 'Criatório BR', '44.944.479/0001-90', 'Pequeno','criatorio.brasilLTDA@gmail.com', 'criatorioBR123'),
('Fernando Vaz de Gouveia - Comercial', 'T-REX Pets', '22.212.737/0001-00', 'Pequeno','ferVaz.gouveia@gmail.com', 'gouveia123'),
('Fernando Vaz de Gouveia - Comercial', 'Criadouro Répteis', '22.213.737/0001-00', 'Médio','fernando.vazGouveia@gmail.com', 'ferVaz123');

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

INSERT INTO endereco (rua, numero, bairro, cidade, estado, cep, fkEmpresa) VALUES
('Rua Contagem', '20', 'Betim Industrial', 'Betim', 'MG', '32670402', 1000),
('Rua Nova Iguaçu', '207', 'Jardim Marilea', 'Rio das Ostras', 'RJ', '28895880', 1001),
('Rua Gilson Carlos Mantello', '962', 'Sarandi', 'Sarandi', 'PR', '87111675', 1002), 
('Rua Projetada', '560', 'Quadra L, Lote 30', 'Maceió', 'AL', '57039839', 1003),
('Rodovia Tildo Mazzarino', 'SN', 'Km 43', 'Santa Mônica', 'PR', '87915000', 1004), 
('Avenida Arvelino Durante', '4728', 'Villagio das Palmeiras', 'Sabáudia', 'PR', '86720000', 1005),
('Avenida Arvelino Durante', '4728', 'Sabáudia', 'Sabáudia', 'PR', '86720000', 1006);

-- -------------------------------------------------------------------------------------------------------------------------------------------------------------

CREATE TABLE funcionario (
idFuncionario INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(80) NOT NULL,
email VARCHAR(200)NOT NULL UNIQUE,
cpf VARCHAR(14) NOT NULL,
cargo VARCHAR(15) NOT NULL,
    CONSTRAINT chk_Cargo
        CHECK (cargo IN('Gerencial' , 'Operacional')),
senha VARCHAR(20) NOT NULL,
fkEmpresa INT NOT NULL,
CONSTRAINT fkEmpresa_funcionario FOREIGN KEY (fkEmpresa)
    REFERENCES empresa(idEmpresa)
);

INSERT INTO funcionario (nome, email, cpf, cargo, senha,fkEmpresa) VALUES
('Carlos Silva', 'carlos.silva@animaisbrasil.com', '111.111.111-11', 'Gerencial', 'senha123', 1000),
('Mariana Souza', 'mariana.souza@animaisbrasil.com', '222.222.222-22', 'Operacional', 'senha123',1000),
('Roberto Lima', 'roberto.lima@animaisbrasil.com', '333.333.333-33', 'Operacional', 'senha123',1000),
('Fernanda Ribeiro', 'fernanda.ribeiro@criatoriobrasil.com', '444.444.444-44', 'Gerencial', 'senha123',1001),
('Lucas Mendes', 'lucas.mendes@criatoriobrasil.com', '555.555.555-55', 'Operacional', 'senha123',1001),
('Tatiane Rocha', 'tatiane.rocha@criatoriobrasil.com', '666.666.666-66', 'Operacional', 'senha123',1001),
('Paulo Castro', 'paulo.castro@recantojiboia.com', '777.777.777-77', 'Gerencial', 'senha123',1002),
('Julia Nunes', 'julia.nunes@recantojiboia.com', '888.888.888-88', 'Operacional', 'senha123',1002),
('Eduardo Martins', 'eduardo.martins@recantojiboia.com', '999.999.999-99', 'Operacional', 'senha123',1002),
('Clara Fernandes', 'clara.fernandes@faunacriadouro.com', '101.101.101-10', 'Gerencial', 'senha123',1003),
('Rafael Oliveira', 'rafael.oliveira@faunacriadouro.com', '202.202.202-20', 'Operacional', 'senha123',1003),
('Bianca Gomes', 'bianca.gomes@faunacriadouro.com', '303.303.303-30', 'Operacional', 'senha123',1003),
('Anderson Santos', 'anderson.santos@criatoriobr.com', '404.404.404-40', 'Gerencial', 'senha123',1004),
('Vanessa Lima', 'vanessa.lima@criatoriobr.com', '505.505.505-50', 'Operacional', 'senha123',1004),
('Rodrigo Almeida', 'rodrigo.almeida@criatoriobr.com', '606.606.606-60', 'Operacional', 'senha123',1004),
('Gabriel Ferreira', 'gabriel.ferreira@trexpets.com', '707.707.707-70', 'Gerencial', 'senha123',1005),
('Patrícia Xavier', 'patricia.xavier@trexpets.com', '808.808.808-80', 'Operacional', 'senha123',1005),
('Diego Moraes', 'diego.moraes@trexpets.com', '909.909.909-90', 'Operacional', 'senha123',1005),
('Ana Beatriz', 'ana.beatriz@criadouroreptil.com', '111.222.333-44', 'Gerencial', 'senha123',1006),
('Felipe Cardoso', 'felipe.cardoso@criadouroreptil.com', '555.666.777-88', 'Operacional', 'senha123',1006),
('Carla Moreira', 'carla.moreira@criadouroreptil.com', '999.888.777-66', 'Operacional', 'senha123',1006);

-- ---------------------------------------------------------------------------------------------------------------------------------------------------

CREATE TABLE recinto(
idrecinto INT PRIMARY KEY AUTO_INCREMENT,
nome_recinto VARCHAR(40) NOT NULL,
dt_Instalacao DATE NOT NULL,
status_recinto TINYINT,
fkEmpresa INT NOT NULL,
CONSTRAINT fkEmpresa_local FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa)
);

INSERT INTO local_instalacao (recinto, tamanho_Recinto, serpente, dt_Instalacao, dt_Manutencao, fkEmpresa,fkMetricas)
VALUES 
('Terrário', 'Médio', 'Jiboia', '2025-03-15', '2025-05-15',1000, 1000),
('Paludário', 'Grande', 'Jiboia', '2025-03-16', NULL, 1001, 1001),
('Tanque', 'Grande', 'Píton', '2025-03-17', NULL, 1002, 1002),
('Lago', 'Grande', 'Jiboia', '2025-03-18', NULL, 1003, 1003),
('Terrário', 'Pequeno', 'Jiboia', '2025-03-19', NULL, 1004, 1004),
('Paludário', 'Médio', 'Píton', '2025-03-20', NULL, 1005, 1005),
('Tanque', 'Grande', 'Jiboia', '2025-03-21', '2025-05-21', 1006, 1006),
('Lago', 'Grande', 'Jiboia', '2025-03-22', NULL, 1006, 1007),
('Terrário', 'Médio', 'Jiboia', '2025-03-23', NULL, 1006, 1008),
('Tanque', 'Grande', 'Jiboia', '2025-03-24', NULL, 1006, 1009),
('Paludário', 'Grande', 'Jiboia', '2025-03-25', NULL, 1005, 1010),
('Lago', 'Pequeno', 'jiboia', '2025-03-26', NULL, 1005, 1011),
('Paludário', 'Grande', 'Jiboia', '2025-03-27', '2025-05-27', 1005, 1012),
('Terrário', 'Pequeno', 'Píton', '2025-03-28', NULL, 1004, 1013),
('Tanque', 'Médio', 'Jiboia', '2025-03-29', NULL, 1003, 1014),
('Lago', 'Médio', 'Jiboia', '2025-03-30', NULL, 1004, 1015),
('Tanque', 'Grande', 'Jiboia', '2025-03-31', NULL, 1005, 1016),
('Paludário', 'Pequeno', 'Píton', '2025-04-01', NULL, 1006, 1017),
('Terrário', 'Grande', 'Jiboia', '2025-04-02', NULL, 1006, 1018),
('Tanque', 'Pequeno', 'Jiboia', '2025-04-03', '2025-06-03', 1003, 1019),
('Lago', 'Grande', 'Jiboia', '2025-04-04', NULL, 1002, 1020);

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

INSERT INTO sensor (numero_Serie, codigo_Interno, status_Sensor, tipo, tipo_leitura, fkLocalInstalacao) VALUES
('SN100000', 'CI000001', 'Ativo', 'DHT11', 'Umidade', 1000),
('SN100001', 'CI000002', 'Ativo', 'LM35', 'Temperatura', 1000),
('SN100002', 'CI000003', 'Inativo', 'DHT11', 'Umidade', 1000),
('SN100003', 'CI000004', 'Manutenção', 'DHT11', 'Umidade', 1000),
('SN100004', 'CI000005', 'Ativo', 'LM35', 'Temperatura', 1000),
('SN100005', 'CI000006', 'Ativo', 'LM35', 'Temperatura', 1000),
('SN200000', 'CI100001', 'Ativo', 'DHT11', 'Umidade', 1001),
('SN200001', 'CI100002', 'Ativo', 'LM35', 'Temperatura', 1001),
('SN200002', 'CI100003', 'Inativo', 'DHT11', 'Umidade', 1001),
('SN200003', 'CI100004', 'Manutenção', 'DHT11', 'Umidade', 1001),
('SN200004', 'CI100005', 'Ativo', 'LM35', 'Temperatura', 1001),
('SN200005', 'CI100006', 'Ativo', 'LM35', 'Temperatura', 1001),
('SN300000', 'CI200001', 'Ativo', 'DHT11', 'Umidade', 1002),
('SN300001', 'CI200002', 'Ativo', 'LM35', 'Temperatura', 1002),
('SN300002', 'CI200003', 'Inativo', 'DHT11', 'Umidade', 1002),
('SN300003', 'CI200004', 'Manutenção', 'DHT11', 'Umidade', 1002),
('SN300004', 'CI200005', 'Ativo', 'LM35', 'Temperatura', 1002),
('SN300005', 'CI200006', 'Ativo', 'LM35', 'Temperatura', 1002),
('SN400000', 'CI300001', 'Ativo', 'DHT11', 'Umidade', 1003),
('SN400001', 'CI300002', 'Ativo', 'LM35', 'Temperatura', 1003),
('SN400002', 'CI300003', 'Inativo', 'DHT11', 'Umidade', 1003),
('SN400003', 'CI300004', 'Manutenção', 'DHT11', 'Umidade', 1003),
('SN400004', 'CI300005', 'Ativo', 'LM35', 'Temperatura', 1003),
('SN400005', 'CI300006', 'Ativo', 'LM35', 'Temperatura', 1003),
('SN500000', 'CI400001', 'Ativo', 'DHT11', 'Umidade', 1004),
('SN500001', 'CI400002', 'Ativo', 'LM35', 'Temperatura', 1004),
('SN500002', 'CI400003', 'Inativo', 'DHT11', 'Umidade', 1004),
('SN500003', 'CI400004', 'Manutenção', 'DHT11', 'Umidade', 1004),
('SN500004', 'CI400005', 'Ativo', 'LM35', 'Temperatura', 1004),
('SN500005', 'CI400006', 'Ativo', 'LM35', 'Temperatura', 1004),
('SN600000', 'CI500001', 'Ativo', 'DHT11', 'Umidade', 1005),
('SN600001', 'CI500002', 'Ativo', 'LM35', 'Temperatura', 1005),
('SN600002', 'CI500003', 'Inativo', 'DHT11', 'Umidade', 1005),
('SN600003', 'CI500004', 'Manutenção', 'DHT11', 'Umidade', 1005),
('SN600004', 'CI500005', 'Ativo', 'LM35', 'Temperatura', 1005),
('SN600005', 'CI500006', 'Ativo', 'LM35', 'Temperatura', 1005),
('SN700000', 'CI600001', 'Ativo', 'DHT11', 'Umidade', 1006),
('SN700001', 'CI600002', 'Ativo', 'LM35', 'Temperatura', 1006),
('SN700002', 'CI600003', 'Inativo', 'DHT11', 'Umidade', 1006),
('SN700003', 'CI600004', 'Manutenção', 'DHT11', 'Umidade', 1006),
('SN700004', 'CI600005', 'Ativo', 'LM35', 'Temperatura', 1006),
('SN700005', 'CI600006', 'Ativo', 'LM35', 'Temperatura', 1006);

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

INSERT INTO captura(temperatura, umidade, dt_Hr_Captura, fkSensorTemperatura, fkSensorUmidade)
VALUES
(28.5, 70.3, '2025-03-15 08:30:00', 1, 2),
(28.5, 70.3, '2025-03-15 08:30:00', 3, 4),
(28.5, 70.3, '2025-03-15 08:30:00', 5, 6),
(28.5, 70.3, '2025-03-15 08:30:00', 6,7),
(28.5, 70.3, '2025-03-15 08:30:00', 8, 9),
(28.5, 70.3, '2025-03-15 08:30:00', 10, 11),
(28.5, 70.3, '2025-03-15 08:30:00', 12, 13),
(28.5, 70.3, '2025-03-15 08:30:00', 14, 15),
(28.5, 70.3, '2025-03-15 08:30:00', 16, 17),
(28.5, 70.3, '2025-03-15 08:30:00', 18, 19),
(28.5, 70.3, '2025-03-15 08:30:00', 20, 21),
(28.5, 70.3, '2025-03-15 08:30:00', 22, 23),
(28.5, 70.3, '2025-03-15 08:30:00', 24, 25),
(28.5, 70.3, '2025-03-15 08:30:00', 26, 27),
(28.5, 70.3, '2025-03-15 08:30:00', 28, 29);

-- ------------------------------------------------------------------------------------------------------------------------------------------------------

CREATE TABLE alertas(
idAlertas INT PRIMARY KEY AUTO_INCREMENT,
dt_Hr_Alerta DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
mensagem VARCHAR(100),
      CONSTRAINT chk_Alerta
           CHECK (alerta IN('Atenção', 'Cuidado', 'Perigo', 'Crítico', 'Extremo')),
nivelAlerta INT,
CONSTRAINT pkAssociativa PRIMARY KEY (fkMetricas, fkCaptura, fkSensor),
fkMetricas INT UNIQUE,
CONSTRAINT fkAlerta_metricas FOREIGN KEY (fkMetricas) REFERENCES metricas(idMetricas),
fkCaptura INT UNIQUE,
CONSTRAINT fkCaptura_alerta FOREIGN KEY (fkCaptura) REFERENCES captura(idCaptura),
fkSensor INT NOT NULL,
CONSTRAINT fkSensor_captura FOREIGN KEY (fkSensor) REFERENCES sensor(idSensor)
);

INSERT INTO alertas (alerta, dt_Hr_Alerta, fkCaptura)  
VALUES
('Atenção', '2025-03-15 08:30:00', 1000),  
('Cuidado', '2025-03-16 12:45:00', 1001),  
('Perigo', '2025-03-17 15:20:00', 1002),  
('Atenção', '2025-03-18 10:30:00', 1003),  
('Cuidado', '2025-03-20 07:50:00', 1004),
('Atenção', '2025-03-25 09:00:00', 1005),  
('Perigo', '2025-03-27 14:50:00', 1006),  
('Crítico', '2025-03-30 06:45:00', 1007),
('Extremo', '2025-04-03 19:30:00', 1008);  
  
  -- -----------------------------------------------------------------------------------------------------------------------------------------------
  
  CREATE TABLE metricas(
idMetricas INT PRIMARY KEY AUTO_INCREMENT,
max FLOAT NOT NULL,
min FLOAT NOT NULL,
tipo VARCHAR(45),
CONSTRAINT cktipo CHECK (tipo("DHT11", "LM35"))
);

INSERT INTO metricas (max_Temp, min_Temp, max_Umid, min_Umid)  
VALUES  
(35.0, 20.0, 80.0, 40.0),  
(38.5, 22.5, 85.0, 45.0),  
(40.0, 25.0, 90.0, 50.0),  
(30.5, 18.0, 75.0, 35.0),  
(28.0, 16.5, 70.0, 30.0),  
(33.5, 21.0, 78.0, 38.0),  
(37.0, 23.0, 82.0, 42.0),  
(36.5, 22.0, 80.5, 41.0),  
(32.0, 19.0, 76.0, 36.0),  
(39.0, 24.0, 88.0, 48.0),  
(34.5, 20.5, 79.5, 39.5),  
(31.0, 17.5, 72.0, 32.0),  
(36.0, 21.5, 81.0, 41.5),  
(29.5, 15.5, 68.0, 28.0),  
(33.0, 20.0, 74.5, 34.5),  
(37.5, 23.5, 83.5, 43.5),  
(30.0, 18.5, 69.5, 29.5),  
(35.0, 22.0, 77.5, 37.5),  
(38.0, 24.5, 86.0, 46.0),  
(32.5, 19.5, 73.5, 33.5),  
(39.5, 25.5, 89.0, 49.0);  

-- -----------------------------------------------------------------------------------------------------------------------------------------------

SELECT * FROM empresa;
SELECT * FROM sensor;
SELECT * FROM captura;
SELECT * FROM funcionario;
SELECT * FROM endereco;
SELECT * FROM local_instalacao;
SELECT * FROM alertas;
SELECT * FROM metricas;


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