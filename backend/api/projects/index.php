<?php
$method = 'GET';
include_once("../../config.php");
include_once("../../user_header.php");

$query = "SELECT projects.*,users.name as user,picture  FROM `projects`,`users` where visibility='public' and userid=users.id";

if (isset($_GET['user'])) {
    $userid = $_GET['user'];
    $query = "SELECT projects.*,users.name as user,picture  FROM `projects`,`users` where userid=users.id and userid='$userid'";
} else if (isset($_GET['id'])) {
    $id = $_GET['id'];
    $query = "SELECT * FROM `projects` where `userid`='$userid' and `id`='$id'";
}

$results = array();
$res = mysqli_query($conn, $query);
if (mysqli_num_rows($res)) {
    while ($row = mysqli_fetch_assoc($res)) {
        $results[] = $row;
    }
    echo json_encode(['success' => $results]);
} else {
    echo json_encode(['success' => 'No result found!']);
}
