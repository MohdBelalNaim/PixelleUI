<?php
    include_once("../../../config.php");
    include("../../../utils.php");
    include("../../../user_header.php");

    $links = $data["links"];
    $query = "UPDATE users set links='$links' where email='$email'";
    if($conn->query($query)){
        echo json_encode(["success"=>"Links updated succesfully"]);
    }
    else{
        echo json_encode(["error"=>"Something went wrong"]);
    }
?>