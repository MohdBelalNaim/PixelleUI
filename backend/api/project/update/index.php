<?php
include_once("../../../config.php");
include_once("../../../user_header.php");

if (isset($_POST['name']) && isset($headers['user'])) {
    $dir = "../../../ui";

    $title = $_POST['name'];
    $tags = isset($_POST['tags']) ? $_POST['tags'] : '';
    $projectID = $_POST['id'];
    $visibility = $_POST['visibility'];

    $filepath = "$dir/$projectID";

    // Use prepared statements for ALL database interactions
    $stmt_insert = $conn->prepare("INSERT INTO `projects`(`id`, `userid`, `name`, `tags`,`visibility`) VALUES (?, ?, ?, ?, ?)");
    $stmt_update = $conn->prepare("UPDATE `projects` SET `files`=?, `name`=?, `tags`=?, `visibility`=? WHERE `id`=? AND `userid`=?");


    if (!file_exists($filepath)) {
        mkdir($filepath, 0755, true);
        $stmt_insert->bind_param("sssss", $projectID, $userid, $title, $tags, $visibility); // Bind parameters
        if (!$stmt_insert->execute()) {
            echo json_encode(['error' => 'Database error: ' . $stmt_insert->error]); // Proper error message
            exit; // Stop execution on error
        }
        $stmt_insert->close();
    }

    $files = [];

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

    $stmt_update->bind_param("ssssss", $files, $title, $tags, $visibility, $projectID, $userid); // Bind parameters
    if ($stmt_update->execute()) {
        echo json_encode(['success' => ['message' => 'File saved successfully!', 'id' => $projectID]]);
    } else {
        echo json_encode(['error' => 'Database update error: ' . $stmt_update->error]); // Proper error message
    }
    $stmt_update->close();
    $conn->close(); // Close the connection

} else {
    echo json_encode(['error' => 'Required fields are missing!']);
}
?>