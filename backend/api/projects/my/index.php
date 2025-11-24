<?php
include_once("../../../config.php");
include("../../../utils.php");
include("../../../user_header.php");


$id = $data['userId'];
$dir = "../../../ui";
$query = "SELECT * from projects where userId='$id'";
$result = $conn->query($query);
$projects = [];
$projects = [];

while ($row = $result->fetch_assoc()) {
    $project_id = $row['id'];
    $project_path = "$dir/$project_id";

    // Default values
    $row['index_html'] = null;
    $row['style_css'] = null;

    // Read index.html if exists
    if (file_exists("$project_path/index.html")) {
        $row['index_html'] = file_get_contents("$project_path/index.html");
    }

    // Read style.css if exists
    if (file_exists("$project_path/style.css")) {
        $row['style_css'] = file_get_contents("$project_path/style.css");
    }

    $projects[] = $row;
}

echo json_encode(['success' => $projects]);

?>
