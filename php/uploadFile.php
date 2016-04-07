<?php
    include 'class.upload.php';
    include 'config.php';

    $response = array( 'success' => false );
    $errors= array(); 

    $file = new Upload($_FILES['file']);

    if($file->uploaded){
        $data = json_decode(  $_POST["data"] );
        $dir = $data->dir;

        $file->image_resize = true;
        $file->image_ratio_x = true;
        $file->image_y = $gallery_image_height;
        $file->Process($dir);

        if($file->processed){
            $response['success'] = true ;
        } else {
            $errors[] = "Błąd podczas zapisu obrazu: " . $file->file_src_name;
        }
        
    }

    $response['errors'] = $errors;
    echo json_encode( $response );
    
?>