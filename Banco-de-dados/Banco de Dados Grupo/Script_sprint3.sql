CREATE DATABASE HerpSafe;
USE HerpSafe;
-----------------------------------------------------------------------------------------------------------------------------------------------------------
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
-------------------------------------------------------------------------------------------------------------------------------------------------------

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
---------------------------------------------------------------------------------------------------------------------------------------------------

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
------------------------------------------------------------------------------------------------------------------------------------------------------
CREATE TABLE recinto(
idRecinto INT PRIMARY KEY AUTO_INCREMENT,
nome_recinto VARCHAR(40) NOT NULL,
status_recinto VARCHAR(10),
fkPrateleira INT NOT NULL,
CONSTRAINT fkPrateleiraRecinto FOREIGN KEY (fkPrateleira) REFERENCES prateleira(idPrateleira)
);

INSERT INTO recinto (nome_recinto, status_recinto, fkPrateleira) VALUES
('Recinto 1', 'Ativo', 1),
('Recinto 2', 'Inativo', 2);

SELECT * FROM recinto;
-------------------------------------------------------------------------------------------------------------------------------------------------------------
CREATE TABLE sensor (
idSensor INT PRIMARY KEY AUTO_INCREMENT,
numero_Serie CHAR(8) NOT NULL,
status_Sensor VARCHAR(10) NOT NULL,
      CONSTRAINT chk_StatusSensor
             CHECK (Status_Sensor IN('Ativo', 'Manutenção', 'Inativo')),
fkRecinto INT,
CONSTRAINT fkSensorRecinto
FOREIGN KEY (fkRecinto) REFERENCES recinto(idRecinto)
); 

INSERT INTO sensor (numero_Serie, status_Sensor, fkRecinto) VALUES
('ABC12345', 'Ativo', 1);

SELECT * FROM sensor;

-------------------------------------------------------------------------------------------------------------------------------------------------

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

INSERT INTO captura (temperatura, umidade, alerta, mensagem, fksensor) 
VALUES (28.0, 65.5, 0, 'Leitura dentro dos padrões', 1);

INSERT INTO sensor (numero_Serie, status_Sensor, fkRecinto) VALUES ('XYZ67890', 'Ativo', 1);

INSERT INTO captura (temperatura, umidade, alerta, mensagem, fksensor) 
VALUES (9.0, 65.5, 1, 'Temperatura em nível de atenção! Ação recomendada.', 2);

SELECT * FROM captura;
-- ----------------------------------------------------------------------------------------------------------------------------------------------
SELECT * FROM recinto;
-- SELECT COUNT(fk_sensor) FROM sensor WHERE idrecinto = 2;

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
-- Pegando Captura de Temperatura do Sensor 1 para Plotar no gráfico
-- SELECT temperatura, umidade FROM recinto JOIN sensor ON recinto.fk_sensor = sensor.idSensor // Tabela no sensor gr
                      -- JOIN captura ON captura.fksensor = sensor.idSensor WHERE idrecinto = 1;

-- Pegando Captura de Umidade do sensor 1 para Plotar no gráfico
-- SELECT umidade FROM recinto JOIN sensor ON recinto.fk_sensor = sensor.idSensor
                   --   JOIN captura ON captura.fksensor = sensor.idSensor WHERE idrecinto = 1;                      
 
-- Pegando Captura de Temperatura do sensor 2 para Plotar no gráfico                      
-- SELECT temperatura FROM recinto JOIN sensor ON recinto.fk_sensor2 = sensor.idSensor
                  --    JOIN captura ON captura.fksensor = sensor.idSensor WHERE idrecinto = 1;
 
-- Pegando Captura de Umidade do sensor 2 para Plotar no gráfico                      
-- SELECT umidade FROM recinto JOIN sensor ON recinto.fk_sensor2 = sensor.idSensor
                --      JOIN captura ON captura.fksensor = sensor.idSensor WHERE idrecinto = 1;
-- ------------------------------------------------------------------------------------------------------------------------------------------------------
CREATE TABLE metricas (
    idMetricas INT PRIMARY KEY AUTO_INCREMENT,
    tipo VARCHAR(45) NOT NULL,
    min_ok FLOAT NOT NULL,
    max_ok FLOAT NOT NULL,
    min_atencao FLOAT NOT NULL,
    max_atencao FLOAT NOT NULL,
    min_emergencia FLOAT NOT NULL,
    max_emergencia FLOAT NOT NULL,
    CONSTRAINT cktipo CHECK (tipo IN ("Umidade", "Temperatura"))
); 

SELECT * FROM metricas;

INSERT INTO metricas (tipo, min_ok, max_ok, min_atencao, max_atencao, min_emergencia, max_emergencia) VALUES
('Temperatura', 28.0, 30.0, 26.0, 32.0, 24.0, 34.0),
('Umidade', 60.0, 70.0, 50.0, 80.0, 40.0, 85.0);


-- -----------------------------------------------------------------------------------------------------------------------------------------------
CREATE TABLE especie(
    fkIdRecinto INT,
    fkMetricasTemperatura INT,
    fkMetricasUmidade INT,
    nome VARCHAR(45),
    CONSTRAINT pkComposta PRIMARY KEY (fkIdRecinto, fkMetricasTemperatura, fkMetricasUmidade),
    CONSTRAINT fkMetricasIdRecinto FOREIGN KEY (fkIdRecinto)
    REFERENCES recinto(idRecinto),
    CONSTRAINT fkMetricasIdTemperatura FOREIGN KEY (fkMetricasTemperatura)
    REFERENCES metricas(idMetricas),
    CONSTRAINT fkMetricasIdUmidade FOREIGN KEY (fkMetricasUmidade)
    REFERENCES metricas(idMetricas)
);

-- -----------------------------------------------------------------------------------------------------------------------------------------------
-- Inicio da Trigger

DELIMITER $$

CREATE TRIGGER trigger_captura_alerta
AFTER INSERT ON captura
FOR EACH ROW
BEGIN
    -- Declaração de variáveis
    DECLARE v_temp_status INT DEFAULT 0;
    DECLARE v_umi_status INT DEFAULT 0;
    DECLARE v_alerta_status INT DEFAULT 0;
    DECLARE v_idRecinto INT DEFAULT NULL;
    DECLARE v_idPrateleira INT DEFAULT NULL;

    -- Declaração de variáveis para os valores das métricas de temperatura
    DECLARE v_temp_min_ok FLOAT;
    DECLARE v_temp_max_ok FLOAT;
    DECLARE v_temp_min_atencao FLOAT;
    DECLARE v_temp_max_atencao FLOAT;
    DECLARE v_temp_min_emergencia FLOAT;
    DECLARE v_temp_max_emergencia FLOAT;

    -- Declaração de variáveis para os valores das métricas de umidade
    DECLARE v_umi_min_ok FLOAT;
    DECLARE v_umi_max_ok FLOAT;
    DECLARE v_umi_min_atencao FLOAT;
    DECLARE v_umi_max_atencao FLOAT;
    DECLARE v_umi_min_emergencia FLOAT;
    DECLARE v_umi_max_emergencia FLOAT;

    -- Buscando limites para Temperatura
    SELECT min_ok, max_ok, min_atencao, max_atencao, min_emergencia, max_emergencia 
    INTO v_temp_min_ok, v_temp_max_ok, v_temp_min_atencao, v_temp_max_atencao, v_temp_min_emergencia, v_temp_max_emergencia
    FROM metricas WHERE tipo = 'Temperatura'
    LIMIT 1;

    -- Buscando limites para Umidade
    SELECT min_ok, max_ok, min_atencao, max_atencao, min_emergencia, max_emergencia 
    INTO v_umi_min_ok, v_umi_max_ok, v_umi_min_atencao, v_umi_max_atencao, v_umi_min_emergencia, v_umi_max_emergencia
    FROM metricas WHERE tipo = 'Umidade'
    LIMIT 1;

    -- Determinando status da Temperatura
    IF NEW.temperatura BETWEEN v_temp_min_atencao AND v_temp_max_atencao THEN
        SET v_temp_status = 1;
    ELSEIF NEW.temperatura BETWEEN v_temp_min_emergencia AND v_temp_max_emergencia THEN
        SET v_temp_status = 2;
    ELSE
        SET v_temp_status = 0;
    END IF;

    -- Determinando status da Umidade
    IF NEW.umidade BETWEEN v_umi_min_atencao AND v_umi_max_atencao THEN
        SET v_umi_status = 1;
    ELSEIF NEW.umidade BETWEEN v_umi_min_emergencia AND v_umi_max_emergencia THEN
        SET v_umi_status = 2;
    ELSE
        SET v_umi_status = 0;
    END IF;

    -- Garantindo que status final do alerta seja corretamente definido
    SET v_alerta_status = GREATEST(IFNULL(v_temp_status, 0), IFNULL(v_umi_status, 0));

    -- Atualizando o status na tabela captura
    UPDATE captura 
    SET status = v_alerta_status
    WHERE idCaptura = NEW.idCaptura;

    -- Propagando status para sensor
    UPDATE sensor 
    SET status_Sensor = v_alerta_status
    WHERE idSensor = NEW.fkSensor;  -- Corrigindo para fkSensor

    -- Obtendo o idRecinto relacionado ao sensor
    SELECT fkRecinto INTO v_idRecinto 
    FROM sensor 
    WHERE idSensor = NEW.fkSensor  -- Corrigindo para fkSensor
    LIMIT 1;

    -- Atualizando o status na tabela recinto
    IF v_idRecinto IS NOT NULL THEN
        UPDATE recinto 
        SET status_recinto = v_alerta_status
        WHERE idRecinto = v_idRecinto;
    END IF;

    -- Obtendo o idPrateleira relacionado ao recinto
    SELECT fkPrateleira INTO v_idPrateleira 
    FROM recinto 
    WHERE idRecinto = v_idRecinto
    LIMIT 1;

    -- Atualizando o status na tabela prateleira
    IF v_idPrateleira IS NOT NULL THEN
        UPDATE prateleira 
        SET statusPrateleira = v_alerta_status
        WHERE idPrateleira = v_idPrateleira;
    END IF;

END $$

DELIMITER ;


-- Final da Trigger 


-- -----------------------------------------------------------------------------------------------------------------------------------------------
SELECT idCaptura as id,
temperatura as temperatura,
    CASE
        WHEN temperatura > 30 THEN 'Calor Excessivo'
        WHEN temperatura BETWEEN 20 AND 30 THEN 'Temperatura Ideal'
        ELSE 'Frio'
    END AS condicao_temperatura
FROM captura;


show tables;

SELECT * FROM endereco;
SELECT * FROM empresa;
SELECT * FROM funcionario;
SELECT * FROM prateleira;
SELECT * FROM recinto;
SELECT * FROM sensor;
SELECT * FROM captura;
SELECT * FROM metricas;
SELECT * FROM especie;


INSERT INTO endereco (rua, numero, cidade, estado, cep) VALUES
('Rua das Flores', '123', 'Centro', 'São Paulo', 'SP', '01000-000'),
('Av. Brasil', '456', 'Jardins', 'São Paulo', 'SP', '01400-000');

INSERT INTO empresa (razao_social, nomeFantasia, cnpj, porte, fkEndereco, codigoAtivacao) VALUES
('Empresa Grande Ltda', 'EmpG', '00.000.000/0001-00', 'Grande', 1, ABC123),
('Empresa Pequena ME', 'EmpP', '11.111.111/0001-11', 'Pequeno', 2, ABC123);

INSERT INTO funcionario (nome, email, cpf, senha, fkEmpresa) VALUES
('João Silva', 'joao@empG.com', '123.456.789-00', 'senha123', 1),
('Maria Souza', 'maria@empP.com', '987.654.321-00', 'senha456', 2);

INSERT INTO prateleira (nome, status_prateleira, fkEmpresa_prateleira) VALUES
('Prateleira A', 'Ativa', 1),
('Prateleira B', 'Inativa', 1);

INSERT INTO recinto (nome_recinto, status_recinto, fkPrateleira) VALUES
('Recinto 1', 'Ativo', 1),
('Recinto 2', 'Inativo', 2);

INSERT INTO sensor (numero_Serie, status_Sensor, fkRecinto) VALUES
('ABC12345', 'Ativo', 1),
('XYZ67890', 'Manutenção', 2);

INSERT INTO captura (temperatura, umidade, alerta, mensagem, fksensor) VALUES
(28.5, 55.2, 0, 'Leitura dentro dos padrões', 1),
(36.0, 70.0, 2, 'Temperatura acima do limite!', 2);

INSERT INTO captura (temperatura, umidade, alerta, mensagem, fksensor) VALUES  
(28.5, 55.2, 0, 'Leitura dentro dos padrões', 1),  
(36.0, 70.0, 2, 'Temperatura acima do limite!', 2);

-- Píton Real
INSERT INTO metricas (tipo, min_ok, max_ok, min_atencao, max_atencao, min_emergencia, max_emergencia) 
VALUES 
('Temperatura', 27, 32, 25, 33, 20, 35),
('Umidade', 50, 60, 45, 65, 30, 70);

-- Jiboia Arco-Íris
INSERT INTO metricas (tipo, min_ok, max_ok, min_atencao, max_atencao, min_emergencia, max_emergencia) 
VALUES 
('Temperatura', 26, 30, 24, 32, 20, 35),
('Umidade', 75, 85, 70, 90, 60, 95);

-- Jiboia
INSERT INTO metricas (tipo, min_ok, max_ok, min_atencao, max_atencao, min_emergencia, max_emergencia) 
VALUES 
('Temperatura', 26, 30, 24, 32, 20, 35),
('Umidade', 60, 70, 55, 75, 40, 80);





