<?php
// JSON 파일을 가져옵니다.
$json = file_get_contents('./source/data.json');

// JSON 문자열을 배열로 변환합니다.
$data = json_decode($json, true);

// 배열의 길이를 파악합니다.
$length = count($data);

// 결과를 출력합니다.
echo $length;
