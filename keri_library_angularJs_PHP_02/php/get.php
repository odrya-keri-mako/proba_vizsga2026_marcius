<?php
declare(strict_types=1);

// Include environment
require_once("../../common/php/environment.php");

// Connect to MySQL server
$db = new Database();

// Get books
$result['books'] = Helper::getBooks($db);

// Get genres
$result['genres'] = Helper::getGenres($db);

// Close connection
$db = null;

// Set response
Util::setResponse($result);