<?php
$email = $_POST['email'];
$arrays = array();

$mysql = new mysqli('localhost', 'root', 'root', 'create');
$array = ("SELECT * FROM `base_shablons` WHERE `email` = '$email'");

if ($result = $mysql->query($array)) {
    foreach ($result as $row) {
        $count = array();
        array_push($count, $row['data'], $row['name']);
        array_push($arrays, $count);
    }
    echo json_encode($arrays);
}
