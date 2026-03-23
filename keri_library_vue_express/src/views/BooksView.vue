<style scoped>
  caption button,
  .modal-dialog .modal-footer button {
    min-width: 100px;
  }
</style>
<template>
  <div class="d-flex align-items-center 
              justify-content-between flex-wrap gap-2 mb-3">
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
      <input v-model="filter" 
             class="form-control" 
             placeholder="Keresés név/szerző alapján..." />
    </div>
    <div class="col-12 col-md-6">
      <select v-model="genreFilter" class="form-select">
        <option value="">Minden műfaj</option>
        <option v-for="g in genres" 
                :key="g.id" 
                :value="String(g.id)">
          {{ g.name }}
        </option>
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
                <button class="btn btn-sm btn-outline-secondary" 
                        @click="openDetails(b)">
                  <i class="fa-solid fa-circle-info me-1"></i>
                  Részletek
                </button>
                <button class="btn btn-sm btn-outline-primary" 
                        @click="openEdit(b)">
                  <i class="fa-solid fa-pen-to-square me-1"></i>
                  Módosít
                </button>
                <button class="btn btn-sm btn-outline-danger" 
                        @click="remove(b)">
                  <i class="fa-solid fa-trash me-1"></i>
                  Töröl
                </button>
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