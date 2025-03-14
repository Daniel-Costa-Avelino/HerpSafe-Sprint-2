CREATE DATABASE ErbySafe;

USE ErbySafe;
    
CREATE TABLE empresa (
	idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
    nomeEmpresa VARCHAR(200) NOT NULL,
    cnpjEmpresa CHAR(18) NOT NULL,
    emailEmpresa VARCHAR(200),
    enderecoEmpresa VARCHAR(1000) NOT NULL,
    telefoneEmpresa VARCHAR(15),
    paisEmpresa VARCHAR(100),
    dataFuncacao DATE
    );
    
CREATE TABLE usuario (
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nomeEmpresa VARCHAR(200) NOT NULL,
	nomeUsuario VARCHAR(200) NOT NULL,
    emailUsuario VARCHAR(200) NOT NULL UNIQUE,
    cpfUsuario CHAR(14) NOT NULL,
    telefoneUsuario VARCHAR(15),
    senhaUsuario CHAR(10) NOT NULL,
    categoriaUsuario VARCHAR(50) NOT NULL,
    CONSTRAINT chkCategoriaUsuario CHECK ( categoriaUsuario IN ('Gerente', 'Técnico', 'Funcionário')),
    dataCriacaoConta DATE NOT NULL,
    ultimoLogin DATE NOT NULL
    );
    
CREATE TABLE loginUsuario (
	emailUsuario VARCHAR(200) NOT NULL,
    cpfUsuario CHAR(14) NOT NULL,
    senhaUsuario CHAR(10) NOT NULL,
    statusLoginUsuario VARCHAR(50),
    CONSTRAINT chkStatusLoginUsuario CHECK ( statusLoginUsuario IN ('Falha', 'Login bem-sucedido'))
    );

CREATE TABLE recinto (
	idRecinto INT PRIMARY KEY AUTO_INCREMENT,
    nomeRecinto VARCHAR(200) NOT NULL,
    nomeEmpresa VARCHAR(200) NOT NULL,
    descricaoRecinto VARCHAR(300),
    localizacaoRecinto VARCHAR(200) NOT NULL
    );
    
CREATE TABLE sensor (
	idSensor INT PRIMARY KEY AUTO_INCREMENT UNIQUE,
    tipoSensor VARCHAR(100) NOT NULL,
    nomeEmpresa VARCHAR(200) NOT NULL,
    modeloSensor VARCHAR(300) NOT NULL,
    fabricanteSensor VARCHAR(300),
    idRecinto INT NOT NULL,
    dataInstalcao DATE NOT NULL,
    statusSensor VARCHAR(200) NOT NULL, 
	CONSTRAINT chkStatusSensor CHECK ( statusSensor IN ('Ativo', 'Inativo'))
    );
    
CREATE TABLE manutencao (
	 idManutecao INT PRIMARY KEY AUTO_INCREMENT,
     idSensor INT,
     tipoManutencao VARCHAR(50) NOT NULL,
     CONSTRAINT chktipoManutencao CHECK ( tipoManutencao IN ('Preventiva', 'Corretiva')),
     dataManutencao DATE NOT NULL,
     descricaoManutencao VARCHAR(500) NOT NULL,
     idUsuario INT NOT NULL
     );
     
CREATE TABLE leitura (
	idLeitura INT PRIMARY KEY AUTO_INCREMENT,
    idSensor INT,
    valorLeituraTemperatura DECIMAL(3,1) NOT NULL,
    valorLeituraUmidade DECIMAL(3,1) NOT NULL,
    unidadeMedidaTemperatura VARCHAR(10) NOT NULL,
    unidadeMedidaUmidade VARCHAR(100) NOT NULL,
    dataHoraLeitura DATETIME NOT NULL
    );
    
CREATE TABLE alerta (
	idAlerta INT PRIMARY KEY AUTO_INCREMENT,
    idSensor INT NOT NULL,
    tipoAlerta VARCHAR(20) NOT NULL,
    CONSTRAINT chkTipoAlerta CHECK ( tipoAlerta IN ('Temperatura', 'Umidade')),
    dataHoraAlerta DATETIME NOT NULL,
    statusAlerta VARCHAR(20) NOT NULL,
    CONSTRAINT chkStatusAlerta CHECK ( statusAlerta IN ('Resolvido', 'Ativo')),
    descricaoAcaoTomada VARCHAR(500) NOT NULL
    );
    
CREATE TABLE historicoLogin (
	idHistorico INT PRIMARY KEY AUTO_INCREMENT,
    idUsuario INT NOT NULL,
    dataHoraLogin DATETIME NOT NULL,
    enderecoIP VARCHAR(20) NOT NULL
    );

INSERT INTO empresa (nomeEmpresa, cnpjEmpresa, emailEmpresa, enderecoEmpresa, telefoneEmpresa, paisEmpresa, dataFuncacao) VALUES
('Empresa A', '00.000.000/0001-00', 'contato@empresaA.com', 'Rua A, 123', '11987654321', 'Brasil', '2010-05-01'),
('Empresa B', '00.000.000/0002-00', 'contato@empresaB.com', 'Rua B, 456', '11987654322', 'Brasil', '2012-06-15');

INSERT INTO usuario (nomeEmpresa, nomeUsuario, emailUsuario, cpfUsuario, telefoneUsuario, senhaUsuario, categoriaUsuario, dataCriacaoConta, ultimoLogin) VALUES
('Empresa A', 'Usuario A', 'usuarioA@domain.com', '000.000.001-00', '11987654326', 'senhaA', 'Gerente', '2023-01-01', '2023-01-10'),
('Empresa A', 'Usuario B', 'usuarioB@domain.com', '000.000.002-00', '11987654327', 'senhaB', 'Técnico', '2023-02-01', '2023-02-10'),
('Empresa A', 'Usuario C', 'usuarioC@domain.com', '000.000.003-00', '11987654328', 'senhaC', 'Funcionário', '2023-03-01', '2023-03-10'),
('Empresa B', 'Usuario D', 'usuarioD@domain.com', '000.000.004-00', '11987654329', 'senhaD', 'Gerente', '2023-04-01', '2023-04-10'),
('Empresa B', 'Usuario E', 'usuarioE@domain.com', '000.000.005-00', '11987654331', 'senhaE', 'Técnico', '2023-05-01', '2023-05-10'),
('Empresa B', 'Usuario F', 'usuarioF@domain.com', '000.000.006-00', '11987654332', 'senhaF', 'Funcionário', '2023-06-01', '2023-06-10'),
('Empresa B', 'Usuario G', 'usuarioG@domain.com', '000.000.007-00', '11987654333', 'senhaG', 'Funcionário', '2023-07-01', '2023-07-10'),
('Empresa B', 'Usuario H', 'usuarioH@domain.com', '000.000.008-00', '11987654334', 'senhaH', 'Funcionário', '2023-08-01', '2023-08-10');

INSERT INTO loginUsuario (emailUsuario, cpfUsuario, senhaUsuario, statusLoginUsuario) VALUES
('usuarioA@domain.com', '000.000.001-00', 'senhaA', 'Login bem-sucedido'),
('usuarioB@domain.com', '000.000.002-00', 'senhaB', 'Falha'),
('usuarioC@domain.com', '000.000.003-00', 'senhaC', 'Login bem-sucedido'),
('usuarioD@domain.com', '000.000.004-00', 'senhaD', 'Falha'),
('usuarioE@domain.com', '000.000.005-00', 'senhaE', 'Login bem-sucedido');

INSERT INTO recinto (nomeRecinto, nomeEmpresa, descricaoRecinto, localizacaoRecinto) VALUES
('Recinto A', 'Empresa A', 'Descricao A', 'Localizacao A'),
('Recinto B', 'Empresa A', 'Descricao B', 'Localizacao B'),
('Recinto C', 'Empresa B', 'Descricao C', 'Localizacao C'),
('Recinto D', 'Empresa B', 'Descricao D', 'Localizacao D'),
('Recinto E', 'Empresa B', 'Descricao E', 'Localizacao E');

INSERT INTO sensor (tipoSensor, nomeEmpresa, modeloSensor, fabricanteSensor, idRecinto, dataInstalcao, statusSensor) VALUES
('Umidade e temperatura', 'Empresa A', 'DHT11', 'Fabricante A', 1, '2023-01-01', 'Ativo'),
('Umidade e temperatura', 'Empresa A', 'DHT11', 'Fabricante B', 2, '2023-02-01', 'Inativo'),
('Umidade e temperatura', 'Empresa B', 'DHT11', 'Fabricante C', 1, '2023-03-01', 'Ativo'),
('Umidade e temperatura', 'Empresa B', 'DHT11', 'Fabricante D', 2, '2023-04-01', 'Inativo'),
('Umidade e temperatura', 'Empresa B', 'DHT11', 'Fabricante E', 3, '2023-05-01', 'Ativo');

INSERT INTO manutencao (idSensor, tipoManutencao, dataManutencao, descricaoManutencao, idUsuario) VALUES
(1, 'Preventiva', '2023-01-15', 'Descricao A', 2),
(2, 'Corretiva', '2023-02-15', 'Descricao B', 2),
(3, 'Preventiva', '2023-03-15', 'Descricao C', 5),
(4, 'Corretiva', '2023-04-15', 'Descricao D', 2),
(5, 'Preventiva', '2023-05-15', 'Descricao E', 5);

INSERT INTO leitura (idSensor, valorLeituraTemperatura, valorLeituraUmidade, unidadeMedidaTemperatura, unidadeMedidaUmidade, dataHoraLeitura) VALUES
(1, 30.1, 60.1, '°C', '%', '2023-01-01 12:00:00'),
(2, 25.3, 55.6, '°C', '%', '2023-02-01 12:00:00'),
(3, 20.2, 50.7, '°C', '%', '2023-03-01 12:00:00'),
(4, 15.0, 45.9, '°C', '%', '2023-04-01 12:00:00'),
(5, 10.9, 40.0, '°C', '%', '2023-05-01 12:00:00');

INSERT INTO alerta (idSensor, tipoAlerta, dataHoraAlerta, statusAlerta, descricaoAcaoTomada) VALUES
(1, 'Temperatura', '2023-01-01 12:00:00', 'Ativo', 'Descricao A'),
(2, 'Umidade', '2023-02-01 12:00:00', 'Resolvido', 'Descricao B'),
(3, 'Temperatura', '2023-03-01 12:00:00', 'Ativo', 'Descricao C'),
(4, 'Umidade', '2023-04-01 12:00:00', 'Resolvido', 'Descricao D'),
(5, 'Temperatura', '2023-05-01 12:00:00', 'Ativo', 'Descricao E');

INSERT INTO historicoLogin (idUsuario, dataHoraLogin, enderecoIP) VALUES
(1, '2023-01-01 12:00:00', '192.168.0.1'),
(2, '2023-02-01 12:00:00', '192.168.0.2'),
(3, '2023-03-01 12:00:00', '192.168.0.3'),
(4, '2023-04-01 12:00:00', '192.168.0.4'),
(5, '2023-05-01 12:00:00', '192.168.0.5');

SHOW TABLES;