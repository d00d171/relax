<?php
	include 'config.php';

	$dir = file_get_contents("php://input");

	$response = array();

	if($dir) {
		foreach(glob($dir.'*') as $filename){
			$path_parts = pathinfo($filename);

		    array_push($response, basename($filename));
		}
	}

	echo json_encode( $response );
?>