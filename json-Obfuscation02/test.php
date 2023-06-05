<?php
$encryptedString = $_POST['encryptedString']; // 전달된 암호화된 데이터를 받습니다.

// 디코딩된 암호화된 데이터
// $decodedData = base64_decode($encryptedString);

// test.dat 파일에 데이터 저장
$file = fopen('test.dat', 'wt');
fwrite($file, $encryptedString);
fclose($file);
?>
