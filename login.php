<?php
$data = json_decode(file_get_contents("php://input"));
$email = $data->email;
$pwd = $data->pwd;
//echo $email." ".$pwd;
$conn = new mysqli("localhost","root","","test");
$result = $conn->query("select * from product_users where email = '$email' and password = '$pwd' "); 
$ar = array();
if($result->num_rows > 0)
{
 while($row = mysqli_fetch_assoc($result))
 {
	 $ar = $row;
	echo json_encode($ar);
 }
}else{
	echo "fail";
}
?>