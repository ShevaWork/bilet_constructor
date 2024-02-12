<?php
// Файлы phpmailer
require 'PHPMailer.min.php';
require 'SMTP.php';
require 'Exception.php';

$email = $_POST['email'];

$title = "Заголовок письма";
$body = "Почта: $email";

// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();
try {
    $mail->isSMTP();
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth = true;
    $mail->SMTPDebug = 2;
    $mail->Debugoutput = function ($str, $level) {$GLOBALS['status'][] = $str;};

    // Настройки вашей почты
    $mail->Host = 'ssl://smtp.gmail.com'; // SMTP сервера вашей почты
    $mail->Username = 'ovshevchuk.praktika'; // Логин на почте
    $mail->Password = 'Olexandr'; // Пароль на почте
    $mail->SMTPSecure = 'ssl';
    $mail->Port = 465;
    $mail->setFrom('ovshevchuk.praktika@gmail.com', 'Suport'); // Адрес самой почты и имя отправителя

    // Получатель письма
    $mail->addAddress('ovshevchuk.fitu18@kubg.edu.ua');

// Отправка сообщения
    $mail->isHTML(true);
    $mail->Subject = $title;
    $mail->Body = $body;

// Проверяем отравленность сообщения
    if ($mail->send()) {$result = "success";} else { $result = "error";}

} catch (Exception $e) {
    $result = "error";
    $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}

// Отображение результата
echo 'Відправлено';
