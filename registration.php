<?php
$email = filter_var(trim($_POST['email']), FILTER_VALIDATE_EMAIL);
$password = filter_var(trim($_POST['password']), FILTER_SANITIZE_EMAIL);
if (mb_strlen($email) < 5 || mb_strlen($email) > 90) {
    echo "Недопустимая длина имейла";
    exit();
} else if (mb_strlen($password) < 2 || mb_strlen($password) > 10) {
    echo "Недопустимая длина пароля (от 3 до 9 символов)";
    exit();
}
$password = md5($password . "diplom");

$mysql = new mysqli('localhost', 'root', 'root', 'create');
$add = "INSERT INTO `base_diplom` (`email`, `password`)VALUES('$email', '$password')";
if ($mysql->query($add)) {
    $mysql->close();
    echo 'true';
} else {
    echo 'false';
}
