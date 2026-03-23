<?php
declare(strict_types=1);

// Include environment
require_once("../../common/php/environment.php");

// Get arguments
$args = Util::getArgs();

// Validate arguments
Helper::validate($args);

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
$result = Helper::getBooks($db);

// Close connection
$db = null;

// Set response
Util::setResponse($result);