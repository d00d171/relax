<?php
    include 'config.php';

    $response = array( 'success' => false );
    $formData = file_get_contents( 'php://input' );
    $data = json_decode( $formData );

    $name = $data->name;
    $email = $data->email;
    $message = $data->message;
    $phone = $data->phone;

    if ( $email != '' && $message != '' ) {
        $mailTo = $email_address;
        $subject = 'Kontakt za pomoca formularza';
        $body  = 'Od: ' . $name . "\n\n";
        $body .= 'Email: ' . $email . "\n\n";
        $body .= 'Telefon: ' . $phone . "\n\n";
        $body .= "Wiadomosc:\n" . $message . "\n\n\n";

        $success = mail( $mailTo, $subject, $body );

        if ( $success ) {
            $response[ 'success' ] = true;
        }
    }


    echo json_encode( $response );
?>