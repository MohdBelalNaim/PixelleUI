<?php
    include_once("../../../config.php");
    include("../../../utils.php");
    session_start();

    $fields = array("email");
    if(validateInput($data,$fields)){
        $otp = rand(1234,9876);
        sendOtp($data['email'],$otp);
        $_SESSION['otp'] = $otp;
    }
    else{
        echo json_encode(["error"=>"All feilds are required!"]);
        die();
    }

?>