CREATE DATABASE HerpSafe;
USE HerpSafe;

-- --------------------------------------------------------------------------------------------------------------------------------------------------------

CREATE TABLE Empresa (
idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
Razao_Social VARCHAR(255) NOT NULL,
Fantasia VARCHAR(255) NOT NULL,
CNPJ CHAR(18) NOT NULL UNIQUE,
Porte VARCHAR(8) NOT NULL,
  CONSTRAINT chk_Porte
      CHECK (Porte IN('Grande', 'Medio', 'Pequeno', 'Micro')),
StatusCliente TINYINT NOT NULL
) AUTO_INCREMENT = 1000;

INSERT INTO Empresa(Razao_Social, Fantasia, CNPJ, Porte, StatusCliente) VALUES
('Jiboias Brasil Ltda', 'Animais Brasil', '15.251.660/0001-12', 'Pequeno', 1),
('I Azeredo Souza Criação de Répteis LTDA', 'Criatório Brasil Répteis', '30.683.842/0001-56', 'Micro', 1),
('CRIADOURO RECANTO DA JIBOIA LTDA', 'Recanto da Jiboia', '34.108.953/0001-90', 'Micro', 1),
('Fauna Criadouro LTDA', 'Fauna Criadouro', '27.764.846/0001-54', 'Micro', 1),
('Criatório BR LTDA', 'Criatório BR', '44.944.479/0001-90', 'Micro', 1),
('Fernando Vaz de Gouveia - Comercial', 'T-REX Pets', '22.212.737/0001-00', 'Micro', 1),
('Fernando Vaz de Gouveia - Comercial', 'Criadouro Répteis', '22.213.737/0001-00', 'Micro', 1);

-- -----------------------------------------------------------------------------------------------------------------------------------------------------------------

CREATE TABLE Endereco (
idEndereco INT PRIMARY KEY AUTO_INCREMENT,
Rua VARCHAR(255) NOT NULL,
Numero VARCHAR(10) NOT NULL,
Bairro VARCHAR(255) NOT NULL,
Cidade VARCHAR(100) NOT NULL,
Estado CHAR(2) NOT NULL,
CEP CHAR(8) NOT NULL,
idEmpresa INT UNIQUE -- Retirar o Unique
) AUTO_INCREMENT = 1000;


INSERT INTO Endereco (Rua, Numero, Bairro, Cidade, Estado, CEP, idEmpresa) VALUES
('Rua Contagem', '20', 'Betim Industrial', 'Betim', 'MG', '32670402', 1000),
('Rua Nova Iguaçu', '207', 'Jardim Marilea', 'Rio das Ostras', 'RJ', '28895880', 1001),
('Rua Gilson Carlos Mantello', '962', 'Sarandi', 'Sarandi', 'PR', '87111675', 1002), 
('Rua Projetada', '560', 'Quadra L, Lote 30', 'Maceió', 'AL', '57039839', 1003),
('Rodovia Tildo Mazzarino', 'SN', 'Km 43', 'Santa Mônica', 'PR', '87915000', 1004), 
('Avenida Arvelino Durante', '4728', 'Villagio das Palmeiras', 'Sabáudia', 'PR', '86720000', 1005),
('Avenida Arvelino Durante', '4728', 'Sabáudia', 'Sabáudia', 'PR', '86720000', 1006);



-- -------------------------------------------------------------------------------------------------------------------------------------------------------------

CREATE TABLE Funcionario (
idFuncionario INT PRIMARY KEY AUTO_INCREMENT,
Nome VARCHAR(255) NOT NULL,
Email VARCHAR(254)NOT NULL UNIQUE,
CPF CHAR(14) NOT NULL,
Cargo VARCHAR(15) NOT NULL,
    CONSTRAINT chk_Cargo
        CHECK (Cargo IN('Gerencial' , 'Operacional')),
Senha VARCHAR(20) NOT NULL,
hora_inicio_trabalho TIME,
hora_fim_trabalho TIME,
idEmpresa INT UNIQUE -- Retirar o unique
) AUTO_INCREMENT = 1000;

INSERT INTO Funcionario (Nome, Email, CPF, Cargo, Senha, hora_inicio_trabalho, hora_fim_trabalho, idEmpresa) VALUES
('Carlos Silva', 'carlos.silva@animaisbrasil.com', '111.111.111-11', 'Gerencial', 'senha123', '07:00:00', '17:00:00', 1000),
('Mariana Souza', 'mariana.souza@animaisbrasil.com', '222.222.222-22', 'Operacional', 'senha123', '08:00:00', '18:00:00', 1000),
('Roberto Lima', 'roberto.lima@animaisbrasil.com', '333.333.333-33', 'Operacional', 'senha123', '09:00:00', '19:00:00', 1000),
('Fernanda Ribeiro', 'fernanda.ribeiro@criatoriobrasil.com', '444.444.444-44', 'Gerencial', 'senha123', '07:00:00', '17:00:00', 1001),
('Lucas Mendes', 'lucas.mendes@criatoriobrasil.com', '555.555.555-55', 'Operacional', 'senha123', '08:00:00', '18:00:00', 1001),
('Tatiane Rocha', 'tatiane.rocha@criatoriobrasil.com', '666.666.666-66', 'Operacional', 'senha123', '09:00:00', '19:00:00', 1001),
('Paulo Castro', 'paulo.castro@recantojiboia.com', '777.777.777-77', 'Gerencial', 'senha123', '07:00:00', '17:00:00', 1002),
('Julia Nunes', 'julia.nunes@recantojiboia.com', '888.888.888-88', 'Operacional', 'senha123', '08:00:00', '18:00:00', 1002),
('Eduardo Martins', 'eduardo.martins@recantojiboia.com', '999.999.999-99', 'Operacional', 'senha123', '09:00:00', '19:00:00', 1002),
('Clara Fernandes', 'clara.fernandes@faunacriadouro.com', '101.101.101-10', 'Gerencial', 'senha123', '07:00:00', '17:00:00', 1003),
('Rafael Oliveira', 'rafael.oliveira@faunacriadouro.com', '202.202.202-20', 'Operacional', 'senha123', '08:00:00', '18:00:00', 1003),
('Bianca Gomes', 'bianca.gomes@faunacriadouro.com', '303.303.303-30', 'Operacional', 'senha123', '09:00:00', '19:00:00', 1003),
('Anderson Santos', 'anderson.santos@criatoriobr.com', '404.404.404-40', 'Gerencial', 'senha123', '07:00:00', '17:00:00', 1004),
('Vanessa Lima', 'vanessa.lima@criatoriobr.com', '505.505.505-50', 'Operacional', 'senha123', '08:00:00', '18:00:00', 1004),
('Rodrigo Almeida', 'rodrigo.almeida@criatoriobr.com', '606.606.606-60', 'Operacional', 'senha123', '09:00:00', '19:00:00', 1004),
('Gabriel Ferreira', 'gabriel.ferreira@trexpets.com', '707.707.707-70', 'Gerencial', 'senha123', '07:00:00', '17:00:00', 1005),
('Patrícia Xavier', 'patricia.xavier@trexpets.com', '808.808.808-80', 'Operacional', 'senha123', '08:00:00', '18:00:00', 1005),
('Diego Moraes', 'diego.moraes@trexpets.com', '909.909.909-90', 'Operacional', 'senha123', '09:00:00', '19:00:00', 1005),
('Ana Beatriz', 'ana.beatriz@criadouroreptil.com', '111.222.333-44', 'Gerencial', 'senha123', '07:00:00', '17:00:00', 1006),
('Felipe Cardoso', 'felipe.cardoso@criadouroreptil.com', '555.666.777-88', 'Operacional', 'senha123', '08:00:00', '18:00:00', 1006),
('Carla Moreira', 'carla.moreira@criadouroreptil.com', '999.888.777-66', 'Operacional', 'senha123', '09:00:00', '19:00:00', 1006);

-- --------------------------------------------------------------------------------------------------------------------------------------

CREATE TABLE Sensor (
idSensor INT PRIMARY KEY AUTO_INCREMENT,
Numero_Serie CHAR(8) NOT NULL,
Codigo_Interno CHAR(8) NOT NULL,
Status_Sensor VARCHAR(10) NOT NULL,
      CONSTRAINT chk_StatusSensor
             CHECK (Status_Sensor IN('Ativo', 'Manutenção', 'Inativo')),
Tipo VARCHAR(5) NOT NULL,
      CONSTRAINT chk_Tipo
           CHECK (Tipo IN('DHT11', 'LM35')),
Tipo_leitura VARCHAR(11) NOT NULL,
     CONSTRAINT chk_TipoLeitura
           CHECK (Tipo_leitura IN('Temperatura', 'Umidade')),
idEmpresa  INT  UNIQUE -- Retirar o unique
);

INSERT INTO Sensor (Numero_Serie, Codigo_Interno, Status_Sensor, Tipo, Tipo_leitura, idEmpresa) VALUES
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

-- ----------------------------------------------------------------------------------------------------------------------------------------------

CREATE TABLE Local_instalaçao(
idLocal_instalaçao INT PRIMARY KEY AUTO_INCREMENT,
Recinto VARCHAR(10) NOT NULL,
         CONSTRAINT chk_Recinto
            CHECK (Recinto IN('Terrário', 'Paludário', 'Tanque', 'Lago')),
Tamanho_Recinto VARCHAR (12) NOT NULL,
         CONSTRAINT chk_TamanhoRecinto
             CHECK (Tamanho_Recinto IN('Pequeno', 'Médio', 'Grande', 'Extra Grande', 'Gigante')),
Reptil VARCHAR(254) NOT NULL,
Dt_Instalacao DATE NOT NULL,
Dt_Manutencao DATE,
idSensor_Temp INT UNIQUE,
idSensor_Umid INT UNIQUE,
idEmpresa INT UNIQUE -- Retirar o Unique
) AUTO_INCREMENT = 1000;

INSERT INTO Local_instalaçao (Recinto, Tamanho_Recinto, Reptil, Dt_Instalacao, Dt_Manutencao, idSensor_Umid, idSensor_Temp, idEmpresa)
VALUES 
('Terrário', 'Médio', 'Gecko', '2025-03-15', '2025-05-15', 1000, 1001, 1000),
('Paludário', 'Grande', 'Anaconda', '2025-03-16', NULL, 1002, 1004, 1000),
('Tanque', 'Gigante', 'Crocodilo', '2025-03-17', NULL, 1003, 1005, 1000),
('Lago', 'Extra Grande', 'Iguana', '2025-03-18', NULL, 1006, 1007, 1001),
('Terrário', 'Pequeno', 'Tartaruga', '2025-03-19', NULL, 1008, 1010, 1001),
('Paludário', 'Médio', 'Camaleão', '2025-03-20', NULL, 1009, 1011, 1001),
('Tanque', 'Grande', 'Jacaré', '2025-03-21', '2025-05-21', 1012, 1013, 1002),
('Lago', 'Gigante', 'Piranha', '2025-03-22', NULL, 1014, 1016, 1002),
('Terrário', 'Médio', 'Dragão barbudo', '2025-03-23', NULL, 1015, 1017, 1002),
('Tanque', 'Extra Grande', 'Cobra', '2025-03-24', NULL, 1018, 1019, 1003),
('Paludário', 'Grande', 'Cobra Jiboia', '2025-03-25', NULL, 1020, 1022, 1003),
('Lago', 'Pequeno', 'Jacaré', '2025-03-26', NULL, 1021, 1023, 1003),
('Paludário', 'Gigante', 'Jiboia', '2025-03-27', '2025-05-27', 1024, 1025, 1004),
('Terrário', 'Pequeno', 'Camaleão', '2025-03-28', NULL, 1026, 1028, 1004),
('Tanque', 'Médio', 'Tartaruga', '2025-03-29', NULL, 1027, 1029, 1004),
('Lago', 'Médio', 'Peixe-boi', '2025-03-30', NULL, 1030, 1031, 1005),
('Tanque', 'Gigante', 'Cobra d’água', '2025-03-31', NULL, 1032, 1034, 1005),
('Paludário', 'Pequeno', 'Salamandra', '2025-04-01', NULL, 1034, 1035, 1005),
('Terrário', 'Grande', 'Lagarto', '2025-04-02', NULL, 1036, 1037, 1006),
('Tanque', 'Pequeno', 'Peixe elétrico', '2025-04-03', '2025-06-03', 1038, 1040, 1006),
('Lago', 'Extra Grande', 'Cobra marinha', '2025-04-04', NULL, 1039, 1041, 1006);

-- ---------------------------------------------------------------------------------------------------------------------------------------------------

CREATE TABLE Metricas(
idMetricas INT PRIMARY KEY AUTO_INCREMENT,
MAX_Temp FLOAT NOT NULL,
MIN_Temp FLOAT NOT NULL,
MAX_Umid FLOAT NOT NULL,
MIN_Umid FLOAT NOT NULL,
idSensor_Umid INT UNIQUE,
idSensor_Temp INT UNIQUE,
idLocal_Instalacao INT UNIQUE
) AUTO_INCREMENT = 1000;

INSERT INTO Metricas (MAX_Temp, MIN_Temp, MAX_Umid, MIN_Umid, idSensor_Umid, idSensor_Temp, idLocal_Instalacao)  
VALUES  
(35.0, 20.0, 80.0, 40.0, 1000, 1001, 1000),  
(38.5, 22.5, 85.0, 45.0, 1002, 1004, 1001),  
(40.0, 25.0, 90.0, 50.0, 1003, 1005, 1002),  
(30.5, 18.0, 75.0, 35.0, 1006, 1007, 1003),  
(28.0, 16.5, 70.0, 30.0, 1008, 1010, 1004),  
(33.5, 21.0, 78.0, 38.0, 1009, 1011, 1005),  
(37.0, 23.0, 82.0, 42.0, 1012, 1013, 1006),  
(36.5, 22.0, 80.5, 41.0, 1014, 1016, 1007),  
(32.0, 19.0, 76.0, 36.0, 1015, 1017, 1008),  
(39.0, 24.0, 88.0, 48.0, 1018, 1019, 1009),  
(34.5, 20.5, 79.5, 39.5, 1020, 1022, 1010),  
(31.0, 17.5, 72.0, 32.0, 1021, 1023, 1011),  
(36.0, 21.5, 81.0, 41.5, 1024, 1025, 1012),  
(29.5, 15.5, 68.0, 28.0, 1026, 1028, 1013),  
(33.0, 20.0, 74.5, 34.5, 1027, 1029, 1014),  
(37.5, 23.5, 83.5, 43.5, 1030, 1031, 1015),  
(30.0, 18.5, 69.5, 29.5, 1032, 1034, 1016),  
(35.0, 22.0, 77.5, 37.5, 1034, 1035, 1017),  
(38.0, 24.5, 86.0, 46.0, 1036, 1037, 1018),  
(32.5, 19.5, 73.5, 33.5, 1038, 1040, 1019),  
(39.5, 25.5, 89.0, 49.0, 1039, 1041, 1020);  

-- ----------------------------------------------------------------------------------------------------------------------------------------------------

CREATE TABLE Alertas(
idAlertas INT PRIMARY KEY AUTO_INCREMENT,
Alerta VARCHAR(100),
      CONSTRAINT chk_Alerta
           CHECK (Alerta IN('Atenção', 'Cuidado', 'Perigo', 'Crítico', 'Extremo')),
Dt_Hr_Alerta DATETIME,
idSensor INT UNIQUE,
idLocal_instalaçao INT UNIQUE
) AUTO_INCREMENT = 1000;

INSERT INTO Alertas (Alerta, Dt_Hr_Alerta, idSensor, idLocal_instalaçao)  
VALUES
('Atenção', '2025-03-15 08:30:00', 1000, 1000),  
('Cuidado', '2025-03-16 12:45:00', 1002, 1001),  
('Perigo', '2025-03-17 15:20:00', 1003, 1002),  
('Atenção', '2025-03-18 10:30:00', 1006, 1003),  
('Cuidado', '2025-03-20 07:50:00', 1009, 1005),
('Atenção', '2025-03-25 09:00:00', 1020, 1010),  
('Perigo', '2025-03-27 14:50:00', 1024, 1012),  
('Crítico', '2025-03-30 06:45:00', 1030, 1015),
('Extremo', '2025-04-03 19:30:00', 1038, 1019);  
  
-- -----------------------------------------------------------------------------------------------------------------------------------------------

CREATE TABLE Captura(
idCaptura INT PRIMARY KEY AUTO_INCREMENT,
Temperatura FLOAT NOT NULL,
Umidade FLOAT NOT NULL,
Dt_Hr_Alerta DATETIME NOT NULL,
idSensor INT -- Retirar o Unique
) AUTO_INCREMENT = 1000;

INSERT INTO Captura (Temperatura, Umidade, Dt_Hr_Alerta, idSensor)
VALUES
(28.5, 70.3, '2025-03-15 08:30:00', 1000),
(28.7, 69.5, '2025-03-15 08:31:00', 1000),
(28.9, 68.7, '2025-03-15 08:32:00', 1000),
(29.0, 67.8, '2025-03-15 08:33:00', 1000),
(29.2, 67.0, '2025-03-15 08:34:00', 1000),
(27.0, 72.5, '2025-03-18 10:30:00', 1006),
(27.2, 72.0, '2025-03-18 10:31:00', 1006),
(27.4, 71.8, '2025-03-18 10:32:00', 1006),
(27.5, 71.5, '2025-03-18 10:33:00', 1006),
(27.7, 71.0, '2025-03-18 10:34:00', 1006),
(32.0, 60.0, '2025-03-21 09:00:00', 1012),
(32.2, 59.5, '2025-03-21 09:01:00', 1012),
(32.3, 59.0, '2025-03-21 09:02:00', 1012),
(32.5, 58.7, '2025-03-21 09:03:00', 1012),
(32.7, 58.0, '2025-03-21 09:04:00', 1012),
(31.2, 63.5, '2025-03-23 16:30:00', 1018),
(31.3, 63.3, '2025-03-23 16:31:00', 1018),
(31.5, 63.0, '2025-03-23 16:32:00', 1018),
(31.7, 62.7, '2025-03-23 16:33:00', 1018),
(31.8, 62.5, '2025-03-23 16:34:00', 1018),
(30.0, 65.5, '2025-03-27 12:30:00', 1024),
(30.2, 65.0, '2025-03-27 12:31:00', 1024),
(30.3, 64.7, '2025-03-27 12:32:00', 1024),
(30.5, 64.3, '2025-03-27 12:33:00', 1024),
(30.7, 64.0, '2025-03-27 12:34:00', 1024),
(29.8, 68.0, '2025-03-30 11:30:00', 1030),
(30.0, 67.5, '2025-03-30 11:31:00', 1030),
(30.1, 67.0, '2025-03-30 11:32:00', 1030),
(30.3, 66.8, '2025-03-30 11:33:00', 1030),
(30.5, 66.5, '2025-03-30 11:34:00', 1030),
(28.0, 75.0, '2025-04-02 14:30:00', 1036),
(28.2, 74.5, '2025-04-02 14:31:00', 1036),
(28.4, 74.0, '2025-04-02 14:32:00', 1036),
(28.6, 73.5, '2025-04-02 14:33:00', 1036),
(28.8, 73.0, '2025-04-02 14:34:00', 1036);

-- ------------------------------------------------------------------------------------------------------------------------------------------------------

SELECT * FROM Empresa;
SELECT * FROM Sensor;
SELECT * FROM Captura;
SELECT * FROM Funcionario;
SELECT * FROM Endereco;
SELECT * FROM Local_instalaçao;
SELECT * FROM Alertas;
SELECT * FROM Metricas;


 -- SELECT * FROM reptil WHERE nome LIKE '%tartaruga%';
SELECT * FROM Local_instalaçao WHERE reptil LIKE '%tartaruga%';

SELECT * FROM sensor WHERE Tipo_leitura LIKE 'temperatura%';


SELECT Tipo, 
       IFNULL(DATE(data_ultima_manutencao), 'Sem manutenção') AS data_ultima_manutencao
FROM sensor; -- Errado

SELECT nome, 
       CASE 
           WHEN temperatura > 30 THEN 'Calor Excessivo'
           WHEN temperatura BETWEEN 20 AND 30 THEN 'Temperatura Ideal'
           ELSE 'Frio'
       END AS condicao_temperatura
FROM reptil
WHERE id_sensor = (SELECT id FROM sensor WHERE nome = 'temperatura ambiente'); -- Errado
