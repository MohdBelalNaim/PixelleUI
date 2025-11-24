<?php

    include_once("../../../config.php");
    include("../../../utils.php");
    include("../../../user_header.php");
    if(isset($_GET['id'])){
        $id = $_GET['id'];
        $getData = "SELECT * from users where id = '$id'";
        $result = $conn->query($getData);
        $row = mysqli_fetch_assoc($result);
        print_r(json_encode($row));
    }
    else{
        echo (json_encode(["error"=>"A required parameter was missing"]));
    }
   
?>