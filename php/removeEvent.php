<?php
    include 'config.php';

    $response = array( 'success' => false );
    $formData = file_get_contents( 'php://input' );
    $data = json_decode( $formData );

    $fullPath = $data->fullPath;
    $group = $data->group;
    $index = $data->index;

    $errors = array();

    if( !is_dir($fullPath) ){

        array_push($errors, "Katalog o nazwie " . $fullPath . " nie istnieje");
   
    } else {

        $json = json_decode(file_get_contents($events_file), true);

        $group_content = $json[$group];
        unset($group_content[$index]);
        $json[$group] = array_values($group_content);

        $saveResult = file_put_contents($events_file, json_encode($json, JSON_PRETTY_PRINT));

        if(!$saveResult){
             array_push($errors, "Błąd podczas usuwania wydarzenia");
        }

        
        if(empty($errors)) {

            $fullPath .= '/';

            $files = glob($fullPath . '*', GLOB_MARK);

            foreach ($files as $file) {
                if (is_dir($file)) {
                    self::deleteDir($file);
                } else {
                    unlink($file);
                }
            }

            rmdir($fullPath);

        }
        

    }

    $response['errors'] = $errors;
    echo json_encode( $response );
?>