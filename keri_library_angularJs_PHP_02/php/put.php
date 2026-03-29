<?php
declare(strict_types=1);

// Include environment
require_once("../../common/php/environment.php");

// Get arguments (data)
$args = Util::getArgs();

// Validate arguments (NEM KÖTELEZŐ)
Helper::validate($args);

// Connect to MySQL server
$db = new Database();

// Check book already exist
if (Helper::isBookExist($db, [
      "name" => $args['name'],
      "author" => $args['author'],
      "publicated" => $args['publicated'],
      "id" => $args['id'],
    ])) {

  // Close connection
  $db = null;

  // Set error
  Util::setError('A könyve már létezik!');
}

// Set query
$query  = $db->preparateUpdate('books', array_keys($args), 'id');
$query .= " WHERE `id` = :id;";

// Execute SQL command
$result = $db->execute($query, $args);

// Check success
if (!$result['affectedRows']) {

  // Close connection
  $db = null;

  // Set response
  Util::setError('Nem sikerült módosítani a könyvet!');
}

// Get books
$result = Helper::getBooks($db);

// Close connection
$db = null;

// Set response
Util::setResponse($result);