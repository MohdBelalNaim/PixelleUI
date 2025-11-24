<?php
$method = 'GET';
include_once("../../../config.php");
include_once("../../../user_header.php");

if (isset($_GET['id'])) {
    $id = $_GET['id'];
    $query = "DELETE FROM `projects` where `userid`='$userid' and `id`='$id'";
    if (mysqli_query($conn, $query)) {
        $dir = "../../../ui";
        $filepath = "$dir/$id";

        if (is_dir($filepath)) {
            $files = scandir($filepath);
            unset($files[0]);
            unset($files[1]);
            foreach ($files as $file) {
                var_dump($file);
                unlink($filepath . "/" . $file);
            }
            rmdir($filepath);
        }

        echo json_encode(['success' => 'Project deleted successfully!']);
    } else {
        echo json_encode(['success' => 'Something went wrong!']);
    }
} else {
    echo json_encode(['success' => 'Bad credentials!']);
}
