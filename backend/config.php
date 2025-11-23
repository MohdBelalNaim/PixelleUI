<?php
//database connection
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
$conn = mysqli_connect("localhost","root","","pixelle-new");
if(!$conn){
    print_r("Cannot connect to database");
    die();
}

$method = isset($method) ? $method : 'POST';
//reading user input
$jsonData = file_get_contents('php://input');
if ($_SERVER['REQUEST_METHOD'] === $method) {
   $data = json_decode($jsonData, true);
}else{
    echo "Invalid request method";
    die();
}
?>