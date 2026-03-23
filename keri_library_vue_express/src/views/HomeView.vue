<template>
  <div class="p-4 p-md-5 bg-light border rounded-3">
    <h1 class="h3 fw-semibold mb-2">
      Iskolai könyvtár
    </h1>
    <p class="text-secondary mb-4">
      Böngéssz a könyvek között, és találd meg a következő kedvenced.
    </p>
    <RouterLink class="btn btn-primary" to="/books">
      Könyvek megnyitása
    </RouterLink>
  </div>

  <h2 class="h5 fw-semibold mt-4">Ajánlott könyvek</h2>

  <div class="row g-3 mt-1">
    <div v-for="b in recommend" :key="b.id" class="col-12 col-md-6 col-lg-4">
      <div class="card h-100">
        <div class="card-body">
          <div class="small text-secondary">
            {{ b.genre_name }}
          </div>
          <div class="fw-semibold">
            {{ b.name }}
          </div>
          <div class="text-secondary">
            {{ b.author }} ({{ b.publicated }})
          </div>
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