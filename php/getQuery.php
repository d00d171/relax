<?php
	include 'config.php';

	$strSQL = file_get_contents("php://input");

	$response = array('success' => false);

	if($strSQL) {
		mysql_connect($db_host, $db_username, $db_password) or die (mysql_error ());

		mysql_select_db($db_name) or die(mysql_error());

		$rs = mysql_query($strSQL);
		
		while($row = mysql_fetch_array($rs, MYSQL_ASSOC)) {
			array_push($response, $row);
		}

		$response[ 'success' ] = true;

		mysql_close();
	} else {
		$response[ 'success' ] = false;
	}

	echo json_encode( $response );
?>