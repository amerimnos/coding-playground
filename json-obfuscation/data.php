<?php
// JSON 데이터를 가져옵니다.
$jsonData = file_get_contents('./source/data.json');

// JSON 데이터를 파싱합니다.
$json = json_decode($jsonData, true);

// 응답을 나눌 offset과 limit 값을 가져옵니다.
$offset = isset($_GET['offset']) ? intval($_GET['offset']) : 0;
$limit = isset($_GET['limit']) ? intval($_GET['limit']) : 2;

// 전체 데이터의 일부를 구합니다.
$data = array_slice($json, $offset, $limit);

// 응답의 MIME 타입을 설정합니다.
header('Content-Type: application/json');


// 직접적인 URL 접근을 차단합니다.
if (!isset($_SERVER['HTTP_REFERER'])) {
    http_response_code(403);
    die('Direct access not allowed');
}

// 응답을 보냅니다.
echo json_encode($data);
