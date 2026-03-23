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
import { RouterView } from "vue-router";
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";
</script>
