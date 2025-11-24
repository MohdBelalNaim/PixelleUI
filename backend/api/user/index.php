<?php
$method = 'POST';
include_once("../../config.php");
include_once("../../user_header.php");

if(isset($headers['user'])){
    $sql = "SELECT * FROM users where email='$email' and id='$userid'";
    $res = mysqli_query($conn, $sql);
    if(mysqli_num_rows($res)) {
        $row = mysqli_fetch_assoc($res);
        unset($row['password']);
        echo json_encode(['success'=>$row]);
    }else{
        echo json_encode(['error'=>'Unauthorize']);
    }
}else{
    echo json_encode(['error'=>'Unauthorize']);
}
?>