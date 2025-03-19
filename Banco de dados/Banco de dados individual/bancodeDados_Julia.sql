CREATE DATABASE HerpSafe;
use HerpSafe;

CREATE TABLE Empresa(
idEmpresa int primary key auto_increment,
nome varchar (100),
fantasia varchar (100),
cnpj varchar (18),
endereco varchar (100),
telefone varchar (20)
);

CREATE TABLE Terrario(
idTerrario int primary key auto_increment,
nome varchar(100),
tipo varchar(100),
volume int
);

CREATE TABLE Sensores(
id_sensor int primary key auto_increment,
nome varchar (50),
tipo varchar(50),
dtinstalacao date,
dtmanutencao date
);

alter table sensores add constraint chksensor check (tipo in('temperatura', 'umidade'));


CREATE TABLE Medições (
idMedicao int primary key auto_increment,
temperatura decimal (5, 2),
umidade decimal (5, 2),
data_hora timestamp
);

CREATE TABLE Cliente (
idCliente int primary key auto_increment,
nome varchar (40),
email varchar (40),
cpf int
);


