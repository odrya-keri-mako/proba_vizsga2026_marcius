<?php
declare(strict_types=1);

// Include environment and hepler
require_once("../../common/php/environment.php");
require_once("./php/helper.php");

// Connect to MySQL server
$db = new Database();

// Get books
$result['books'] = getBooks($db);

// Get genres
$result['genres'] = getGenres($db);

// Close connection
$db = null;

// Set response
Util::setResponse($result);