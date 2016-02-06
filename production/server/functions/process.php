<?php

    $to = "diegosephi@gmail.com";
    $from = $_REQUEST['email'];
    $name = $_REQUEST['nome'];
    $headers  = "MIME-Version: 1.0\n";
    $headers .= "Content-type: text/html; charset=iso-8859-1\n";
    $headers = "From: $from";
    $subject = "Website Sagra";

    $fields = array();
    $fields{"nome"} = "nome";
    $fields{"email"} = "email";
    $fields{"mensagem"} = "mensagem";

    $body = "Esta é a mensagem que foi enviada:\n\n"; foreach($fields as $a => $b){   $body .= sprintf("%20s: %s\n",$b,$_REQUEST[$a]); }

    $send = mail($to, $subject, $body, $headers);

?>
