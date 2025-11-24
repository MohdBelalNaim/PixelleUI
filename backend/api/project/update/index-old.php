<?php
include_once("../../../config.php");
include_once("../../../user_header.php");

if (isset($_POST['name']) && isset($headers['user'])) {
    $dir = "../../../ui";

    $title = $_POST['name'];
    $tags = $_POST['tags'];

    $projectID = $_POST['id'];
    $visibility = $_POST['visibility'];

    $filepath = "$dir/$projectID";


    if (!file_exists($filepath)) {
        mkdir($filepath, 0755, true);
        $query = "INSERT INTO `projects`(`id`, `userid`, `name`, `tags`,`visibility`) values('$projectID', '$userid', '$title', '$tags','$visibility')";
        mysqli_query($conn, $query);
    }

    $files = array();

    var_dump($_POST);
    if (isset($_POST['html'])) {
        $htmlFile = fopen("$filepath/index.html", 'w');
        chmod("$filepath/index.html", 0644);
        fwrite($htmlFile, $_POST['html']);
        fclose($htmlFile);
        $files[] = "index.html";
    }

    if (isset($_POST['css'])) {
        $cssFile = fopen("$filepath/style.css", 'w');
        chmod("$filepath/style.css", 0644);
        fwrite($cssFile, $_POST['css']);
        fclose($cssFile);
        $files[] = "style.css";
    }

    if (isset($_POST['js'])) {
        $jsFile = fopen("$filepath/script.js", 'w');
        chmod("$filepath/script.js", 0644);
        fwrite($jsFile, $_POST['js']);
        fclose($jsFile);
        $files[] = "script.js";
    }

    $files = implode(",", $files);
    var_dump($files);
    $query = "UPDATE `projects` set `files`='$files',`name`='$title',`tags`='$tags',`visibility`='$visibility' where `id`='$projectID' and `userid`='$userid'";
    if (mysqli_query($conn, $query)) {
        echo json_encode(['success' => ['message' => 'File saved successfully!', 'id' => $projectID]]);
    } else {
        echo json_encode(['error' => 'Something went wrong!']);
    }
} else {
    echo json_encode(['error' => 'Required fileds are missing!']);
}
