<?php
    include_once("../../../config.php");
    include("../../../utils.php");
    include("../../../user_header.php");

    $name = $data["name"];
    $bio = $data["bio"];
    $city = $data["city"];
    $state = $data["state"];
    $query = "UPDATE users set name='$name',bio='$bio', city='$city', state='$state' where email = '$email'";
    if($conn->query($query)){
        echo json_encode(["success"=>"Profile updated succesfully"]);
    }
    else{
        echo json_encode(["error"=>"Something went wrong"]);
    }
?>