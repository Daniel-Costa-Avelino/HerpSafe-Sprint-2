CREATE DATABASE herbsafe;

USE herbsafe;

CREATE TABLE funcionario(
idFuncionario int primary key AUTO_INCREMENT,
nome varchar(100),
empresa varchar(70),
cargo varchar(25),
email varchar(30),
telefone varchar(30),
cpf char(14) unique,
codEmpresa int
);

insert into funcionario VALUES 
(default, 'Manoel Rosa', 'Serpersartia', 'gerente', 'manoel.rosa@gmail.com', '(11)97565-4123', '456.852.963-41', 232942),
(default, 'Felipe Luís', 'Spiderbem', 'analista', 'felipe.luis@gmail.com', '(11)96442-8763', '365.852.789-52', 789546),
(default, 'Vinicius Souza', 'Récpteis', 'gestor', 'vinicius.souza@gmail.com', '(11)98988-7723', '928.852.741-74', 156354),
(default, 'Henrique Julião', 'Supersartia', 'analista', 'henrique.juliao@gmail.com', '(11)93256-5789', '753.852.528-01', 457726);

SELECT * FROM funcionario WHERE nome LIKE "%a";

SELECT * FROM funcionario WHERE telefone LIKE "_11%";

------------------------------------------------------------------------------------------------------------------------------------------------------------

CREATE TABLE empresa(
idEmpresa int primary key auto_increment,
nome varchar(50),
porte varchar(30),
CONSTRAINT chkPorte
	check(porte in('pequeno', 'médio', 'grande')),
cnpj char(18) unique,
codEmpresa int unique
);

insert into empresa VALUES 
(default, 'Récpteis', 'pequeno','07.694.206/0001-08', 156354),
(default, 'Serpersartia', 'grande','68.363.724/0001-33', 232942),
(default, 'Spiderbem', 'médio','10.366.826/0001-22', 789546),
(default, 'Supersartia', 'pequeno','83.277.651/0001-50', 457726);

SELECT * FROM empresa WHERE porte = "grande";

SELECT * FROM empresa WHERE codEmpresa LIKE "%6";

---------------------------------------------------------------------------------------------------------------------------------------------------

CREATE TABLE sensor(
idSensor int primary key AUTO_INCREMENT,
nome varchar(30),
tipo varchar(30),
codSensor int unique
);

insert into sensor VALUES
(default, 'DHT11', 'temperatura e umidade', 0753486251),
(default, 'DHT11', 'temperatura e umidade', 0753486252),
(default, 'DHT11', 'temperatura e umidade', 0753486253),
(default, 'DHT11', 'temperatura e umidade', 0753486254);

---------------------------------------------------------------------------------------------------------------------------------------------------------

CREATE TABLE dadosSensor(
idDados int primary key AUTO_INCREMENT,
temperatura decimal(5,2),
umidade decimal(5,2),
codSensor int
);

drop table dadosSensor;

insert into dadosSensor VALUES
(default, 027.12, 065.99, 0753486253),
(default, 043.74, 045.56, 0753486254),
(default, 023.82, 036.37, 0753486252),
(default, 030.00, 020.11, 0753486251);

SELECT * FROM dadosSensor;

SELECT * FROM dadosSensor WHERE temperatura LIKE "2%";

-----------------------------------------------------------------------------------------------------------------------------

CREATE TABLE localDeInstalacao (
idLocalInstalacao int primary key AUTO_INCREMENT,
recintoInstalacao varchar(40),
reptilRecinto varchar(45),
dtInstalacao datetime,
dtManutencao datetime,
idEmpresa int,
idSensor int
);

INSERT INTO localDeInstalacao VALUES
(default, 'Refúgio Escamado', 'Camaleão', '2020-07-18 14:30:00', null, 1, 1),
(default, 'Jardim Serpentino', 'Jiboia', '2015-12-02 09:15:00', '2024-11-22 11:30:00', 2, 2),
(default, 'Caverna dos Répteis', 'Dragão de Comodo', '2023-01-15 16:45:00', '2024-08-05 09:00:00', 3, 3),
(default, 'Verde Reptiliano', 'Jacaré-açu', '2024-10-14 08:00:00', '2023-12-14 14:20:00', 4, 4);

SELECT * FROM localDeInstalacao;
SELECT recintoInstalacao AS 'Recinto de instalação', reptilRecinto AS 'Réptil do recinto'
FROM localDeInstalacao WHERE idSensor <= 3;