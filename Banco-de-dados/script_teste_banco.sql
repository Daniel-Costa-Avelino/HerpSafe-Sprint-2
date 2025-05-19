CREATE DATABASE Sprint_teste3;
USE Sprint_teste3;

-- Criação da tabela endereco
CREATE TABLE endereco (
    idEndereco INT PRIMARY KEY AUTO_INCREMENT,
    rua VARCHAR(255),
    numero VARCHAR(10),
    cidade VARCHAR(100),
    estado VARCHAR(50),
    cep VARCHAR(10)
);

-- Criação da tabela empresa
CREATE TABLE empresa (
    idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
    razao_social VARCHAR(255) NOT NULL,
    nomeFantasia VARCHAR(255) NOT NULL,
    cnpj VARCHAR(18) NOT NULL UNIQUE,
    porte VARCHAR(8) NOT NULL CHECK (porte IN('Grande', 'Medio', 'Pequeno')),
    fkEndereco INT NOT NULL,
    FOREIGN KEY (fkEndereco) REFERENCES endereco(idEndereco)
);
select * from empresa;
-- Criação da tabela funcionario
CREATE TABLE funcionario (
    idFuncionario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(80) NOT NULL,
    cpf VARCHAR(14) NOT NULL,
    email VARCHAR(200) NOT NULL UNIQUE,
    senha VARCHAR(20) NOT NULL,
    fkEmpresa INT NOT NULL,
    FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa)
);

-- Inserção de um endereço
INSERT INTO endereco (rua, numero, cidade, estado, cep)
VALUES ('Rua das Cobras', '123', 'Serpentópolis', 'SP', '12345-678');

-- Inserção de uma empresa vinculada ao endereço inserido (idEndereco = 1)
INSERT INTO empresa (razao_social, nomeFantasia, cnpj, porte, fkEndereco)
VALUES ('HerpSafe Ltda.', 'HerpSafe', '12.345.678/0001-99', 'Medio', 1);

-- Inserção de um funcionário vinculado à empresa inserida (idEmpresa = 1)
INSERT INTO funcionario (nome, cpf, email, senha, fkEmpresa)
VALUES ('Ana Oliveira', '987.654.321-00', 'ana@empresa.com', 'senhaAna456', 1);

select * from empresa;
select * from funcionario;

ALTER TABLE empresa ADD codigoAtivacao VARCHAR(50) NOT NULL UNIQUE;

UPDATE empresa SET codigoAtivacao = 'ABC123' WHERE idEmpresa = 1;

select * FROM empresa;
