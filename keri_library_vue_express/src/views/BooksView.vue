<style scoped>
  caption button,
  .modal-dialog .modal-footer button {
    min-width: 100px;
  }
</style>
<template>

  <!-- Books -->
  <div class="container">
    <div class="row justify-content-center px-2 px-sm-0">
      <div class="overflow-x-auto border shadow p-0 my-5">

        <!-- Table -->
        <table class="table table-bordered table-striped
                      table-hover table-responsive m-0">

          <!-- Caption -->
          <caption class="caption-top bg-dark-subtle">
            <div class="d-flex align-items-center">
              <h4 class="mb-0 p-2">
                <i class="fa-solid fa-book me-1"></i>
                KINÁLATUNK
              </h4>
              <button class="btn btn-sm ms-5 me-3 btn-primary"
                      @click.prevent="openNew">
                <i class="fa-solid fa-circle-plus"></i>
                Felvétel
              </button>
            </div>
          </caption>

          <!-- Thead -->
          <thead class="table-dark">
            <tr>
              <th class="text-center">#</th>
              <th class="text-center">Azon.</th>
              <th>Név</th>
              <th>Műfaj</th>
              <th>Szerző</th>
              <th class="text-center">Kiadva</th>
              <th class="text-center text-nowrap"
                  style="width: 170px;">
                Műveletek
              </th>
            </tr>
          </thead>

          <!-- Tbody -->
          <tbody>

            <!-- Books -->
            <tr class="align-middle"
                v-for="(b, i) in filteredBooks" 
                :key="b.id">
              <td class="text-end">{{ i + 1 }}</td>
              <td class="text-end">{{ b.id }}</td>
              <td>{{ b.name }}</td>
              <td>{{ b.genre_name }}</td>
              <td>{{ b.author }}</td>
              <td class="text-center">{{ b.publicated }}</td>

              <!-- Buttons -->
              <td class="text-center">

                <!-- Details -->
                <button class="btn btn-sm mx-1 my-1 btn-info text-white"
                        @click="openDetails(b)"
                        title="Részletek"
                        data-bs-toggle="tooltip" 
                        data-bs-title="Részletek">
                  <i class="fa-solid fa-book-open"></i>
                </button>

                <!-- Modify -->
                <button class="btn btn-sm mx-1 my-1 btn-success"
                        @click="openEdit(b)"
                        title="Módosít"
                        data-bs-toggle="tooltip" 
                        data-bs-title="Módosít">
                  <i class="fa-solid fa-file-pen"></i>
                </button>

                <!-- Delete -->
                <button class="btn btn-sm mx-1 my-1 btn-danger"
                        @click="remove(b.id, b.name)"
                        title="Törlés"
                        data-bs-toggle="tooltip" 
                        data-bs-title="Törlés">
                  <i class="fa-solid fa-circle-xmark"></i>
                </button>
              </td>
            </tr>

            <!-- Empty -->
            <tr class="align-middle"
                v-if="filteredBooks.length === 0">
              <td colspan="7" class="text-center">
                Üres
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- Offcanvas filter -->
  <div class="offcanvas offcanvas-end" 
       tabindex="-1"
       id="offcanvasFilter"
       data-bs-backdrop="false"
       aria-labelledby="offcanvasFilterLabel">

    <!-- Header -->
    <div class="offcanvas-header">
      <img src="/src/assets/image/logos/filter.png" height="100">
      <button type="button" 
              class="btn-close" 
              data-bs-dismiss="offcanvas" 
              aria-label="Close"></button>
    </div>

    <!-- Form -->
    <div class="offcanvas-body">
      <form name="filterForm">

        <!-- Search (filter) -->
        <div class="mb-4">
          <label for="search" 
                 class="form-label">
            <i class="fa-solid fa-filter me-1"></i>
            Szelekció:
          </label>
          <input type="search" 
                 class="form-control"
                 autocomplete="off"
                 spellcheck="false"
                 placeholder="szelekció" 
                 id="search"
                 name="search"
                 v-model="filter.search">
        </div>
        <hr>

        <!-- Name -->
        <div class="form-check">
          <input class="form-check-input" 
                 type="radio" 
                 name="filter" 
                 id="name"
                 value="name" 
                 v-model="filter.key">
          <label class="form-check-label" 
                 for="name">
            Név
          </label>
        </div>

        <!-- Genre name -->
        <div class="form-check">
          <input class="form-check-input" 
                 type="radio" 
                 name="filter" 
                 id="genre_name"
                 value="genre_name"
                 v-model="filter.key">
          <label class="form-check-label" 
                 for="genre_name">
            Műfaj
          </label>
        </div>

        <!-- Author -->
        <div class="form-check">
          <input class="form-check-input" 
                 type="radio" 
                 name="filter"
                 value="author" 
                 id="author"
                 v-model="filter.key">
          <label class="form-check-label" 
                 for="author">
            Szerző
          </label>
        </div>

        <!-- Publicated -->
        <div class="form-check">
          <input class="form-check-input" 
                 type="radio" 
                 name="filter" 
                 id="publicated"
                 value="publicated"
                 v-model="filter.key">
          <label class="form-check-label" 
                 for="publicated">
            Kiadás éve
          </label>
        </div>

        <!-- Description -->
        <div class="form-check">
          <input class="form-check-input" 
                 type="radio" 
                 name="filter" 
                 id="description"
                 value="description"
                 v-model="filter.key">
          <label class="form-check-label" 
                 for="description">
            Leírás
          </label>
        </div>
        <hr>
      </form>
    </div>
  </div>

  <!-- Modal -->
  <div class="modal fade" 
       id="bookModal" 
       data-bs-backdrop="static" 
       data-bs-keyboard="false" 
       tabindex="-1" 
       aria-labelledby="bookModalLabel" 
       aria-hidden="true">
    <div class="modal-dialog 
                modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">

        <!-- Header -->
        <div class="modal-header">
          <h3 class="modal-title fs-5" 
              id="bookModalLabel">
            <span v-if="modalType==='modify'">
              MÓDOSÍT
            </span>
            <span v-if="modalType==='details'">
              RÉSZLETEK
            </span>
            <span v-if="modalType==='new'">
              FELVÉTEL
            </span>
          </h3>
          <button type="button" 
                  class="btn-close" 
                  data-bs-dismiss="modal" 
                  aria-label="Close"></button>
        </div>

        <!-- Form -->
        <div class="modal-body">
          <form ref="bookFormRef" 
                name="bookForm" 
                @input="updateValidity" 
                @change="updateValidity">

            <!-- Identifier -->
            <div class="row mb-3 align-items-center">
              <label for="id" 
                     class="col-3 form-label">
                Azonosító:
              </label>
              <div class="col-9">
                <input type="number" 
                       class="form-control"
                       autocomplete="off" 
                       id="id"
                       name="id"
                       v-model="model.id" 
                       disabled
                       style="width: 100px;">
              </div>
            </div>

            <!-- Name -->
            <div class="mb-3">
              <label for="name" 
                     class="form-label">
                Név:
              </label>
              <input type="text" 
                     class="form-control" 
                     autocomplete="off" 
                     spellcheck="false"
                     placeholder="név"
                     v-model="model.name"
                     id="name" 
                     name="name"
                     pattern="^(?=(?:.*[^ ]){2,}).*$"
                     required
                     :disabled="modalType === 'details'">
            </div>

            <!-- Genre -->
            <div class="mb-3">
              <label for="genre_id" 
                     class="form-label">
                Műfaj:
              </label>
              <select class="form-select"
                      id="genre_id"
                      name="genre_id"
                      v-model="model.genre_id"
                      required
                      :disabled="modalType === 'details'">
                <option value="" selected hidden>
                  -- Kérem válasszon --
                </option>
                <option v-for="g in genres" 
                        :key="g.id" 
                        :value="String(g.id)">
                  {{ g.name }}
                </option>
              </select>
            </div>

            <!-- Author -->
            <div class="mb-3">
              <label for="author" 
                     class="form-label">
                Szerző:
              </label>
              <input type="text" 
                     class="form-control" 
                     autocomplete="off"
                     spellcheck="false"
                     placeholder="szerző"
                     id="author"
                     name="author"
                     v-model="model.author"
                     pattern="^(?=(?:.*[^ ]){2,}).*$"
                     required
                     :disabled="modalType === 'details'">
            </div>

            <!-- Publicated -->
            <div class="row mb-3 align-items-center">
              <label for="publicated" 
                     class="col-3 form-label">
                Kiadás éve:
              </label>
              <div class="col-9">
                <input type="text" 
                       class="form-control"
                       autocomplete="off" 
                       spellcheck="false" 
                       id="publicated"
                       name="publicated"
                       v-model="model.publicated" 
                       pattern="^[1-9][0-9]{3}$"
                       maxlength="4" 
                       required
                       placeholder="kiadva"
                       style="width: 100px;"
                       :disabled="modalType === 'details'">
              </div>
            </div>

            <!-- Description -->
            <div class="mb-4">
              <label for="description" 
                     class="form-label">
                Leírás:
              </label>
              <textarea class="form-control"
                        autocomplete="off" 
                        spellcheck="false"
                        placeholder="Leírás" 
                        id="description"
                        name="description"
                        v-model="model.description"
                        pattern="^(?=(?:.*[^ ]){2,}).*$" 
                        rows="3" 
                        required
                        :disabled="modalType === 'details'">
              </textarea>
            </div>

            <!-- Buttons -->
            <div class="mb-3 text-end">

              <!-- Cancel -->
              <button type="button" 
                      class="btn btn-secondary mx-1" 
                      data-bs-dismiss="modal">
                <i class="fa-solid fa-circle-xmark"></i>
                <span v-if="modalType === 'details'">
                  Bezár
                </span>
                <span v-if="modalType !== 'details'">
                  Mégsem
                </span>
              </button>
              
              <!-- Save -->
              <button id="btn-save"
                      type="button" 
                      class="btn btn-primary mx-1"
                      data-bs-dismiss="modal"
                      @click.prevent="modalType === 'new' ? 
                                post(model) : put(model)"
                      v-if="modalType !== 'details'"
                      :disabled="!isFormValid || !descOk">
                <i class="fa-solid fa-floppy-disk"></i>
                Mentés
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script setup>
import { ref, watch, computed, onMounted, nextTick } from "vue";
import { Modal } from "bootstrap";
import { api } from "../services/api";
import { libraryStore } from "../stores/libraryStore";

// Set books, and genres from store
const books = computed(() => libraryStore.books);
const genres = computed(() => libraryStore.genres);

// Set filter from store
const filter = libraryStore.filter;

// Modal status
let modalInstance = null;
const modalTitle = ref("");
const readonly = ref(false);
const error = ref("");

// Set model default value
const modelDefault = {
  id: null,
  name: "",
  genre_id: "",
  author: "",
  publicated: "",
  description: "",
};
const model = ref({ ...modelDefault });
const modalType = ref("new");

const bookFormRef = ref(null);
const isFormValid = ref(false);

// Validate description
const descOk = computed(() => {
  const t = (model.value.description ?? "");
  return t.replace(/\s/g, "").length >= 2;
});

// Validate form
function updateValidity() {
  if (modalType.value === "details") {
    isFormValid.value = false;
    return;
  }
  isFormValid.value = !!bookFormRef.value?.checkValidity() 
                      && descOk.value;
}

// Watch model
watch(
  () => [modalType.value, model.value],
  async () => {
    await nextTick();
    updateValidity();
  },
  { deep: true }
);

// Open modal 
function openModal() {
  const el = document.getElementById("bookModal");
  modalInstance = Modal.getOrCreateInstance(el, { keyboard: false });
  error.value = "";
  modalInstance.show();
}

// Set modal with empty model, and open it
function openNew() {
  modalTitle.value = "FELVÉTEL";
  readonly.value = false;
  model.value = { ...modelDefault };
  modalType.value = 'new';
  openModal();
}

// Set modal with selected book, and open it
function openEdit(b) {
  modalTitle.value = "MÓDOSÍT";
  readonly.value = false;
  model.value = { ...b };
  modalType.value = 'modify';
  openModal();
}

// Set modal with selected book, and open it
function openDetails(b) {
  modalTitle.value = "RÉSZLETEK";
  readonly.value = true;
  model.value = { ...b };
  modalType.value = 'details';
  openModal();
}

// Filter books by search and key
const filteredBooks = computed(() => {
  const q = filter.search.trim().toLowerCase();
  const key = filter.key;

  if (!q) return books.value;

  return books.value.filter((b) => {
    const val = String(b[key] ?? "").toLowerCase();
    return val.includes(q);
  });
});

// Remove focus warring when modal close
setTimeout(() => {
  const modalElement = document.querySelector('#bookModal');
  modalElement.addEventListener('hide.bs.modal', () => {
      if (document.activeElement instanceof HTMLElement)
        document.activeElement.blur();
  });
}, 600);

// Convert model to API payload
function toPayload(m) {
  return {
    name: String(m.name ?? "").trim(),
    genre_id: Number(m.genre_id),
    author: String(m.author ?? "").trim(),
    publicated: String(m.publicated ?? "").trim(),
    description: String(m.description ?? "").trim(),
  };
}

// Get error message from API response
function apiErrorMessage(e) {
  return e?.response?.data?.error || e?.message || "Ismeretlen hiba.";
}

// INSERT
async function post(m) {
  try {
    
    const payload = toPayload(m);
    const r = await api.post("/api/books", payload);

    // Set books in store
    libraryStore.books = r.data;

    // Set bootstrap tooltips
    await nextTick();
    libraryStore.setBsTooltips();

    alert("A könyvet sikerült felvenni!");
  } catch (e) {
    alert(apiErrorMessage(e));
  }
}

// UPDATE
async function put(m) {
  try {

    const id = Number(m.id);
    const payload = toPayload(m);

    const r = await api.put(`/api/books/${id}`, payload);

    // Set books in store
    libraryStore.books = r.data;

    alert("A könyv módosítása megtörtént!");
  } catch (e) {
    alert(apiErrorMessage(e));
  }
}

// DELETE
async function remove(id, name) {
  if (!confirm(`${name}\nBiztosan törlöd a könyvet a kínálatból?`)) return;
  try {
    const r = await api.delete(`/api/books/${id}`);

    // Set books in store
    libraryStore.books = r.data;

    alert("A könyvet töröltük!");
  } catch (e) {
    alert(apiErrorMessage(e));
  }
}

// On mounted
onMounted(() => {

  // Load initial data
  libraryStore.initOnce();

  // Scroll to top
  libraryStore.scrollToTop();

  // Set bootstrap tooltips
  libraryStore.setBsTooltips();
});

</script>