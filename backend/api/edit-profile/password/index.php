<?php
include_once("../../../config.php");
include("../../../utils.php");
include("../../../user_header.php");

$new_password = $data["password"];
$query = "UPDATE users SET password='$new_password' WHERE email='$email'";
if ($conn->query($query)) {
    echo json_encode(["success" => "Password updated successfully"]);
} else {
    echo json_encode(["error" => "Something went wrong"]);
}

?>
