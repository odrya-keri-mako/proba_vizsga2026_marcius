<template>
  <div class="container-fluid border-top py-3 bg-body-tertiary px-5">

    <!-- Contact/Quick links/Social media -->
    <div class="row">

      <!-- Contact -->
      <div class="col-md-6 mb-3 mb-md-0">
        <div class="row">

          <!-- Logo -->
          <div class="col-12 col-sm-3 text-sm-center mb-3 mb-sm-0">
            <img src="../assets/image/logos/keri.png"
                  class="me-1" 
                  height="80" 
                  alt="logo">
          </div>

          <!-- Contact -->
          <div class="col-12 col-sm-9">
            <h5 class="">
              Hódmezővásárhelyi SZC<br> 
              Makói Návay Lajos Technikum és Kollégium
            </h5>
            <p>
              6900 Makó, Posta u. 4-6
            </p>
          </div>
        </div>
      </div>

      <!-- Quick links -->
      <div class="col-md-3 mb-3 mb-md-0 d-flex flex-column">
        <h5 class="ps-2">Gyorslinkek</h5>
        <ul class="list-unstyled flex-fill align-content-center">

          <!-- Home -->
          <li class="nav-item d-inline-block rounded p-2">
            <RouterLink class="nav-link" to="/">
              <i class="fa-solid fa-house me-1"></i> 
              Kezdőlap
            </RouterLink>
          </li>

          <!-- Books -->
          <li class="nav-item d-inline-block rounded p-2">
            <RouterLink class="nav-link" to="/books">
              <i class="fa-solid fa-book me-1"></i> 
              Könyvek
            </RouterLink>
          </li>
        </ul>
      </div>

      <!-- Social media -->
      <div class="col-md-3 mb-2 mb-md-0 d-flex flex-column">
        <h5>Kövess minket</h5>
        <ul class="list-inline social-icons
                    flex-fill align-content-center">

          <!-- Facebook -->
          <li class="list-inline-item p-1 mb-2"
              title="Facebook"
              data-bs-toggle="tooltip"
              data-bs-title="Facebook">
            <a href="https://www.facebook.com/makokeri/"
                target="_blank"
                class="nav-link">
              <i class="fa-brands fa-facebook fa-xl"></i>
            </a>
          </li>

          <!-- Instagram -->
          <li class="list-inline-item p-1 mb-2"
              title="Instagram"
              data-bs-toggle="tooltip"
              data-bs-title="Instagram">
            <a href="https://www.instagram.com/makokeri"
                target="_blank"
                class="nav-link">
              <i class="fa-brands fa-instagram fa-xl"></i>
            </a>
          </li>

          <!-- Tiktok -->
          <li class="list-inline-item p-1 mb-2"
              title="Tiktok"
              data-bs-toggle="tooltip"
              data-bs-title="Tiktok">
            <a href="https://www.tiktok.com/@makokeri" 
                target="_blank"
                class="nav-link">
              <i class="fa-brands fa-tiktok fa-xl"></i>
            </a>
          </li>

          <!-- Linked in -->
          <li class="list-inline-item p-1 mb-2"
              title="LinkedIn"
              data-bs-toggle="tooltip"
              data-bs-title="LinkedIn">
            <a href="https://www.linkedin.com/in/kerimako/" 
                target="_blank"
                class="nav-link">
              <i class="fa-brands fa-square-linkedin fa-xl"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <hr class="mb-3">

    <!-- Copyright -->
    <div class="row">
      <div class="col-md-12 text-center">
        <p class="mb-0" style="font-size:10px;">
          &copy; 2021-{{ currentYear }} KERI Informatika
        </p>
      </div>
    </div>
  </div>
</template>
<script setup>
  import { RouterLink } from "vue-router";
  const currentYear = (new Date()).getFullYear();
</script>