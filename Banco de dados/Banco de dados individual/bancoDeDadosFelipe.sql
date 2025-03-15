CREATE DATABASE HerbSafe;
USE HerbSafe;

CREATE TABLE users (
id INT PRIMARY KEY AUTO_INCREMENT,
email VARCHAR (50),
senha VARCHAR (32),
cpf VARCHAR (50),
cargo VARCHAR (30), 
constraint chCargo CHECK(cargo IN ('Junior','Chefe','Senior'))
);

INSERT INTO users (email,senha,cpf,cargo) VALUES 
('funcionário1@gmail.com', '12a12a','44211988-66','Junior'),
('funcionário2@gmail.com', '13b12a','44211988-66','Chefe'),
('funcionária4@gmail.com', '1b2b3bd5','44211988-66','Senior'),
('funcionário3@gmail.com', '12a12a','44211988-66','Junior');

Select * From users;
Select cargo as cargo from users order by cargo desc;

CREATE TABLE empresa (
id INT PRIMARY KEY auto_increment,
nome varchar (50),
cnpj CHAR (18),
cep CHAR (8),
situacao VARCHAR (20),
constraint chSit CHECK (situacao IN('ativo','propecção','inativo')),
porte VARCHAR (20),
constraint chPorte CHECK (porte IN('grande','médio','pequeno'))
);

INSERT INTO empresa (nome, cnpj, cep, situacao, porte) VALUES
('Empresa A', 12345678000123, '12345678', 'ativo', 'grande'),
('Empresa B', 23456789000123, '23456789', 'propecção', 'médio'),
('Empresa C', 34567890000123, '34567890', 'inativo', 'pequeno'),
('Empresa D', 45678901000123, '45678901', 'ativo', 'grande'),
('Empresa E', 56789012000123, '56789012', 'inativo', 'médio');

SELECT * FROM empresa where nome LIKE '%A' ;

CREATE TABLE sensor (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tipo VARCHAR(20),
    CONSTRAINT chTipo CHECK (tipo IN ('DHT11','LM35')),
    estado VARCHAR(20),
    CONSTRAINT chEst CHECK (estado IN ('Ativo', 'Inativo')),
    ident VARCHAR(30)
);

INSERT INTO sensor (tipo, estado, ident) VALUES
('DHT11', 'Ativo', 'Sensor001'),
('LM35', 'Inativo', 'Sensor002'),
('DHT11', 'Ativo', 'Sensor003'),
('LM35', 'Ativo', 'Sensor004'),
('DHT11', 'Inativo', 'Sensor005');

SELECT estado as Estado_Ativo FROM sensor WHERE estado = 'Ativo';

CREATE TABLE dadosSensor (
id INT PRIMARY KEY AUTO_INCREMENT,
temperatura FLOAT,
umidade decimal (5,2),
identifcador VARCHAR (30)
);

INSERT INTO dadosSensor (temperatura, umidade, identifcador ) VALUES
(25.6, 80.50, 'Sensor001'),
(30.2, 65.25, 'Sensor002'),
(22.8, 75.10, 'Sensor003'),
(28.4, 70.30, 'Sensor004'),
(24.0, 85.15, 'Sensor005');

SELECT * FROM dadosSensor WHERE id <= 3;
truncate users;