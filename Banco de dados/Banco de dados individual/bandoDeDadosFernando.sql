CREATE DATABASE bd_herbsafe;

USE bd_herbsafe;

-- TABELA EMPRESA
CREATE TABLE Empresas (
idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
codEmpresa INT UNIQUE NOT NULL,
nome VARCHAR(50) NOT NULL,
email VARCHAR(150) NOT NULL,
telefone VARCHAR(18),
CNPJ VARCHAR(20) NOT NULL UNIQUE,
logradouro VARCHAR(200)
) AUTO_INCREMENT = 1000;

-- INSERINDO 5 REGISTROS
INSERT INTO Empresas (codEmpresa, nome, email, telefone, CNPJ, logradouro) VALUES
(101, 'ReptilTech Conservação', 'contato@reptiltech.com', '(11) 98765-4321', '12.345.678/0001-99', 'Rua das Serpentes, 123, São Paulo - SP'),
(102, 'HerpetoVida', 'suporte@herpetovida.com', '(21) 99988-7766', '98.765.432/0001-88', 'Av. dos Lagartos, 456, Rio de Janeiro - RJ'),
(103, 'EcoRépteis', 'vendas@ecorepteis.com', '(31) 98877-6655', '23.456.789/0001-77', 'Rodovia das Tartarugas, Km 10, Belo Horizonte - MG'),
(104, 'Serpentário Nacional', 'info@serpentarionacional.com', '(85) 97766-5544', '34.567.890/0001-66', 'Travessa dos Répteis, 321, Fortaleza - CE'),
(105, 'Lagarto Verde Soluções', 'contato@lagartoverde.com', '(41) 96655-4433', '45.678.901/0001-55', 'Estrada dos Jacarés, 789, Curitiba - PR');

    
-- SELECTS DA TABELA
SELECT * FROM Empresas;

SELECT
	idEmpresa AS 'ID Empresa',
	codEmpresa AS 'Código de Acesso',
	nome AS 'Nome da Empresa', 
    CONCAT( email, '  ', telefone) AS 'Meios de Contato',
    CNPJ,
    logradouro AS 'Logradouro'
FROM Empresas WHERE nome LIKE 'R%';



-- TABELA USUÁRIOS
CREATE TABLE Usuario(
idUsuario INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(50) NOT NULL,
email VARCHAR(150) NOT NULL,
cpf VARCHAR(18) NOT NULL UNIQUE,
senha VARCHAR(40) NOT NULL,
cargo VARCHAR(30),
codEmpresa INT,
CONSTRAINT chkCargo 	
	CHECK(cargo in ('Administrador','Analista'))
);

-- INSERINDO 5 REGISTROS
INSERT INTO Usuario (nome, email, cpf, senha, cargo, codEmpresa) VALUES
('Carlos Silva', 'carlos.silva@reptiltech.com', '123.456.789-01', 'senha123', 'Administrador', 101),
('Ana Souza', 'ana.souza@herpetovida.com', '234.567.890-12', 'senha456', 'Analista', 101),
('Marcos Oliveira', 'marcos.oliveira@ecorepteis.com', '345.678.901-23', 'senha789', 'Administrador', 103),
('Beatriz Lima', 'beatriz.lima@serpentarionacional.com', '456.789.012-34', 'senha321', 'Analista', 105),
('Ricardo Santos', 'ricardo.santos@lagartoverde.com', '567.890.123-45', 'senha654', 'Administrador', 105);


-- SELECTS DA TABELA
SELECT * FROM Usuario;

SELECT 
	idUsuario AS 'ID Usuário',
    nome AS 'Nome',
	email AS 'Email',
    cpf AS 'CPF',
    senha AS 'Senha',
    cargo AS 'Cargo Responsável',
    codEmpresa AS 'Código Empresa'
FROM Usuario WHERE codEmpresa = 105;


-- TABELA SENSORES
CREATE TABLE Sensor(
idSensor INT PRIMARY KEY AUTO_INCREMENT,
serialNumber INT UNIQUE NOT NULL,
nome VARCHAR(40),
statusSensor VARCHAR(20) DEFAULT 'Ativo',
dt_instalacao DATE,
dt_manutencao DATE,
codEmpresa INT
) AUTO_INCREMENT = 3000;

-- INSERINDO 5 REGISTROS
INSERT INTO Sensor (serialNumber, nome, statusSensor, dt_instalacao, dt_manutencao, codEmpresa) VALUES
('1001434353', 'DHT11 Temperatura e Umidade', 'Ativo', '2024-01-15', '2025-01-15', 101),
('1004343432', 'DHT11 Temperatura e Umidade', 'Ativo', '2024-02-20', NULL, 102),
('1006675443', 'DHT11 Temperatura e Umidade', 'Inativo', NULL, NULL, 103),
('1004574245', 'DHT11 Temperatura e Umidade', 'Ativo', '2024-04-05', '2025-04-05', 104),
('1005785854', 'DHT11 Temperatura e Umidade', 'Ativo', NULL, '2025-05-12', 105);

-- SELECTS DA TABELA
SELECT * FROM Sensor;

SELECT
	idSensor AS 'ID Sensor',
    CONCAT('SN-',serialNumber) AS 'Número de Série',
    nome AS 'Nome Sensor',
    statusSensor AS 'Status',
    IFNULL(dt_instalacao, 'Ainda Não Instalado') AS 'Data de Instalação',
    IFNULL(dt_manutencao, 'Manutenção não Realizada') AS 'Data de Manutenção',
    codEmpresa AS 'Código da Empresa com o Sensor'
FROM Sensor WHERE statusSensor = 'Ativo';


-- TABELA DE LEITURA DO DADOS DO SENSOR
CREATE TABLE Leitura_Dados (
idDados INT PRIMARY KEY AUTO_INCREMENT,
dado_temperatura DECIMAL(5,2),
dado_umidade DECIMAL(5,2),
data_captura DATETIME,
codSensor INT
);

-- INSERINDO 5 REGISTROS
INSERT INTO Leitura_Dados (dado_temperatura, dado_umidade, data_captura, codSensor) VALUES
(25.30, 80.00, '2024-03-15 08:30:00', 3001),
(42.10, 55.20, '2024-03-15 09:00:00', 3002),
(23.50, 58.30, '2024-03-15 10:15:00', 3003),
(14.00, 65.10, '2024-03-15 11:45:00', 3004),
(26.70, 22.50, '2024-03-15 13:00:00', 3005);

-- SELECTS DA TABELA
SELECT * FROM Leitura_Dados;

SELECT 
	idDados AS 'ID Dados',
    CONCAT(dado_temperatura,'°C') AS 'Temperatura Atual',
    CASE
        WHEN dado_temperatura > 30 THEN 'Muito quente para o réptil'
        WHEN dado_temperatura >=20 AND dado_temperatura <= 30 THEN 'Temperatura ideal para o réptil'
        WHEN dado_temperatura < 20 THEN 'Muito frio para o réptil'
    END AS 'Status Temperatura',
    CONCAT(dado_umidade,'%') AS 'Umidade Atual',
    CASE
        WHEN dado_umidade > 70 THEN 'Alta umidade'
        WHEN dado_umidade >= 40 AND dado_umidade <= 70 THEN 'Umidade ideal'
        WHEN dado_umidade < 40 THEN 'Baixa umidade'
    END AS 'Status Umidade',
    data_captura AS 'Data da Captura do Dado',
    codSensor AS 'Código do Sensor'
FROM Leitura_Dados;