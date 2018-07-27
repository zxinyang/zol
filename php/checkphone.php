<?php 
	require 'conn.php';
	
	$phonenumber=$_POST["phonenumber"];

	if(!isset($phonenumber)){
		echo "非法操作";
		exit();
	}

	$query="select  phonenumber from users where phonenumber='".mysql_real_escape_string($phonenumber)."'";//定义sql语句

	$result=mysql_query($query);
	
	if(mysql_num_rows($result)>0){
		echo 1;
	}
	else{
		echo false;
	}
 ?>