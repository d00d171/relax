<?php
    include 'config.php';

    $response = array( 'success' => false );
    $formData = file_get_contents( 'php://input' );
    $data = json_decode( $formData );

    $group = $data->group;
    $name = $data->name;
    $desc = $data->desc;
    $date = $data->date;
    $eventNum = $data ->eventNum;
    $fullPath = $data->fullPath;

    $errors = array();

    if( is_dir($fullPath) ){

        array_push($errors, "Katalog o nazwie " . $fullPath . " juz istnieje");
   
    } else {

        if ( mkdir($fullPath) ) {
            $response[ 'success' ] = true;
        } else {
            array_push($errors, "Nie udało się stworzyć katalogu");
        }

    }


    if(empty($errors)) {
        $json = json_decode(file_get_contents($events_file), true);

        array_unshift($json[$group],
            array(
                "dir" => $eventNum,
                "name" => $name,
                "description" => $desc,
                "date" => $date
            )
        );

        $saveResult = file_put_contents($events_file, json_encode($json, JSON_PRETTY_PRINT));

        if(!$saveResult){
             array_push($errors, "Błąd podczas dodawania wydarzenia");
        }

    }

    $response['errors'] = $errors;
    echo json_encode( $response );
?>