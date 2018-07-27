<?php 
	require 'conn.php';
	
	$phonenumber=$_POST["phonenumber"];
    $password = $_POST["password"];


	if(!isset($phonenumber) && !isset($password)){
		echo "非法操作";
		exit();
	}

	// $id=1;
	$check="select  phonenumber from users where phonenumber='".mysql_real_escape_string($phonenumber)."'";//定义sql语句

	$result=mysql_query($check);
	
	if(mysql_num_rows($result)>0){
		echo false;
	}
	else{
		$query="insert into users values(null,'$phonenumber','$password')";//定义sql语句
		mysql_query($query);

	}

	// $query = "insert into users values(null,'18867319764','123456a')";

	
	
	// for($i=0;$i<mysql_num_rows($result1);$i++){
	// 	$arr1[$i]=mysql_fetch_array($result1,MYSQL_NUM);
	// }
	// for($i=0;$i<mysql_num_rows($result2);$i++){
	// 	$arr2[$i]=mysql_fetch_array($result2,MYSQL_ASSOC);
	// }

	// echo json_encode(array($arr1,$arr2));
 ?>