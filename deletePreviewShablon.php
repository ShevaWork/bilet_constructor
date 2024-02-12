<?php
$email = $_POST['email'];
$name = $_POST['name'];
if (strlen($email) > 0) {
    $mysql = new mysqli('localhost', 'root', 'root', 'create');
    $sql = "DELETE FROM `base_shablons` WHERE `email` = '$email' AND `name`= '$name'";
    if ($mysql->query($sql)) {
        header("Location: /shablon.html");
    } else {
        header("Location: /shablon.html");
        echo '<script>alert("Упс, сталась помилка!")</script>';
        exit;
    }

} else {
    header("Location: /shablon.html");
    echo '<script>alert("Упс, сталась помилка!")</script>';
    exit;
}
