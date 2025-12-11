CREATE DATABASE eventos;
USE eventos;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(80),
    correo VARCHAR(120) UNIQUE,
    clave VARCHAR(255)
);
