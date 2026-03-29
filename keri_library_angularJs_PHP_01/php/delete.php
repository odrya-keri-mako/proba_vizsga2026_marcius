<?php
declare(strict_types=1);

// Include environment and hepler
require_once("../../common/php/environment.php");
require_once("./php/helper.php");

// Get arguments
$args = Util::getArgs();

// Validate arguments (NEM KÖTELEZŐ)
validate($args);

// Connect to MySQL server
$db = new Database();

// Set query
$query = "DELETE FROM `books` WHERE `id` = :id";

// Execute SQL command
$result = $db->execute($query, $args);

// Check success
if (!$result['affectedRows']) {

  // Close connection
  $db = null;

  // Set response
  Util::setError('Nem sikerült törölni a könyvet!');
}

// Get books
$result = getBooks($db);

// Close connection
$db = null;

// Set response
Util::setResponse($result);