<?php
	include 'config.php';

	$string = file_get_contents($events_file);
	echo $string;
?>