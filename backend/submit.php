<?php
  date_default_timezone_set('America/New_York');
  define('ADMIN_EMAIL', 'info@nucleus.technology');

  $errors = array();
  if ($_POST['name'] == '') {
    $errors[] = array(
      'msg' => 'Please enter your name',
      'field' => 'name'
    );
  }
  if ($_POST['email'] == '') {
    $errors[] = array(
      'msg' => 'Please enter your email address',
      'field' => 'email'
    );
  }
  if ($_POST['message'] == '') {
    $errors[] = array(
      'msg' => 'Please enter your message',
      'field' => 'message'
    );
  }
  $result = array(
    'errors' => $errors,
    'success' => true
  );
  if (count($errors) > 0) {
    $result['success'] = false;
  }
  else {
    require '../vendor/autoload.php';

    $transporter = Swift_SmtpTransport::newInstance('smtp.gmail.com', 465, 'ssl')
       ->setUsername($this->info@nucleus.technology)
       ->setPassword($this->);

    $transport = Swift_MailTransport::newInstance();

    // Create the Mailer using your created Transport
    $mailer = Swift_Mailer::newInstance($transport);

    // Create a message
    $message = Swift_Message::newInstance('New message from nucleus landing')
      ->setFrom(array('no-reply@example.com'))
      ->setTo(array(ADMIN_EMAIL))
      ->setBody(
        '<p><b>Name:</b>' . htmlspecialchars($_POST['name']) . '</b></p>' .
          '<p><b>Email:</b>' . htmlspecialchars($_POST['email']) . '</b></p>' .
          '<p><b>Message:</b>' . htmlspecialchars($_POST['message']) . '</b></p>',
        'text/html'
      );

    // Send the message
    // $result = $mailer->send($message);
  }
  echo json_encode($result);