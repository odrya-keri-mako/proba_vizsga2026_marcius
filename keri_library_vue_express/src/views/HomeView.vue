<style scoped>
  .parallax {
    min-height: 600px; 
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .parallax-content {
    color: white !important;
    opacity: 0;
    transform: translateX(0);
    transition: transform 600ms ease, 
                opacity 300ms ease;
    will-change: transform, opacity;
  }
  .parallax-content.from-left  { transform: translateX(-300px); }
  .parallax-content.from-right { transform: translateX( 300px); }
  .parallax-content.show {
    opacity: 1;
    transform: translateX(0);
  }
</style>
<template>

  <!-- Greeting -->
  <div class="container">
    <div class="row py-5 justify-content-center">
      <h6 class="col-11 col-sm-10 col-md-9 col-lg-8 
                text-center display-6 mb-4">
        Köszöntünk az Iskolai Könyvtár honlapján!
      </h6>
      <p class="col-11 col-sm-10 col-md-9 col-lg-8 
                text-center text-muted">
        Legyen szó kötelező olvasmányról, regényről vagy ismeretterjesztő könyvről, nálunk biztosan találsz valami izgalmasat. Kattints a Könyvek menüpontra, és nézz körül a kategóriákban.
      </p>
    </div>
  </div>

  <!-- Paralax image -->
  <div class="container-fluid parallax position-relative"
      style="background-image: url('/src/assets/image/paralax/paralax_01.jpg');">
    <h5 class="display-5 position-absolute p-3 rounded
               bg-dark-transparent parallax-content from-right"
        style="top:100px;right:50px;">
      Könyvtár, ahol a kíváncsiság otthon van.
    </h5>
  </div>

  <!-- Recommendation -->
  <div class="container">
    <div class="row pt-5">
      <h6 class="text-center display-6">Könyvajánló:</h6>
    </div>
    <div class="row recommendation py-5 g-4
                row-cols-1 row-cols-md-2 row-cols-xl-3">
      <div v-for="b in recommend" 
           class="col">
        <div class="card h-100 shadow-sm-bottom-end">
          <img v-bind:src="'/src/assets/image/coveres/genre-' + 
                            String(b.genre_id).padStart(2,'0') + '.png'" 
               class="card-img-top" alt="genre">
          <div class="card-body">
            <h4 class="card-title">{{ b.name }}</h4>
            <p class="mb-0">{{ b.author }}</p>
            <p class="mb-0">{{ b.publicated }}</p>
            <p class="mb-0">{{ b.genre_name }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Paralax image -->
  <div class="container-fluid parallax position-relative"
       style="background-image: url('/src/assets/image/paralax/paralax_02.jpg');">
    <h5 class="display-5 position-absolute p-3 rounded 
               bg-dark-transparent parallax-content from-left"
        style="bottom:250px;left:50px;">
      Olvass ma, a jobb holnapért.
    </h5>
  </div>

  <!-- Information/Opening hours -->
  <div class="container">
    <div class="row align-items-center py-5 g-4">

      <!-- Information -->
      <div class="col-lg-8">
        <h2 class="mb-4">Könyvtárhasználati tudnivalók</h2>
        <h4>Aktuális könyvtárhasználati információk</h4>
        <p>
          Szolgáltatásaink az általános rend szerint üzemelnek. Az új kölcsönzésekre a kölcsönzési szabályzatunk rendelkezései vonatkoznak. Kérjük, hogy olvasójegyét mindenki hozza magával.
        </p>
        <h4>KÖNYV KÉRÉSE ÉS KÖLCSÖNZÉSE</h4>
        <ul>
          <li>
            Olvasóink a kölcsönözni kívánt raktári könyveket az online katalógusunk segítségével kérhetik ki.
          </li>
          <li>
            A kérések teljesítése a leadásától számított 35-45 percen belül várható, de a katalógus minden esetben tájékoztat a pontos időpontról, amikortól a kért könyvek átvehetők.
          </li>
          <li>
            A kölcsönzésre kért könyvek átvételére személyesen van lehetőség a könyvtár Kölcsönző pultjánál.
          </li>
        </ul>
        <h4>VISSZAVÉTEL</h4>
        <p>
          Olvasóink a kikölcsönzött példányokat személyesen vissza tudják hozni, illetve a visszaérkező könyveket postai úton, ajánlott küldeményként vagy csomagként is fogadjuk. Amennyiben az aktuálisan kikölcsönzött könyvekkel kapcsolatban bármilyen probléma vagy kérdés merülne fel, munkatársaink kereshetők a megadott elérhetőségeinken.
        </p>
      </div>
      
      <!-- Opening hours -->
      <div class="col-lg-4">
        <div class="card shadow-sm">
          <div class="card-body">
            <h2 class="h5 fw-semibold mb-3">Nyitvatartás:</h2>
            <ul class="list-group list-group-flush">
              <li class="list-group-item d-flex 
                        justify-content-between align-items-center">
                Hétfő
                <span class="badge text-body">8:00 - 14:00</span>
              </li>
              <li class="list-group-item d-flex 
                        justify-content-between align-items-center">
                Kedd
                <span class="badge text-body">8:00 - 16:00</span>
              </li>
              <li class="list-group-item d-flex 
                        justify-content-between align-items-center">
                Szerda
                <span class="badge text-body">8:00 - 14:00</span>
              </li>
              <li class="list-group-item d-flex 
                        justify-content-between align-items-center">
                Csütörtök
                <span class="badge text-body">8:00 - 16:00</span>
              </li>
              <li class="list-group-item d-flex 
                        justify-content-between align-items-center">
                Péntek
                <span class="badge text-body">8:00 - 14:00</span>
              </li>
            </ul>
            <div class="alert alert-dark mt-3 mb-0">
              <div class="fw-semibold">Ebédszünet</div>
              <div class="small">12:30 - 13:00</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Paralax image -->
  <div class="container-fluid parallax position-relative"
       style="background-image: url('/src/assets/image/paralax/paralax_03.jpg');">
    <h5 class="display-5 position-absolute p-3 rounded
               bg-dark-transparent parallax-content from-right"
        style="top:100px;right:50px;">
      Könyvek, amik veled maradnak.
    </h5>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, watch, nextTick } from "vue";
import { libraryStore } from "../stores/libraryStore";

// Set recommendation list
const recommend = ref([]);

// Get random books
function pickRandom(list, n) {
  const copy = [...list];
  copy.sort(() => 0.5 - Math.random());
  return copy.slice(0, n);
}

// Initial intersection observer for parallax content
let io = null;
function initParallaxTextAnimations() {
  const items = document.querySelectorAll(".parallax-content");

  // ha már volt observer, bontsuk
  if (io) io.disconnect();

  io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("show");
      else entry.target.classList.remove("show");
    });
  }, { threshold: 0.15 });

  items.forEach((el) => io.observe(el));
}

// Watch books in store
watch(
  () => libraryStore.books,
  (books) => {
    if (Array.isArray(books) && books.length > 0) {
      recommend.value = pickRandom(books, 6);
    }
  },
  { immediate: true }
);

// On mounted
onMounted(async () => {

  // Load initial data
  await libraryStore.initOnce();

  // Scroll to top
  libraryStore.scrollToTop();
  
  // Initial intersection observer for parallax content
  await nextTick();
  initParallaxTextAnimations();
});

// On before unmount
onBeforeUnmount(() => {
  if (io) io.disconnect();
});

</script>