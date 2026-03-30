<template>
  <nav class="navbar navbar-expand-sm bg-body-tertiary">
    <div class="container-fluid px-4">

      <!-- Logo -->
      <a class="navbar-brand p-0 me-1" 
          href="#"
          @click.prevent="libraryStore.scrollToTop()">
        <img  src="../assets/image/logos/library.png"
              class="me-1" 
              height="40" 
              alt="logo">
        KERI könyvtár
      </a>

      <!-- Breakpoints -->
      <h3 id="bs-brakpoints" 
          class="w-auto m-0 z-3"
          :class="{'d-none': !isShowBsBreakPoints}">
        <span class="d-sm-none">XS</span>
        <span class="d-none d-sm-block d-md-none">SM</span>
        <span class="d-none d-md-block d-lg-none">MD</span>
        <span class="d-none d-lg-block d-xl-none">LG</span>
        <span class="d-none d-xl-block d-xxl-none">XL</span>
        <span class="d-none d-xxl-block">XXL</span>
      </h3>

      <!-- Hamburger icon -->
      <button class="navbar-toggler ms-auto me-2" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarDocument" 
              aria-controls="navbarDocument" 
              aria-expanded="false" 
              aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Filter/Toggle theme -->
      <ul class="navbar-nav flex-row">

        <!-- Filter -->
        <li class="nav-item rounded d-inline-block d-sm-none px-2"
            title="Szelekció"
            data-bs-toggle="tooltip"
            data-bs-placement="bottom" 
            data-bs-title="Szelekció"
            v-if="routeId === 'books'">
          <a  class="nav-link"
              href="#"
              data-bs-toggle="offcanvas" 
              data-bs-target="#offcanvasFilter" 
              aria-controls="offcanvasFilter">
            <i class="fa-solid fa-lg fa-filter"></i>
          </a>
        </li>

        <!-- Toggle theme -->
        <li class="nav-item rounded d-inline-block d-sm-none px-2"
            title="Témaváltás"
            data-bs-toggle="tooltip"
            data-bs-placement="bottom" 
            data-bs-title="Témaváltás"
            @click.prevent="toggleTheme">
            <a class="nav-link" 
               href="#">
              <i class="fa-solid fa-lg" 
                 :class="theme === 'dark' ? 'fa-sun' : 'fa-moon'"></i>
            </a>
        </li>
      </ul>

      <!-- Navbar colapse -->
      <div  class="collapse navbar-collapse" 
            id="navbarDocument">
        <ul class="navbar-nav ms-auto mt-3 mt-sm-0 text-center">

          <!-- Home -->
          <li class="nav-item rounded">
            <RouterLink class="nav-link" to="/">
              <i class="fa-solid fa-house me-1"></i> 
              Kezdőlap
            </RouterLink>
          </li>

          <!-- Books -->
          <li class="nav-item rounded">
            <RouterLink class="nav-link" to="/books">
              <i class="fa-solid fa-book me-1"></i> 
              Könyvek
            </RouterLink>
          </li>

          <!-- Filter -->
          <li class="nav-item rounded d-none d-sm-inline-block"
              title="Szelekció"
              data-bs-toggle="tooltip"
              data-bs-placement="bottom" 
              data-bs-title="Szelekció"
              v-if="routeId === 'books'">
              <a  class="nav-link"
                  href="#"
                  data-bs-toggle="offcanvas" 
                  data-bs-target="#offcanvasFilter" 
                  aria-controls="offcanvasFilter">
              <i class="fa-solid fa-lg fa-filter"
                 :class="{'text-danger': filter.search !== ''}"></i>
            </a>
          </li>

          <!-- Toggle theme -->
          <li class="nav-item rounded d-none d-sm-inline-block"
              title="Témaváltás"
              data-bs-toggle="tooltip"
              data-bs-placement="bottom" 
              data-bs-title="Témaváltás"
              @click.prevent="toggleTheme">
            <a class="nav-link" 
               href="#">
              <i class="fa-solid fa-lg" 
                 :class="theme === 'dark' ? 'fa-sun' : 'fa-moon'"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>  
</template>

<script setup>
import { RouterLink, useRoute } from "vue-router";
import { computed, onMounted, ref } from "vue";
import { libraryStore } from "../stores/libraryStore";

// route
const route = useRoute();
const routeId = computed(() => route.name);

// theme (nálad ez oké maradhat)
const theme = ref(localStorage.getItem("keri_library_theme") ?? "dark");
const setTheme = () => {
  document.body.setAttribute("data-bs-theme", theme.value);
  localStorage.setItem("keri_library_theme", theme.value);
};
setTheme();

const toggleTheme = () => {
  theme.value = theme.value === "light" ? "dark" : "light";
  setTheme();
};

// Set filter from store
const filter = libraryStore.filter;

// On mounted
onMounted(() => {

  // Set bootstrap tooltips
  libraryStore.setBsTooltips();
});

// Show/Hide breakpoints
const isShowBsBreakPoints = ref(false);
document.addEventListener("keyup", (event) => {
  if (event.altKey && event.key === 'b')
    isShowBsBreakPoints.value = !isShowBsBreakPoints.value;
});

</script>