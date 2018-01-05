<?php
header("Access-Control-Allow-Origin:*");
header("Content-type:application/json;Charset:UTF-8");

$conn = new mysqli("localhost","root","","test");

$result = $conn->query("select * from product_details");

$ar = array();

while($row = mysqli_fetch_assoc($result))
{
	$ar[] = $row;
}
$conn->close();
echo json_encode($ar);
?>