<?php

$filename = $_FILES['file']['name'];
$destination = 'assets/img/users/' . $filename;
$my_blob = $_FILES['file']['tmp_name'];

//echo json_encode(array('id' => $_FILES['file']['tmp_name']));


//file_put_contents($destination, $my_blob);
//move_uploaded_file( $_FILES['file']['$ngfBlobUrl'] , $destination );




if(!empty($_FILES)){

    $url = 'http://10.4.40.251:4212/index/searcher';
    $file = '@' . $_FILES['file']['tmp_name'];
    /*print_r($_FILES);
    echo $_FILES['file']['tmp_name'].'<br/>';

    $url = 'http://127.0.0.1:4212/index/searcher';
    $header = array('Content-Type: multipart/form-data');
    $fields = array('file' => '@' . $_FILES['file']['tmp_name']);
    echo $fields['file'].'<br/><br/>';

    // initialisation de la session
    $ch = curl_init();
    // configuration des options
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_HEADER, $header);

    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $fields);

    // exécution de la session
    curl_exec($ch);
    // fermeture des ressources
    curl_close($ch);*/


    exec('curl -X POST --data-binary "'.$file.'" "'.$url.'"',$result);
    echo json_encode($result);

}

?>