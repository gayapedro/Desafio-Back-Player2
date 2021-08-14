CREATE DATABASE IF NOT EXISTS player2back;

DROP TABLE IF EXISTS usuarios;
DROP TABLE IF EXISTS cnaes_secundarias;
DROP TABLE IF EXISTS socios;
DROP TABLE IF EXISTS empresas;

CREATE TABLE empresas(
  id INT AUTO_INCREMENT PRIMARY KEY,
  cnpj VARCHAR(14) NOT NULL,
  identificador_matriz_filial INT NOT NULL,
  descricao_matriz_filial VARCHAR(150) NOT NULL,
  razao_social VARCHAR(150) NOT NULL,
  nome_fantasia VARCHAR(150) NOT NULL,
  situacao_cadastral INT NOT NULL,
  descricao_situacao_cadastral VARCHAR(150) NOT NULL,
  data_situacao_cadastral DATE NOT NULL,
  motivo_situacao_cadastral INT NOT NULL,
  nome_cidade_exterior VARCHAR(50),
  codigo_natureza_juridica INT NOT NULL,
  data_inicio_atividade DATE NOT NULL,
  cnae_fiscal INT NOT NULL,
  cnae_fiscal_descricao VARCHAR(150) NOT NULL,
  descricao_tipo_logradouro VARCHAR(50) NOT NULL,
  logradouro VARCHAR(150) NOT NULL,
  numero VARCHAR(15) NOT NULL,
  complemento VARCHAR(100) NOT NULL,
  bairro VARCHAR(50) NOT NULL,
  cep INT NOT NULL,
  uf VARCHAR(2) NOT NULL,
  codigo_municipio INT NOT NULL,
  municipio VARCHAR(50) NOT NULL,
  ddd_telefone_1 VARCHAR(20) NOT NULL,
  ddd_telefone_2 VARCHAR(20),
  ddd_fax VARCHAR(20),
  qualificacao_do_responsavel INT NOT NULL,
  capital_social INT NOT NULL,
  porte INT NOT NULL,
  descricao_porte VARCHAR(25) NOT NULL,
  opcao_pelo_simples BOOLEAN NOT NULL,
  data_opcao_pelo_simples DATE,
  data_exclusao_do_simples DATE,
  opcao_pelo_mei BOOLEAN NOT NULL,
  situacao_especial VARCHAR(150),
  data_situacao_especial VARCHAR(50)
);

CREATE TABLE usuarios(
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_empresa INT NOT NULL,
  login varchar(150) NOT NULL,
  senha varchar(150) NOT NULL,
  FOREIGN KEY (id_empresa) REFERENCES empresas(id)
);

CREATE TABLE cnaes_secundarias(
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_empresa INT NOT NULL,
  codigo INT NOT NULL,
  descricao VARCHAR(250) NOT NULL,
  FOREIGN KEY (id_empresa) REFERENCES empresas(id)
);

CREATE TABLE socios(
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_empresa INT NOT NULL,
  identificador_de_socio INT NOT NULL,
  nome_socio VARCHAR(200) NOT NULL,
  cnpj_cpf_do_socio VARCHAR(14),
  codigo_qualificacao_socio INT NOT NULL,
  percentual_capital_social INT NOT NULL,
  data_entrada_sociedade DATE NOT NULL,
  cpf_representante_legal VARCHAR(14),
  nome_representante_legal VARCHAR(200),
  codigo_qualificacao_representante_legal VARCHAR(50),
  FOREIGN KEY (id_empresa) REFERENCES empresas(id)
);