<?php
include_once("../../../config.php");
include_once("../../../user_header.php");


if (isset($_POST['name']) && isset($_FILES['files']) && isset($headers['user'])) {
    $title = $_POST['name'];
    
    $tags = isset($_POST['tags']) ? $_POST['tags'] : '';

    // uploading files
    if (isset($_FILES['files'])) {
        $dir = "../../../ui";
        if (!file_exists($dir)) mkdir($dir);

        $projectID = isset($_POST['id']) ? $_POST['id'] : uniqid();
        $visibility = isset($_POST['visibility']) ? $_POST['visibility'] : 'public';

        $filepath = "$dir/$projectID";
        $files = array();

        $uploaded = false;
        if (!file_exists($filepath)) {
            mkdir($filepath, 0755, true);

            if (is_array($_FILES['files']['name'])) {
                for ($file = 0; $file < count($_FILES['files']['name']); $file++) {
                    $name = $_FILES['files']['name'][$file];
                    if (str_ends_with($name, 'htm') || str_ends_with($name, 'html')) {
                        $name = 'index.html';
                    }
                    $files[] = $name;
                    $temp_name = $_FILES['files']['tmp_name'][$file];
                    if (move_uploaded_file($temp_name, "$filepath/$name")) {
                        $uploaded = true;
                    } else $uploaded = false;
                }
            } else {
                $name = $_FILES['files']['name'];
                $files[] = $name;
                $temp_name = $_FILES['files']['tmp_name'];
                if (move_uploaded_file($temp_name, "$filepath/$name")) {
                    $uploaded = true;
                } else $uploaded = false;
            }
            if ($uploaded) {
                // updating in data base
                $files = implode(",", $files);
                $query = "INSERT INTO `projects`(`id`, `userid`, `files`, `name`, `tags`,`visibility`) values('$projectID', '$userid', '$files', '$title', '$tags','$visibility')";
                if (mysqli_query($conn, $query)) {
                    echo json_encode(['success' => ['message' => 'File uploaded successfully!', 'id' => $projectID]]);
                } else {
                    echo json_encode(['error' => 'Something went wrong!']);
                }
            } else {
                echo json_encode(['error' => 'File not uploaded!']);
            }
        } else {
            echo json_encode(['error' => 'Folder already exists!']);
        }
    }
} else {
    echo json_encode(['error' => 'Required fileds are missing!']);
}
