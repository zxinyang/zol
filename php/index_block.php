<?php 
	require 'conn.php';
	$id=$_GET["id"];
	// $id=1;
	$query1="select subtype from classify where blockid=$id";//定义sql语句
	$query2="select path from block where blockid=$id";//定义sql语句

	$result1=mysql_query($query1);
	$result2=mysql_query($query2);

	
	$arr1=array();
	$arr2=array();
	for($i=0;$i<mysql_num_rows($result1);$i++){
		$arr1[$i]=mysql_fetch_array($result1,MYSQL_NUM);
	}
	for($i=0;$i<mysql_num_rows($result2);$i++){
		$arr2[$i]=mysql_fetch_array($result2,MYSQL_ASSOC);
	}

	echo json_encode(array($arr1,$arr2));
 ?>