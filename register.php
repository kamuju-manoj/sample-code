<?php

$data = json_decode(file_get_contents("php://input"));
$email = $data->email;
$pwd = $data->pwd;
$uname = $data->uname;
$conn = new mysqli("localhost","root","","test");
$sql = "INSERT INTO product_users (uname,password,email,role) VALUES ('$uname','$pwd','$email','customer');";
if($conn->query($sql) === true)
{
	echo "success";
}else{
		echo "fail";
}

?>