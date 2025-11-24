<?php
include_once("../../../config.php");
require("../../../utils.php");

    $fields = array("name","email","password","id");
    
    if(validateInput($data,$fields)){
        $email = $data['email'];
        $password = $data['password'];
        $name = $data['name'];
        $id = $data['id'];
    
        //checking is account exists already
        $checkExists = "SELECT * FROM users where email='$email'";
        $result = $conn->query($checkExists);
        $rowCount = mysqli_num_rows($result);

    if ($rowCount > 0) {
        echo json_encode(["error" => "This email is already in use!"]);
    } else {
        //generating username
        $username =  str_replace(" ", "", $name) . rand(100, 999);
        $insertQuery = "INSERT INTO users(`id`,`name`,`username`,`email`,`password`) values ('$id','$name','$username','$email','$password')";
        //save user
        if ($conn->query($insertQuery)) {
            // sendRegistrationEmail($email, $name);
            echo json_encode(["success" => "Account created!"]);
        } else {
            echo json_encode(["error" => "Something went wrong!"]);
        }
    }
} else {
    echo json_encode(["error" => "A required field is missing"]);
}
