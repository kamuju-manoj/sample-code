<?php
//header("Access-Control-Allow-Origin:*");
//header("Content-type:application/json;Charset:UTF-8");
$data = json_decode(file_get_contents("php://input"));
$title = $data->title;
$price = $data->price;
$avail = $data->availability;
$category = $data->category;
//0.echo $title." ".$price." ".$avail;
$conn = new mysqli("localhost","root","","test");
$sql = "INSERT INTO product_details (product_name,product_price,product_availability,category) VALUES ('$title','$price','$avail','$category');";
if($conn->query($sql) === true)
{
	echo "success";
}else{
		echo "fail";
}
?>