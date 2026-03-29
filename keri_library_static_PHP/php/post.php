<?php
declare(strict_types=1);

// Include environment
require_once("../../common/php/environment.php");

// Get arguments (data)
$args = Util::getArgs();

// Connect to MySQL server
$db = new Database();

// Set query
$query = "
  SELECT  `id`
    FROM  `books`
    WHERE `name` = :name AND
          `author` = :author AND 
          `publicated` = :publicated";

// Execute SQL command
$result = $db->execute($query, [
            "name" => $args['name'],
            "author" => $args['author'],
            "publicated" => $args['publicated'],
          ]);

// Check result
if (!is_null($result)) {

  // Close connection
  $db = null;

  // Set error
  Util::setError('A könyve már létezik!');
}

// Set query
$query = "INSERT INTO `books` 
          (`name`,`genre_id`,`author`,`publicated`,`description`) 
          VALUES 
          (:name, :genre_id, :author, :publicated, :description);";

// Execute SQL command
$result = $db->execute($query, $args);

// Check success
if (!$result['affectedRows']) {

  // Close connection
  $db = null;

  // Set error
  Util::setError('Nem sikerült felvenni a könyvet!');
}

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
$result = $db->execute($query);

// Close connection
$db = null;

// Set response
Util::setResponse($result);