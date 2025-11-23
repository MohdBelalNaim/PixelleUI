<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;
    require 'vendor/autoload.php'; 

    //$serverdata => The data getting submitted to server [associated array]
    //$fields = > Fields your app has [array]

    function validateInput($serverData,$fields){
        foreach($fields as $field ){
            if(!isset($serverData[$field]) || trim($serverData[$field]==='')){
                return false;
            }
        }
        return true;
    }
    //email for account registration
    function sendRegistrationEmail($to,$fullname){
        $mail = new PHPMailer(true);

        try {
            // SMTP Configuration
            $mail->isSMTP();
            $mail->Host       = 'smtp.hostinger.com'; // SMTP Server
            $mail->SMTPAuth   = true;
            $mail->Username   = 'no-reply@pixelle.dev'; // Your email
            $mail->Password   = 'KG9:h-N46ykRr-G'; // Your email password or App Password
            $mail->SMTPSecure = "ssl";
            $mail->Port       = 465;
        
            // Email Settings
            $mail->setFrom('no-reply@pixelle.dev', 'Pixelle'); // Sender
            $mail->addAddress($to, $fullname); // Recipient
            $mail->Subject = 'Welcome to pixelle!';
            $mail->Body    = "Hii ".$fullname." welcome to pixelle, you've entered the world of pixel perfect designs, we'll keep you posted with our latest updates!";
        
            // Send Email
            $mail->send();
        } catch (Exception $e) {
            echo "Email could not be sent. Error: {$mail->ErrorInfo}";
        }
    }


?>