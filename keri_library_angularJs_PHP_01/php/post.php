<?php
declare(strict_types=1);

// Include environment and hepler
require_once("../../common/php/environment.php");
require_once("./php/helper.php");

// Get arguments (data)
$args = Util::getArgs();

// Validate arguments
validate($args);

// Connect to MySQL server
$db = new Database();

// Check book already exist
if (isBookExist($db, [
      "name" => $args['name'],
      "author" => $args['author'],
      "publicated" => $args['publicated'],
    ])) {

  // Close connection
  $db = null;

  // Set error
  Util::setError('A könyve már létezik!');
}

// Set query
$query = $db->preparateInsert('books', array_keys($args));

// Execute SQL command
$result = $db->execute($query, array_values($args));

// Check success
if (!$result['affectedRows']) {

  // Close connection
  $db = null;

  // Set error
  Util::setError('Nem sikerült felvenni a könyvet!');
}

// Get books
$result = getBooks($db);

// Close connection
$db = null;

// Set response
Util::setResponse($result);