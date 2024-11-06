<?php
	$path = 'send/data.txt';
	$fh = fopen($path,"a+");
	$string = $_POST['address'];
	fwrite($fh,$string." "); // Write information to the file
	fclose($fh); // Close the file
?>
