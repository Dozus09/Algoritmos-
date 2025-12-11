<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *"); 

$data = json_decode(file_get_contents("php://input"), true);

include "conexiones.php";

$correo = $data["correo"];
$pass = $data["pass"];

// Buscar usuario (usamos 'clave' segun evento.sql)
$query = $conexion->prepare("SELECT id, nombre, clave FROM usuarios WHERE correo = ?");
$query->bind_param("s", $correo);
$query->execute();
$result = $query->get_result();

if ($result->num_rows == 0) {
    echo json_encode(["ok" => false, "mensaje" => "Usuario no encontrado"]);
    exit;
}

$row = $result->fetch_assoc();

// Verificar contraseña con 'clave'
if (password_verify($pass, $row["clave"])) {
    echo json_encode([
        "ok" => true, 
        "mensaje" => "Inicio de sesión correcto",
        "usuario" => $row["nombre"]
    ]);
} else {
    echo json_encode(["ok" => false, "mensaje" => "Contraseña incorrecta"]);
}

?>
