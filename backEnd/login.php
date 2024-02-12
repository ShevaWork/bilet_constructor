<?php
$email = filter_var(trim($_POST['email']), FILTER_VALIDATE_EMAIL);
$password = filter_var(trim($_POST['password']), FILTER_SANITIZE_EMAIL);
$password = md5($password . "diplom");
$mysql = new mysqli('localhost', 'root', 'root', 'create');

$result = $mysql->query("SELECT * FROM `base_diplom` WHERE `email` = '$email'
    AND `password` = '$password'");
$user = $result->fetch_assoc();
if (count($user) == 0) {
    echo "Такого користувача не існує";
    exit();
}

setcookie('user', $user['email'], time() + 60 * 60 * 24, "/");
$mysql->close();
echo 'true';
