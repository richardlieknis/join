<?php

########### CONFIG ###############

# $recipient = 'Shawnkastner@hotmail.de';
# $redirect = 'index.html';

########### CONFIG END ###########



########### Intruction ###########   
#
#   This script has been created to send an email to the $recipient
#   
#  1) Upload this file to your FTP Server
#  2) Send a POST rewquest to this file, including
#     [name] The name of the sender (Absender)
#     [message] Message that should be send to you
#
##################################



###############################
#
#        DON'T CHANGE ANYTHING FROM HERE!
#
#        Ab hier nichts mehr ändern!
#
###############################

switch ($_SERVER['REQUEST_METHOD']) {
    case ("OPTIONS"): //Allow preflighting to take place.
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: POST");
        header("Access-Control-Allow-Headers: content-type");
        exit;
    case ("POST"): //Send the email;
        header("Access-Control-Allow-Origin: *");

        $email = $_POST['email'];

        $message = "Hello, \n
        \nFollow this link to reset your Password for your " . $email . "account.\n
        \nhttps://gruppe-join-422.developerakademie.net/join/html/forgot-password.html?email=" . $email . "\n
        \nIf you didn't ask to reset your password, you can ignore this email.\n
        \nThanks,\n
        \nYour Join-422 team\n";

        $recipient = $email;
        $subject = "Reset your Password for JOIN" . $_POST['Join'];
        $headers = "From:  gruppe-422@join.de";

        mail($recipient, $subject, $message, $headers);
        print($result);
        #header("Location: " . $redirect); 

        break;
    default: //Reject any non POST or OPTIONS requests.
        header("Allow: POST", true, 405);
        exit;
}
