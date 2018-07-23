<?php 
	require 'conn.php';
	$id=$_GET["id"];
	// $id=1;
	$query1="select subtype from classify where blockid=$id";//定义sql语句
	$query2="select path from block where blockid=$id";//定义sql语句

	$result1=mysql_query($query1);//执行sql语句，返回记录集。
	$result2=mysql_query($query2);//执行sql语句，返回记录集。

	//mysql_query("select * from student")

	//4.输出记录:MYSQL_ASSOC:输出字符串下标、MYSQL_NUM:数字下标
	//print_r(mysql_fetch_array($result,MYSQL_ASSOC));//获取第一条记录,结果是数组
	//print_r(mysql_fetch_array($result,MYSQL_ASSOC));//获取第二条记录,结果是数组

	//echo mysql_num_rows($result); //获取记录集的条数。

	//5.如何输出接口
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