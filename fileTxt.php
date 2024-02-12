<?php
$fileName = 0;
if (0 < $_FILES['file']['error']) {
    echo 'Error: ' . $_FILES['file']['error'] . '<br>';
} else {
    move_uploaded_file($_FILES['file']['tmp_name'], '' . $_FILES['file']['name']);
    $fileName = $_FILES['file']['name'];
}
$text = file($fileName);

$string = implode($text);

print $string;
