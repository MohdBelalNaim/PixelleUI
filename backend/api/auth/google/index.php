<?php
    include_once("../../../config.php");
    require("../../../utils.php");

    $fields = array("name","email","sub");
    
    if(validateInput($data,$fields)){
        $email = $data['email'];
        $name = $data['name'];
        $id = $data['id'];
        $sub = $data['sub'];   // google unique id
        $picture = $data['picture'];
        
        //checking is account exists already
        $checkExists = "SELECT * FROM users where email='$email'";
        $result = $conn->query($checkExists);
        $rowCount = mysqli_num_rows($result);
        
        if($rowCount) {
            $user = mysqli_fetch_assoc($result);
            if(!strlen($user['sub'])) {
                $updateQuery = "UPDATE users SET sub='$sub',picture='$picture' where email='$email'";
                //update google id i.e. sub
                if($conn->query($updateQuery)){
                    echo json_encode(["success"=>$user]);
                }else{
                    echo json_encode(["error"=>"Something went wrong!"]);
                }
            }   
            else {
                if($user['picture']!=$picture) {
                    $updateQuery = "UPDATE users SET picture='$picture' where email='$email' or sub='$sub'";
                    if($conn->query($updateQuery)){
                        echo json_encode(["success"=>$user]);
                    }
                }
                //update google id i.e. sub
                echo json_encode(["success"=>$user]);
            }
        }else{
            $username =  str_replace(" ","",$name).rand(100,999);
            $insertQuery = "INSERT INTO users(`id`,`name`,`username`,`email`,`sub`,`picture`) values ('$id','$name','$username','$email','$sub','$picture')";
            //save user
            if($conn->query($insertQuery)){
                sendRegistrationEmail($email,$name);
                echo json_encode(["success"=>[
                    'id'=>$id,
                    'name'=>$name,
                    'username'=>$username,
                    'email'=>$email,
                    'sub'=>$sub,
                    'picture'=>$picture,
                ]]);
            }
            else {
                echo json_encode(["error"=>"Something went wrong!!"]);
            }
        }
    }
    else{
        echo json_encode(["error"=>"A required field is missing"]);
    }
?>