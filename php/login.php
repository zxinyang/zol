<?php 
	require 'conn.php';
	
	$username=$_POST["username"];
	$password = $_POST["password"];

	if(!isset($username)){
		echo "非法操作";
		exit();
	}

	$query="select  * from users where phonenumber='".mysql_real_escape_string($username)."' and "."passwd='".mysql_real_escape_string($password)."'";//定义sql语句

	$result=mysql_query($query);
	
	
	if(mysql_num_rows($result)==1){
		echo 1;
	}
	else{
		echo false;
	}
 ?>