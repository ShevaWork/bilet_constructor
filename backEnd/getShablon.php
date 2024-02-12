<?php
$name = $_POST['name'];
$email = $_POST['email'];

$mysql = new mysqli('localhost','root','root','create');
$result = $mysql-> query("SELECT * FROM `base_shablons` WHERE `email` = '$email' AND `name`= '$name'");
$shablon = $result->fetch_assoc();
echo json_encode($shablon);
