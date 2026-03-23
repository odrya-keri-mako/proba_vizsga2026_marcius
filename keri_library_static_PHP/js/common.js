
// Set data
let {genres, books} = [];

// Set filter
let filter = {search: '', key: 'name'};

// Get data
function getData() {
  return new Promise((resolve, reject) => {
    fetch('./php/get.php')
    .then(response => response.json())
    .then(response => {
      if (!response.error) {
              resolve(response.data);
      } else reject(response.error);
    })
    .catch(error => reject(error.message));
  });
}

// Get elements, and last choice theme
let appContainer  = document.querySelector('.app-container'),
    toggleIcons   = document.querySelectorAll('i.theme-icon'),
    bsBrakpoints  = document.querySelector('#bs-brakpoints'),
    currentYear   = document.querySelector('#current-year'),
    currentTheme  = localStorage.getItem('keri_library_theme') ?? 'dark',
    currentFilter = localStorage.getItem('keri_library_filter');
    
// Set theme
document.body.setAttribute('data-bs-theme', currentTheme);
toggleIcons.forEach(e => {
  e.classList[currentTheme === 'dark' ? 'remove' : 'add']('fa-moon');
  e.classList[currentTheme === 'dark' ? 'add' : 'remove']('fa-sun');
});

// Set filter
if (currentFilter) filter = JSON.parse(currentFilter);

// Set current year
currentYear.textContent = (new Date()).getFullYear();

// Show/Hide breakpoints
document.addEventListener("keyup", (event) => {
  if (event.altKey && event.key === 'b') {
    bsBrakpoints.classList.toggle('d-none');
  }
}, false);

// Toggle theme
function toggleTheme() {
  let currentTheme  = document.body.getAttribute('data-bs-theme'),
      nextTheme     = currentTheme === 'dark'? 'light' : 'dark';
  document.body.setAttribute('data-bs-theme', nextTheme);
  localStorage.setItem('keri_library_theme', nextTheme);
  toggleIcons.forEach(e => {
    e.classList.toggle('fa-moon');
    e.classList.toggle('fa-sun');
  });
}

// Scroll to top
function scrollToTop() {
  setTimeout(() => {
    if (appContainer &&
      (appContainer.scrollTop > 0 ||
        appContainer.scrollLeft > 0))
      appContainer.scrollTo(0, 0);
  }, 100);
}

// Set bootstrap tooltips
setTimeout(() => {
  let tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  [...tooltips].map(e => new bootstrap.Tooltip(e));
}, 600);
