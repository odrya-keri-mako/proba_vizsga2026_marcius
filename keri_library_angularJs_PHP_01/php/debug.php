<?php

$type = "get";

switch($type) {

  // Delete
  case 'delete':
    $_POST['data'] = '{"id": 5}';
    break;

  // Insert
  case 'post':
    $_POST['data'] = '{
      "name": "Webprogramozás",
      "genre_id": 9,
      "author": "Ódry Attila",
      "publicated": "2026",
      "description": "Webprogramozás alapjai"
    }';
    break;

  // Modify
  case 'put':
    $_POST['data'] = '{
      "id": 1,
      "name": "A Pál utcai fiúk",
      "genre_id": 2,
      "author": "Molnár Ferenc",
      "publicated": "2026",
      "description": "Módosítva"
    }';
    break;

  // Get
  default:
    $type = 'get';
}

require_once("./{$type}.php");