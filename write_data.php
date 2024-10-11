<?php
// Mostrar errores de PHP en pantalla
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Decodificar los datos JSON enviados desde el experimento
$post_data = json_decode(file_get_contents('php://input'), true);

// Guardar los archivos en la carpeta "data"
$logfile = 'data/error_log.txt';  // Guardar el log en la carpeta "data"
$name = $post_data['filename'].".csv";  // Usar el nombre del archivo tal como viene del JavaScript

// Verificar si se han recibido los datos
if (!$post_data) {
    file_put_contents($logfile, "Error: No se han recibido datos en la solicitud POST\n", FILE_APPEND);
    exit("Error: No se han recibido datos");
}

// Registrar que se han recibido los datos
file_put_contents($logfile, "Datos recibidos. Nombre del archivo: ".$name."\n", FILE_APPEND);

// Intentar escribir los datos en el archivo y registrar el resultado en el archivo de log
if(file_put_contents($name, $post_data['filedata']) === false) {
    file_put_contents($logfile, "Error al escribir los datos en el archivo: ".$name."\n", FILE_APPEND);
    exit("Error al guardar los datos");
} else {
    file_put_contents($logfile, "Datos guardados correctamente en: ".$name."\n", FILE_APPEND);
    echo "Datos guardados con éxito";
}
?>