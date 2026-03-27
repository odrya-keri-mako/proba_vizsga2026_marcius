<?php
declare(strict_types=1);

// Include environment
require_once("../../common/php/environment.php");

// Connect to MySQL server
$db = new Database();

// Set query
$query = "
  SELECT  `books`.`id`,
          `books`.`name`,
          `books`.`genre_id`,
          `genres`.`name` AS `genre_name`,
          `books`.`author`,
          `books`.`publicated`,
          `books`.`description`
    FROM  `books`
    INNER JOIN `genres`
    ON `genres`.`id` = `books`.`genre_id`
    WHERE  `books`.`valid` = 1;";

// Execute SQL command, and return result
$result['books'] = $db->execute($query);

// Set query
$query = "SELECT `id`, `name` FROM `genres` ORDER BY `name`";

// Execute SQL command, and return result
$result['genres'] = $db->execute($query);

// Close connection
$db = null;

// Set response
Util::setResponse($result);