<?php
declare(strict_types=1);

class Helper {

  // Get books
  public static function getBooks(Database $db): ?array {

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
    return $db->execute($query);
  }

  // Get genres
  public static function getGenres(Database $db): ?array {

    // Set query
    $query = "SELECT `id`, `name` FROM `genres` ORDER BY `name`";

    // Execute SQL command, and return result
    return $db->execute($query);
  }

  // Check book already exist
  public static function isBookExist(Database $db, array $args): bool {

    // Set query
    $query = "
    SELECT  `id`
      FROM  `books`
      WHERE `name` = :name AND
            `author` = :author AND 
            `publicated` = :publicated";

    // Check identifier exist (modify)
    if (isset($args['id'])) {

      // Preparate query
      $query .= " AND `id` != :id";
    }

    // Execute SQL command
    $result = $db->execute($query, $args);

    // Return result
    return !is_null($result);
  }

  // Validate arguments
  public static function validate(array $args): void {

    // Check identifier
    if (isset($args['id'])) {
      if (gettype($args['id']) !== 'integer' ||
                  $args['id']   <= 0)
      Util::setError('Hibás könyv azonosító');
    }
    if (isset($args['name'])) {
      if (gettype($args['name']) !== 'string' ||
           strlen(trim($args['name'])) < 2)
      Util::setError('Hibás könyv név!');
    }
    if (isset($args['genre_id'])) {
      if (gettype($args['genre_id']) !== 'integer' ||
                  $args['genre_id']   <= 0)
      Util::setError('Hibás múfaj azonosító!');
    }
    if (isset($args['author'])) {
      if (gettype($args['author']) !== 'string' ||
           strlen(trim($args['author'])) < 2)
        Util::setError('Hibás szerző név!');
    }
    if (isset($args['publicated'])) {
      $value = $args['publicated'];
      if (gettype($value) === 'string')
        $value = intval($value);
      if ($value < 1000)
         Util::setError('Hibás kiadás éve!');    
    }
    if (isset($args['description'])) {
      if (gettype($args['description']) !== 'string' ||
           strlen(trim($args['description'])) < 2)
        Util::setError('Hibás könyv leírás!');
    }
  }
}