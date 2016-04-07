<?php
	include 'config.php';

	$key = json_decode( file_get_contents( 'php://input' ) ) -> key;
	echo json_encode($key == $adminKey);
?>