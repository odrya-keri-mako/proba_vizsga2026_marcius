import express from "express";
import cors from "cors";
import "dotenv/config";

import {
  getBooks, getGenres, isBookExist, 
  insertBook, updateBook, deleteBook
} from "./repo.js";

const app = express();
app.use(cors());
app.use(express.json());

// Set error
function setError(res, message) {
  return res.status(400).json({ error: message });
}

// Validate arguments
function validate(body) {

  const errors = [];
  const name = String(body.name || "").trim();
  const author = String(body.author || "").trim();
  const description = String(body.description || "").trim();
  const publicated = String(body.publicated || "").trim();
  const genre_id = Number(body.genre_id);

  if (name.length < 2) 
    errors.push("Hibás könyv név!");
  if (!Number.isInteger(genre_id) || genre_id < 1) 
    errors.push("Hibás múfaj azonosító!");
  if (author.length < 2) 
    errors.push("Hibás szerző név!");
  if (!/^\d{4}$/.test(publicated)) 
    errors.push("Hibás kiadás éve!");
  if (description.length < 2) 
    errors.push("Hibás könyv leírás!");

  return { 
    errors, 
    cleaned: { name, author, description, publicated, genre_id } 
  };
}

// GET books, and genres
app.get("/api/init", async (req, res) => {
  try {
    const [books, genres] = await Promise.all([
      getBooks(), 
      getGenres()
    ]);
    res.json({ books, genres });
  } catch (err) {
    res.status(500).json({ 
      error: "Szerver hiba (init)!", 
      details: String(err) 
    });
  }
});

// GET books
app.get("/api/books", async (req, res) => {
  try {
    res.json(await getBooks());
  } catch (err) {
    res.status(500).json({ 
      error: "Szerver hiba (books)!" 
    });
  }
});

// GET genres
app.get("/api/genres", async (req, res) => {
  try {
    res.json(await getGenres());
  } catch (err) {
    res.status(500).json({ 
      error: "Szerver hiba (genres)!" 
    });
  }
});

// INSERT book
app.post("/api/books", async (req, res) => {
  const { errors, cleaned } = validate(req.body);
  if (errors.length) return setError(res, errors.join(" "));
  try {
    const exists = await isBookExist(cleaned);
    if (exists) return setError(res, 'A könyve már létezik!');

    const affected = await insertBook(cleaned);
    if (!affected) return setError(res, "Nem sikerült felvenni a könyvet!");

    res.json(await getBooks());
  } catch (err) {
    res.status(500).json({ 
      error: "Szerver hiba (post)!" 
    });
  }
});

// UPDATE book
app.put("/api/books/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) 
    return setError(res, "Hibás könyv azonosító!");

  const { errors, cleaned } = validate(req.body);
  if (errors.length) return setError(res, errors.join(" "));

  try {
    const exists = await isBookExist({ ...cleaned, id });
    if (exists) return setError(res, "A könyve már létezik!");

    const affected = await updateBook({ id, ...cleaned });
    if (!affected) return setError(res, "Nem sikerült módosítani a könyvet.");

    res.json(await getBooks());
  } catch (err) {
    res.status(500).json({ 
      error: "Szerver hiba (put)!" 
    });
  }
});

// DELETE book
app.delete("/api/books/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) 
    return setError(res, "Hibás könyv azonosító!");

  try {
    const affected = await deleteBook({ id });
    if (!affected) return setError(res, "Nem sikerült törölni a könyvet!");

    res.json(await getBooks());
  } catch (err) {
    res.status(500).json({ 
      error: "Szerver hiba (delete)!" 
    });
  }
});

// Check server status
app.get("/api/health", (req, res) => res.json({ ok: true }));

// Set port number
const port = Number(process.env.PORT || 3000);

// Start server listening on the specified port
app.listen(port, () => 
  console.log(`API running on http://localhost:${port}`));