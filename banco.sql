
USE defaultdb;
CREATE TABLE IF NOT EXISTS alimentos (
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    categoria VARCHAR(100),
    calorias DECIMAL(10, 2),
    proteinas DECIMAL(10, 2),
    carboidratos DECIMAL(10, 2),
    gorduras DECIMAL(10, 2),
    peso VARCHAR(50),
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    imagem VARCHAR(300)
);



use defaultdb;
CREATE TABLE IF NOT EXISTS clientes(
id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50),
	sobrenome VARCHAR(75),
    idade decimal(3),
    email VARCHAR(100),
    senha VARCHAR(50),
    classe VARCHAR(50)
);











/*       ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*USE defaultdb;
CREATE TABLE IF NOT EXISTS produtos(
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50),
    descricao VARCHAR(50),
    preco DECIMAL(10,2),
    imagem VARCHAR(300)
);
INSERT INTO produtos VALUES (1,'Iphone','Celular RUIM',5000.50,'SEM IMAGEM');


USE defaultdb;
CREATE TABLE IF NOT EXISTS usuarios(
id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50),
    email VARCHAR(100),
    created_at timestamp(4),
    updated_at timestamp(4)
);

INSERT INTO `defaultdb`.`usuarios` (`id`, `nome`, `email`, `created_at`, `updated_at`) VALUES ('1', 'Mateus', 'mateus@gmail.com', '2024-10-21 07:40', '2024-11-22 07:41');

INSERT INTO `defaultdb`.`usuarios` (`id`, `nome`, `email`, `created_at`, `updated_at`) VALUES ('2', 'Felipe Brito', 'felipe@gmail.com', '2024-10-22 07:45', '2024-10-24 07:31');

INSERT INTO `defaultdb`.`usuarios` (`id`, `nome`, `email`, `created_at`, `updated_at`) VALUES ('3', 'Marcos Neto', 'Marcos.neto@gmail.com', '2024-10-23 10:50', '2024-12-25 14:20');
*/