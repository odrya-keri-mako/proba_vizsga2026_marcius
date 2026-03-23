# Vue + Express (MySQL) megoldás – lépésről lépésre (Keri Library)

A cél: a meglévő **Könyvek–Műfajok** (books–genres) adatbázisra építve egy **Express REST API** + **Vue (Vite) frontend** CRUD alkalmazás.

> Ezt úgy írtam meg, hogy a PHP-s AngularJS megoldás logikáját kövesse:
> - `GET /api/init` → `{ books: [...], genres: [...] }`
> - `POST/PUT/DELETE` → visszaadja a **friss könyvlistát** (mint a PHP)
> - listázás csak `books.valid = 1` alapján

---

## 0) Előfeltételek

- Node.js 18+ (ajánlott 20+)
- MySQL / MariaDB
- A kiinduló SQL: `db/keri_library.sql` (importáld phpMyAdminból vagy CLI-ből)

**Adatbázis import (példa CLI):**
```bash
mysql -u root -p < db/keri_library.sql
```

---

## 1) Projektstruktúra javaslat

Egy repo, két mappa:

```
keri_library_vue_express/
  backend/
  frontend/
  db/              # ide másold be a keri_library.sql-t (opcionális)
```

---

## 2) Backend – Express + MySQL (REST API)

### 2.1) Backend inicializálás

```bash
mkdir -p keri_library_vue_express/backend
cd keri_library_vue_express/backend
npm init -y
npm i express cors mysql2 dotenv
npm i -D nodemon
```

**package.json – script-ek:**
```json
{
  "scripts": {
    "dev": "nodemon server.js",
    "start": "node server.js"
  }
}
```

### 2.2) `.env` (adatbázis konfiguráció)

Hozd létre: `backend/.env`

```env
PORT=3000
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=
DB_NAME=keri_library
DB_PORT=3306
```

### 2.3) DB kapcsolat (pool)

`backend/db.js`
```js
import mysql from "mysql2/promise";
import "dotenv/config";

export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT || 3306),
  waitForConnections: true,
  connectionLimit: 10,
  namedPlaceholders: true,
});
```

### 2.4) Lekérdezések (model / repository)

`backend/repo.js`
```js
import { pool } from "./db.js";

export async function getGenres() {
  const [rows] = await pool.query(
    "SELECT id, name FROM genres ORDER BY name"
  );
  return rows;
}

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

export async function insertBook({ name, genre_id, author, publicated, description }) {
  const sql = `
    INSERT INTO books (name, genre_id, author, publicated, description)
    VALUES (:name, :genre_id, :author, :publicated, :description)
  `;
  const [result] = await pool.query({ sql, namedPlaceholders: true }, {
    name, genre_id, author, publicated, description
  });
  return result.insertId;
}

export async function updateBook({ id, name, genre_id, author, publicated, description }) {
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

export async function deleteBook(id) {
  const [result] = await pool.query(
    "DELETE FROM books WHERE id = ?",
    [id]
  );
  return result.affectedRows;
}
```

### 2.5) REST API (routes + validáció)

`backend/server.js`
```js
import express from "express";
import cors from "cors";
import "dotenv/config";

import {
  getBooks, getGenres,
  isBookExist, insertBook, updateBook, deleteBook
} from "./repo.js";

const app = express();
app.use(cors());
app.use(express.json());

// Egységes hiba válasz (vizsgán jó, ha a frontend erre támaszkodhat)
function setError(res, message) {
  return res.status(400).json({ error: message });
}

function validate(body) {
  const errors = [];
  const name = String(body.name || "").trim();
  const author = String(body.author || "").trim();
  const description = String(body.description || "").trim();
  const publicated = String(body.publicated || "").trim();
  const genre_id = Number(body.genre_id);

  if (name.length < 2) errors.push("A könyv neve kötelező (min. 2 karakter).");
  if (author.length < 2) errors.push("A szerző kötelező (min. 2 karakter).");
  if (!Number.isInteger(genre_id) || genre_id < 1) errors.push("A műfaj kötelező (genre_id).");
  if (!/^\d{4}$/.test(publicated)) errors.push("A kiadás éve legyen 4 számjegy (pl. 2003).");
  if (description.length < 2) errors.push("A leírás kötelező (min. 2 karakter).");

  return { errors, cleaned: { name, author, description, publicated, genre_id } };
}

// 1) INIT – könyvek + műfajok egyben (a frontendnek kényelmes)
app.get("/api/init", async (req, res) => {
  try {
    const [books, genres] = await Promise.all([getBooks(), getGenres()]);
    res.json({ books, genres });
  } catch (err) {
    res.status(500).json({ error: "Szerver hiba (init).", details: String(err) });
  }
});

// 2) GET csak könyvek / műfajok (opcionális)
app.get("/api/books", async (req, res) => {
  try {
    res.json(await getBooks());
  } catch (err) {
    res.status(500).json({ error: "Szerver hiba (books)." });
  }
});

app.get("/api/genres", async (req, res) => {
  try {
    res.json(await getGenres());
  } catch (err) {
    res.status(500).json({ error: "Szerver hiba (genres)." });
  }
});

// 3) CREATE
app.post("/api/books", async (req, res) => {
  const { errors, cleaned } = validate(req.body);
  if (errors.length) return setError(res, errors.join(" "));

  try {
    const exists = await isBookExist(cleaned);
    if (exists) return setError(res, "A könyv már létezik (név+szerző+év).");

    await insertBook(cleaned);
    res.json(await getBooks()); // PHP mintájára: friss lista
  } catch (err) {
    res.status(500).json({ error: "Szerver hiba (post)." });
  }
});

// 4) UPDATE
app.put("/api/books/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) return setError(res, "Hibás id.");

  const { errors, cleaned } = validate(req.body);
  if (errors.length) return setError(res, errors.join(" "));

  try {
    const exists = await isBookExist({ ...cleaned, id });
    if (exists) return setError(res, "A könyv már létezik (név+szerző+év).");

    const affected = await updateBook({ id, ...cleaned });
    if (!affected) return setError(res, "Nem sikerült módosítani a könyvet.");

    res.json(await getBooks());
  } catch (err) {
    res.status(500).json({ error: "Szerver hiba (put)." });
  }
});

// 5) DELETE
app.delete("/api/books/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) return setError(res, "Hibás id.");

  try {
    const affected = await deleteBook(id);
    if (!affected) return setError(res, "Nem sikerült törölni a könyvet.");

    res.json(await getBooks());
  } catch (err) {
    res.status(500).json({ error: "Szerver hiba (delete)." });
  }
});

app.get("/api/health", (req, res) => res.json({ ok: true }));

const port = Number(process.env.PORT || 3000);
app.listen(port, () => console.log(`API running on http://localhost:${port}`));
```

> Ha ES module hibát kapsz Node alatt, tedd a `backend/package.json`-ba:
```json
{ "type": "module" }
```

### 2.6) Backend indítás

```bash
cd backend
npm run dev
```

Teszt:
- `GET http://localhost:3000/api/health`
- `GET http://localhost:3000/api/init`

---

## 3) Frontend – Vue 3 + Vite + Bootstrap

### 3.1) Vue projekt létrehozása

```bash
cd ../
npm create vite@latest frontend -- --template vue
cd frontend
npm i
npm i vue-router@4 axios
```

### 3.2) Bootstrap + Font Awesome bekötése (AngularJS-es egységes kinézethez)

Telepítés:

```bash
npm i bootstrap @fortawesome/fontawesome-free
```

**Importok (main.js):**  
`frontend/src/main.js`
```js
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "@fortawesome/fontawesome-free/css/all.min.css";

createApp(App).use(router).mount("#app");
```


### 3.3) Router (Vue Router) – egységes navigáció

```bash
npm i vue-router@4 axios
```

`frontend/src/router/index.js`
```js
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import BooksView from "../views/BooksView.vue";

export default createRouter({
  history: createWebHistory(),
  linkActiveClass: "active", // Bootstrap nav-link active
  routes: [
    { path: "/", name: "home", component: HomeView },
    { path: "/books", name: "books", component: BooksView },
  ],
});
```


### 3.4) API kliens (axios)

`frontend/src/services/api.js`
```js
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 8000,
});
```

### 3.5) App layout – Header/Footer komponensekkel (AngularJS mintára)

**Cél:** a header és footer fixen jelenjen meg, a tartalom pedig route alapján cserélődjön – ugyanúgy, mint AngularJS-ben a `ui-view="header"` és `ui-view="footer"`.

#### a) Header komponens

`frontend/src/components/AppHeader.vue`
```vue
<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary border-bottom sticky-top">
    <div class="container">
      <RouterLink class="navbar-brand fw-semibold" to="/">
        <i class="fa-solid fa-book-open me-2"></i> Könyvtár
      </RouterLink>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMain">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navMain">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <RouterLink class="nav-link" to="/">
              <i class="fa-solid fa-house me-1"></i> Kezdőlap
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/books">
              <i class="fa-solid fa-book me-1"></i> Könyvek
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>
```

#### b) Footer komponens

`frontend/src/components/AppFooter.vue`
```vue
<template>
  <footer class="border-top py-3">
    <div class="container small text-secondary d-flex justify-content-between align-items-center">
      <div>© Keri Library</div>
      <div><i class="fa-regular fa-circle-check me-1"></i> Vue + Express</div>
    </div>
  </footer>
</template>
```

#### c) App.vue – AngularJS-es “app-container” elrendezés

`frontend/src/App.vue`
```vue
<template>
  <div class="app-container position-relative d-flex flex-column vh-100 overflow-x-hidden overflow-y-auto">
    <header class="sticky-top">
      <AppHeader />
    </header>

    <main class="position-relative flex-fill">
      <RouterView />
    </main>

    <footer>
      <AppFooter />
    </footer>
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";
</script>
```


---

## 4) Home nézet – init betöltés + ajánlott könyvek

`frontend/src/views/HomeView.vue`
```vue
<template>
  <div class="p-4 p-md-5 bg-light border rounded-3">
    <h1 class="h3 fw-semibold mb-2">Iskolai könyvtár</h1>
    <p class="text-secondary mb-4">
      Böngéssz a könyvek között, és találd meg a következő kedvenced.
    </p>
    <RouterLink class="btn btn-primary" to="/books">Könyvek megnyitása</RouterLink>
  </div>

  <h2 class="h5 fw-semibold mt-4">Ajánlott könyvek</h2>

  <div class="row g-3 mt-1">
    <div v-for="b in recommend" :key="b.id" class="col-12 col-md-6 col-lg-4">
      <div class="card h-100">
        <div class="card-body">
          <div class="small text-secondary">{{ b.genre_name }}</div>
          <div class="fw-semibold">{{ b.name }}</div>
          <div class="text-secondary">{{ b.author }} ({{ b.publicated }})</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { onMounted, ref } from "vue";
import { api } from "../services/api";

const data = ref({ books: [], genres: [] });
const recommend = ref([]);

function pickRandom(list, n) {
  const copy = [...list];
  copy.sort(() => 0.5 - Math.random());
  return copy.slice(0, n);
}

onMounted(async () => {
  const r = await api.get("/api/init");
  data.value = r.data;
  recommend.value = pickRandom(data.value.books, 6);
});
</script>
```

---

## 5) Könyvek nézet – lista + modal + CRUD

### 5.1) BooksView alap

`frontend/src/views/BooksView.vue`
```vue
<template>
  <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
    <div>
      <h1 class="h4 fw-semibold mb-0">Könyvek</h1>
      <div class="text-secondary small">CRUD + MySQL + REST API</div>
    </div>

    <button class="btn btn-primary" @click="openNew">
      <i class="fa-solid fa-plus me-2"></i>Új könyv
    </button>
  </div>

  <div class="row g-2 mb-3">
    <div class="col-12 col-md-6">
      <input v-model="filter" class="form-control" placeholder="Keresés név/szerző alapján..." />
    </div>
    <div class="col-12 col-md-6">
      <select v-model="genreFilter" class="form-select">
        <option value="">Minden műfaj</option>
        <option v-for="g in genres" :key="g.id" :value="String(g.id)">{{ g.name }}</option>
      </select>
    </div>
  </div>

  <!-- Desktop: táblázat -->
  <div class="card d-none d-md-block">
    <div class="table-responsive">
      <table class="table align-middle mb-0">
        <thead>
          <tr>
            <th>Azon.</th>
            <th>Név</th>
            <th>Műfaj</th>
            <th>Szerző</th>
            <th>Kiadva</th>
            <th class="text-end">Műveletek</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="b in filteredBooks" :key="b.id">
            <td>{{ String(b.id).padStart(2,'0') }}</td>
            <td class="fw-semibold">{{ b.name }}</td>
            <td>{{ b.genre_name }}</td>
            <td>{{ b.author }}</td>
            <td>{{ b.publicated }}</td>
            <td class="text-end">
              <div class="btn-group">
                <button class="btn btn-sm btn-outline-secondary" @click="openDetails(b)"><i class="fa-solid fa-circle-info me-1"></i>Részletek</button>
                <button class="btn btn-sm btn-outline-primary" @click="openEdit(b)"><i class="fa-solid fa-pen-to-square me-1"></i>Módosít</button>
                <button class="btn btn-sm btn-outline-danger" @click="remove(b)"><i class="fa-solid fa-trash me-1"></i>Töröl</button>
              </div>
            </td>
          </tr>

          <tr v-if="filteredBooks.length === 0">
            <td colspan="6" class="text-secondary">Nincs találat.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Mobile: kártyák -->
  <div class="d-md-none">
    <div v-for="b in filteredBooks" :key="b.id" class="card mb-2">
      <div class="card-body">
        <div class="small text-secondary">{{ b.genre_name }}</div>
        <div class="fw-semibold">{{ b.name }}</div>
        <div class="text-secondary">{{ b.author }} ({{ b.publicated }})</div>

        <div class="d-flex gap-2 mt-3">
          <button class="btn btn-sm btn-outline-secondary" @click="openDetails(b)"><i class="fa-solid fa-circle-info me-1"></i>Részletek</button>
          <button class="btn btn-sm btn-outline-primary" @click="openEdit(b)"><i class="fa-solid fa-pen-to-square me-1"></i>Módosít</button>
          <button class="btn btn-sm btn-outline-danger" @click="remove(b)"><i class="fa-solid fa-trash me-1"></i>Töröl</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div class="modal fade" id="bookModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ modalTitle }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Bezár"></button>
        </div>

        <form @submit.prevent="save">
          <div class="modal-body">
            <div v-if="error" class="alert alert-danger">{{ error }}</div>

            <div class="row g-3">
              <div class="col-12">
                <label class="form-label">Név</label>
                <input v-model="model.name" class="form-control" :disabled="readonly" required pattern="^(?=(?:.*[^ ]){2,}).*$" />
              </div>

              <div class="col-md-6">
                <label class="form-label">Szerző</label>
                <input v-model="model.author" class="form-control" :disabled="readonly" required pattern="^(?=(?:.*[^ ]){2,}).*$" />
              </div>

              <div class="col-md-6">
                <label class="form-label">Műfaj</label>
                <select v-model="model.genre_id" class="form-select" :disabled="readonly" required>
                  <option value="" disabled>Válassz...</option>
                  <option v-for="g in genres" :key="g.id" :value="g.id">{{ g.name }}</option>
                </select>
              </div>

              <div class="col-md-6">
                <label class="form-label">Kiadva (év)</label>
                <input v-model="model.publicated" class="form-control" :disabled="readonly" required pattern="\\d{4}" />
              </div>

              <div class="col-12">
                <label class="form-label">Rövid leírás</label>
                <textarea v-model="model.description" class="form-control" :disabled="readonly" required pattern="^(?=(?:.*[^ ]){2,}).*$" rows="4"></textarea>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Mégse</button>
            <button v-if="!readonly" type="submit" class="btn btn-primary">Mentés</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { api } from "../services/api";

// bootstrap modal (JS import already in main.js)
let modalInstance = null;

const books = ref([]);
const genres = ref([]);

const filter = ref("");
const genreFilter = ref("");

const modalTitle = ref("");
const readonly = ref(false);
const error = ref("");

const modelDefault = { id: null, name: "", genre_id: "", author: "", publicated: "", description: "" };
const model = ref({ ...modelDefault });

function openModal() {
  const el = document.getElementById("bookModal");
  if (!modalInstance) {
    // global bootstrap object available because of import "bootstrap"
    modalInstance = new window.bootstrap.Modal(el, { keyboard: false });
  }
  error.value = "";
  modalInstance.show();
}

function openNew() {
  modalTitle.value = "FELVÉTEL";
  readonly.value = false;
  model.value = { ...modelDefault };
  openModal();
}

function openEdit(b) {
  modalTitle.value = "MÓDOSÍT";
  readonly.value = false;
  model.value = { ...b }; // includes genre_id
  openModal();
}

function openDetails(b) {
  modalTitle.value = "RÉSZLETEK";
  readonly.value = true;
  model.value = { ...b };
  openModal();
}

const filteredBooks = computed(() => {
  const q = filter.value.trim().toLowerCase();
  const g = genreFilter.value;

  return books.value.filter(b => {
    const matchText = !q || (b.name?.toLowerCase().includes(q) || b.author?.toLowerCase().includes(q));
    const matchGenre = !g || String(b.genre_id) === g;
    return matchText && matchGenre;
  });
});

async function loadInit() {
  const r = await api.get("/api/init");
  books.value = r.data.books;
  genres.value = r.data.genres;
}

async function save() {
  try {
    error.value = "";
    const payload = {
      name: model.value.name,
      author: model.value.author,
      genre_id: Number(model.value.genre_id),
      publicated: String(model.value.publicated),
      description: model.value.description,
    };

    if (!model.value.id) {
      const r = await api.post("/api/books", payload);
      books.value = r.data;
      alert("A könyvet sikerült felvenni!");
    } else {
      const r = await api.put(`/api/books/${model.value.id}`, payload);
      books.value = r.data;
      alert("A könyv módosítása megtörtént!");
    }

    modalInstance.hide();
  } catch (e) {
    error.value = e?.response?.data?.error || "Hiba történt mentés közben.";
  }
}

async function remove(b) {
  if (!confirm(`${b.name}\nBiztosan törlöd?`)) return;

  try {
    const r = await api.delete(`/api/books/${b.id}`);
    books.value = r.data;
    alert("A könyvet töröltük!");
  } catch (e) {
    alert(e?.response?.data?.error || "Hiba történt törlés közben.");
  }
}

onMounted(loadInit);
</script>
```

---

## 6) Frontend indítás

```bash
cd frontend
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:3000`

---

## 7) Gyors tesztlista (vizsgajavításhoz is jó)

1. `GET /api/init` → kapok `books` + `genres`
2. Könyvek oldal betölt → táblázat/kártya megjelenik
3. Új könyv:
   - kötelező mezők validálódnak
   - mentés után **lista frissül reload nélkül**
4. Módosítás:
   - előtöltés jó
   - mentés után lista frissül
5. Törlés:
   - megerősítés
   - törlés után lista frissül

---

## 8) Következő lépés (ha tetszik)

Ha ez a páros kész, ugyanerre a backend API szerződésre:
- React + Express
- Svelte + Express
- Angular + Express

már “csak” frontendet kell cserélni.
