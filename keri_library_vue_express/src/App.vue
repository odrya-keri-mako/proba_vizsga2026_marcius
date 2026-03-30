<template>
  <div class="app-container position-relative d-flex flex-column 
              vh-100 overflow-x-hidden overflow-y-auto">
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
import { onMounted } from "vue";
import { RouterView } from "vue-router";
import { libraryStore } from "./stores/libraryStore";

import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";

// On mounted
onMounted(() => {

  // Load initial data
  libraryStore.initOnce();
});
</script>
