<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary border-bottom sticky-top">
    <div class="container">
      <RouterLink class="navbar-brand fw-semibold" to="/">
        <i class="fa-solid fa-book-open me-2"></i> 
        Könyvtár
      </RouterLink>

      <button class="navbar-toggler" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navMain">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" 
           id="navMain">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <RouterLink class="nav-link" to="/">
              <i class="fa-solid fa-house me-1"></i> 
              Kezdőlap
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/books">
              <i class="fa-solid fa-book me-1"></i> 
              Könyvek
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