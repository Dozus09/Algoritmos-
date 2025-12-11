<?php

$host = "localhost";
$usuario = "root";
$clave = "";
$bd = "eventos";

// 1. Conectar a MySQL sin especificar base de datos
$conexion = new mysqli($host, $usuario, $clave);

if ($conexion->connect_error) {
    die(json_encode(["ok" => false, "mensaje" => "Error de conexión al servidor: " . $conexion->connect_error]));
}

// 2. Crear base de datos si no existe
$sqlCrearBD = "CREATE DATABASE IF NOT EXISTS $bd";
if (!$conexion->query($sqlCrearBD)) {
    die(json_encode(["ok" => false, "mensaje" => "Error creando BD: " . $conexion->error]));
}

// 3. Seleccionar la base de datos
$conexion->select_db($bd);

// 4. ASEGURARNOS QUE LA TABLA EXISTA
$sqlCrearTabla = "CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(80),
    correo VARCHAR(120) UNIQUE,
    clave VARCHAR(255)
)";

if (!$conexion->query($sqlCrearTabla)) {
    die(json_encode([
        "ok" => false,
        "mensaje" => "Error al crear tabla: " . $conexion->error
    ]));
}

?>
