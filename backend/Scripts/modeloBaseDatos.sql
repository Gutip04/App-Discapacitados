-- Script MYSQL WORKBENCH TABLA pacientes
-- Crear la base de datos solo si no existe
CREATE DATABASE IF NOT EXISTS app_discapacitacion;
USE app_discapacitacion;

-- TABLAS AUXILIARES
CREATE TABLE IF NOT EXISTS zona (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre ENUM('Urbana', 'Rural') NOT NULL
);

CREATE TABLE IF NOT EXISTS barrio (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  zona_id INT NOT NULL,
  FOREIGN KEY (zona_id) REFERENCES zona(id)
);

CREATE TABLE IF NOT EXISTS vereda (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  zona_id INT NOT NULL,
  FOREIGN KEY (zona_id) REFERENCES zona(id)
);

CREATE TABLE IF NOT EXISTS eps (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS sexo (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre ENUM('Masculino', 'Femenino') NOT NULL
);

CREATE TABLE IF NOT EXISTS grupo_etnico (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS tipo_discapacidad (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS grado_estudio (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL
);



CREATE TABLE IF NOT EXISTS victima (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS estado_vida (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre ENUM('Vivo', 'Fallecido') NOT NULL
);

CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    rol ENUM('superAdmin','admin', 'usuario') DEFAULT 'usuario',
    activo TINYINT(1) DEFAULT 1,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- TABLA PRINCIPAL: paciente
CREATE TABLE IF NOT EXISTS paciente (
  id INT AUTO_INCREMENT PRIMARY KEY,
  estado_vida_id INT, 
  fecha_seguimiento DATE,
  fecha_visita DATE,
  identificacion BIGINT NOT NULL UNIQUE,
  nombres_apellidos VARCHAR(150) NOT NULL,
  fecha_nacimiento DATE NOT NULL,
  trabaja BOOLEAN DEFAULT FALSE,
  estudia BOOLEAN DEFAULT FALSE,
  sexo_id INT,
  telefono VARCHAR(20),
  direccion VARCHAR(150),
  zona_id INT,
  barrio_id INT,
  vereda_id INT,
  cuidador VARCHAR(100),
  sustento BOOLEAN DEFAULT FALSE,
  eps_id INT,
  tipo_discapacidad_id INT,
  diagnostico_discapacidad TEXT,
  grupo_etnico_id INT,
  victima_id INT,
  vivienda BOOLEAN DEFAULT FALSE,
  grado_estudio_id INT,
  cultura_recreacion BOOLEAN DEFAULT FALSE,
  dispositivo VARCHAR(100),
  observaciones TEXT,
  FOREIGN KEY (estado_vida_id) REFERENCES estado_vida(id),
  FOREIGN KEY (sexo_id) REFERENCES sexo(id),
  FOREIGN KEY (zona_id) REFERENCES zona(id),
  FOREIGN KEY (barrio_id) REFERENCES barrio(id),
  FOREIGN KEY (vereda_id) REFERENCES vereda(id),
  FOREIGN KEY (eps_id) REFERENCES eps(id),
  FOREIGN KEY (tipo_discapacidad_id) REFERENCES tipo_discapacidad(id),
  FOREIGN KEY (grupo_etnico_id) REFERENCES grupo_etnico(id),
  FOREIGN KEY (victima_id) REFERENCES victima(id),
  FOREIGN KEY (grado_estudio_id) REFERENCES grado_estudio(id)
  
);
ALTER TABLE sexo ADD UNIQUE(nombre);
ALTER TABLE zona ADD UNIQUE(nombre);
ALTER TABLE eps ADD UNIQUE(nombre);
ALTER TABLE tipo_discapacidad ADD UNIQUE(nombre);
ALTER TABLE grupo_etnico ADD UNIQUE(nombre);
ALTER TABLE grado_estudio ADD UNIQUE(nombre);
ALTER TABLE victima ADD UNIQUE(nombre);
ALTER TABLE barrio ADD UNIQUE(nombre);
ALTER TABLE vereda ADD UNIQUE(nombre);
ALTER TABLE estado_vida ADD UNIQUE(nombre);

### Añadir columna victima
ALTER TABLE paciente 
ADD COLUMN victima BOOLEAN DEFAULT 0 AFTER victima_id;
