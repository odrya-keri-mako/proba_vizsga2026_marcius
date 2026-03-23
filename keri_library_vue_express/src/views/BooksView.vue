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
            <div class="d-flex justify-content-between">
              <h4 class="mb-0 p-2">
                <i class="fa-solid fa-book me-1"></i>
                KINÁLATUNK
              </h4>
              <button class="btn btn-sm me-3 my-1 btn-primary"
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
              <th class="text-center">Műveletek</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(b, i) in filteredBooks" :key="b.id">
              <td class="text-end">{{ i + 1 }}</td>
              <td class="text-end">{{ b.id }}</td>
              <td class="fw-semibold">{{ b.name }}</td>
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
                        @click="remove(b)"
                        title="Törlés"
                        data-bs-toggle="tooltip" 
                        data-bs-title="Törlés">
                  <i class="fa-solid fa-circle-xmark"></i>
                </button>
              </td>
            </tr>

            <tr v-if="filteredBooks.length === 0">
              <td colspan="7" class="text-secondary">
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
          <form name="bookForm">

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
                     pattern="/^(?=(?:.*[^ ]){2,}).*$/"
                     required
                     :disabled="modalType === 'details'">
            </div>

            <!-- Genre -->
            <div class="mb-3">
              <label for="genre_id" 
                    class="form-label">
                Műfaj:
              </label>
              <select class="form-select">
                <option value="">-- Kérem válasszon --</option>
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
                    pattern="/^(?=(?:.*[^ ]){2,}).*$/"
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
                      pattern="/^[1-9][0-9]{3}$/"
                      maxlength="4" 
                      required
                      placeholder="kiadva"
                      style="width: 100px;"
                      :disabled="modalType === 'details'">
              </div>
            </div>

            <!-- Description -->
            <div class="mb-3">
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
                        pattern="/^(?=(?:.*[^ ]){2,}).*$/" 
                        rows="3" 
                        required
                        :disabled="modalType === 'details'">
              </textarea>
            </div>
          </form>
        </div>

        <!-- Buttons -->
        <div class="modal-footer">

          <!-- Ok/Cancel -->
          <button type="button" 
                  class="btn btn-secondary mx-1" 
                  data-bs-dismiss="modal">
            <i class="fa-solid fa-circle-xmark"></i>
            <span v-if="modalType === 'details'">
              Bezár
            </span>
            <span v-if="modalType === 'new' || modalType === 'modify'">
              Mégsem
            </span>
          </button>
          
          <!-- Save -->
          <button id="btn-save"
                  type="button" 
                  class="btn btn-primary mx-1"
                  data-bs-dismiss="modal"
                  @click.prevent="modalType === 'new' ? post(model) : put(model)"
                  v-if="modalType !== 'details'">
            <i class="fa-solid fa-floppy-disk"></i>
            Mentés
          </button>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { Modal, Offcanvas } from "bootstrap";
import { api } from "../services/api";
import { libraryStore } from "../stores/libraryStore";

const books = ref([]);
const genres = ref([]);

// ⬇️ közös filter
const filter = libraryStore.filter;

// modal állapot
let modalInstance = null;
const modalTitle = ref("");
const readonly = ref(false);
const error = ref("");

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

function openModal() {
  const el = document.getElementById("bookModal");
  modalInstance = Modal.getOrCreateInstance(el, { keyboard: false });
  error.value = "";
  modalInstance.show();
}

function openNew() {
  modalTitle.value = "FELVÉTEL";
  readonly.value = false;
  model.value = { ...modelDefault };
  modalType.value = 'new';
  openModal();
}

function openEdit(b) {
  modalTitle.value = "MÓDOSÍT";
  readonly.value = false;
  model.value = { ...b };
  modalType.value = 'modify';
  openModal();
}

function openDetails(b) {
  modalTitle.value = "RÉSZLETEK";
  readonly.value = true;
  model.value = { ...b };
  modalType.value = 'details';
  openModal();
}

// Offcanvas példány (ha pl. bezárnád mentés után)
let offcanvasInstance = null;
function closeOffcanvas() {
  const el = document.getElementById("offcanvasFilter");
  offcanvasInstance = Offcanvas.getOrCreateInstance(el);
  offcanvasInstance.hide();
}

const filteredBooks = computed(() => {
  const q = filter.search.trim().toLowerCase();
  const key = filter.key;

  if (!q) return books.value;

  return books.value.filter((b) => {
    const val = String(b[key] ?? "").toLowerCase();
    return val.includes(q);
  });
});

async function loadInit() {
  const r = await api.get("/api/init");
  books.value = r.data.books;
  genres.value = r.data.genres;

  // opcionális: store-be is kiírhatod
  libraryStore.books = books.value;
  libraryStore.genres = genres.value;
}

// Remove focus warring when modal close
setTimeout(() => {
  const modalElement = document.querySelector('#bookModal');
  modalElement.addEventListener('hide.bs.modal', () => {
      if (document.activeElement instanceof HTMLElement)
        document.activeElement.blur();
  });
}, 600)

onMounted(loadInit);
</script>