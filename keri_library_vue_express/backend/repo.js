import { pool } from "./db.js";

// GET genres
export async function getGenres() {
  const [rows] = await pool.query(
    "SELECT id, name FROM genres ORDER BY name"
  );
  return rows;
}

// GET books
export async function getBooks() {
  const [rows] = await pool.query(`
    SELECT  books.id,
            books.name,
            books.genre_id,
            genres.name AS genre_name,
            books.author,
            books.publicated,
            books.description
    FROM books
    INNER JOIN genres ON genres.id = books.genre_id
    WHERE books.valid = 1;
  `);
  return rows;
}

// Check book already exist
export async function isBookExist({ name, author, publicated, id }) {
  let sql = `
    SELECT id
    FROM books
    WHERE name = :name AND author = :author AND publicated = :publicated
  `;
  const params = { name, author, publicated };

  if (id) {
    sql += " AND id != :id";
    params.id = id;
  }

  const [rows] = await pool.query({ sql, namedPlaceholders: true }, params);
  return rows.length > 0;
}

// INSERT
export async function insertBook({ 
  name, genre_id, author, publicated, description 
}) {
  const sql = `
    INSERT INTO books (name, genre_id, author, publicated, description)
    VALUES (:name, :genre_id, :author, :publicated, :description)
  `;
  const [result] = await pool.query({ sql, namedPlaceholders: true }, {
    name, genre_id, author, publicated, description
  });
  return result.insertId;
}

// UPDATE
export async function updateBook({ 
  id, name, genre_id, author, publicated, description 
}) {
  const sql = `
    UPDATE books
    SET name=:name,
        genre_id=:genre_id,
        author=:author,
        publicated=:publicated,
        description=:description
    WHERE id=:id
  `;
  const [result] = await pool.query({ sql, namedPlaceholders: true }, {
    id, name, genre_id, author, publicated, description
  });
  return result.affectedRows;
}

// DELETE
export async function deleteBook({ id }) {
  const sql = `DELETE FROM books WHERE id = :id`;
  const [result] = await pool.query({ sql, namedPlaceholders: true }, { id });
  return result.affectedRows;
}