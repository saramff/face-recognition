<?php
	$path = 'send/data_sona.txt';
	$fh = fopen($path,"a+");
	$string = $_POST['sona'];
	fwrite($fh,$string." "); // Write information to the file
	fclose($fh); // Close the file
?>
