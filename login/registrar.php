<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

include "conexiones.php";

// Leer JSON
$data = json_decode(file_get_contents("php://input"), true);

$nombre = $data["nombre"] ?? "";
$correo = $data["correo"] ?? "";
$passRaw = $data["pass"] ?? "";

if(empty($nombre) || empty($correo) || empty($passRaw)){
    echo json_encode(["ok" => false, "mensaje" => "Datos incompletos"]);
    exit;
}

// Verificar si ya existe
$check = $conexion->prepare("SELECT id FROM usuarios WHERE correo = ?");
$check->bind_param("s", $correo);
$check->execute();
if($check->get_result()->num_rows > 0){
    echo json_encode(["ok" => false, "mensaje" => "El correo ya está registrado"]);
    exit;
}

// Hash password
$pass = password_hash($passRaw, PASSWORD_DEFAULT);

// Insertar (usamos 'clave' segun evento.sql)
$stmt = $conexion->prepare("INSERT INTO usuarios(nombre, correo, clave) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $nombre, $correo, $pass);

if($stmt->execute()){
    echo json_encode(["ok" => true, "mensaje" => "Usuario creado con éxito"]);
} else {
    echo json_encode(["ok" => false, "mensaje" => "Error al registrar"]);
}

?>
