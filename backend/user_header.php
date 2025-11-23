<?php
$headers = apache_request_headers();
$user = explode("|", $headers['user']);
$email = $user[0];
$userid = $user[1];
?>