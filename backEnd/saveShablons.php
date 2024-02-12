<?php
$university = $_POST['university'];
$facultet = $_POST['facultet'];
$specialnist = $_POST['specialnist'];
$specializaciya = $_POST['specializaciya'];
$osv_prog = $_POST['osv_prog'];
$okr = $_POST['okr'];
$duscuplina = $_POST['duscuplina'];
$zatver = $_POST['zatver'];
$protokol = $_POST['protokol'];
$dekan = $_POST['dekan'];
$dekanpib = $_POST['dekanpib'];
$prep = $_POST['prep'];
$preppib = $_POST['preppib'];
$name_shablon = $_POST['name_shablon'];
$email = $_POST['email'];
$date = date('Y-m-d');

$mysql = new mysqli('localhost', 'root', 'root', 'create');
$add = "INSERT INTO `base_shablons` (`email`, `name`,`data`, `ynik`,`facultet`, `specialnist`,`specializaciya`, `osvprog`,
`okr`, `dusc`,`rozglyznuto`, `protokol`,`dekan`, `dekanpib`,`prep`, `prepib`)VALUES('$email', '$name_shablon', '$date', '$university',
'$facultet', '$specialnist', '$specializaciya', '$osv_prog', '$okr', '$duscuplina', '$zatver', '$protokol', '$dekan', '$dekanpib',
'$prep', '$preppib')";

if ($mysql->query($add)) {
    $mysql->close();
    echo 'true';
} else {
    echo 'false';
}
