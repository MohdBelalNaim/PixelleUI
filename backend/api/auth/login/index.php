<?php
    include_once("../../../config.php");
    include("../../../utils.php");

    $fields = array("email","password");
    if(validateInput($data,$fields)){
        $email = $data["email"];
        $password = $data["password"];
        $initiateLogin = "SELECT * from users where email='$email' and password='$password'";
        $result = $conn->query($initiateLogin);
        $count = mysqli_num_rows($result);
        if($count==1){
            $user = mysqli_fetch_assoc($result);
            unset($user['password']);
            setcookie("email",$user['email']); // 86400 = 1 day
            echo json_encode(["success"=>$user]);
        }
        else{
            echo json_encode(["error"=>"Invalid credentials"]);
            die();
        }
    }
    else{
        echo json_encode(["error"=>"A required field is missing"]);
        die();
    }
?>