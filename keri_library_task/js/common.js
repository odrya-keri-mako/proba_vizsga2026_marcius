// Genres
let genres = [
  { "id":  1, "name": "Szépirodalom" },
  { "id":  2, "name": "Ifjúsági" },
  { "id":  3, "name": "Gyermekkönyv" },
  { "id":  4, "name": "Fantasztikus" },
  { "id":  5, "name": "Thriller" },
  { "id":  6, "name": "Romantikus" },
  { "id":  7, "name": "Történelmi" },
  { "id":  8, "name": "Ismeretterjesztő" },
  { "id":  9, "name": "Tankönyv" },
  { "id": 10, "name": "Életmód" },
  { "id": 11, "name": "Gazdaság" },
  { "id": 12, "name": "Művészet" }
];

// Books
let books = [
  {
    "id": 1,
    "name": "A Pál utcai fiúk",
    "genre_id": 2,
    "author": "Molnár Ferenc",
    "publicated": "1907",
    "description": "Barátság, hűség és összetartás története egy grundért vívott küzdelemben."
  },
  {
    "id": 2,
    "name": "Egri csillagok",
    "genre_id": 7,
    "author": "Gárdonyi Géza",
    "publicated": "1899",
    "description": "A török ostrom idején hősök és sorsok fonódnak össze Eger várának falai között."
  },
  {
    "id": 3,
    "name": "Az ember tragédiája",
    "genre_id": 1,
    "author": "Madách Imre",
    "publicated": "1861",
    "description": "Filozofikus drámai költemény az emberi történelem nagy kérdéseiről."
  },
  {
    "id": 4,
    "name": "Légy jó mindhalálig",
    "genre_id": 2,
    "author": "Móricz Zsigmond",
    "publicated": "1920",
    "description": "Egy diák szemén át látszik, milyen nehéz tisztességesnek maradni az életben."
  },
  {
    "id": 5,
    "name": "Micimackó",
    "genre_id": 3,
    "author": "A. A. Milne",
    "publicated": "1926",
    "description": "Kedves mesék a Százholdas pagony lakóiról, barátságról és játékos kalandokról."
  },
  {
    "id": 6,
    "name": "A kis herceg",
    "genre_id": 3,
    "author": "Antoine de Saint-Exupéry",
    "publicated": "1943",
    "description": "Mesés utazás bolygóról bolygóra, egyszerű mondatokban nagy igazságokkal."
  },
  {
    "id": 7,
    "name": "Harry Potter és a bölcsek köve",
    "genre_id": 4,
    "author": "J. K. Rowling",
    "publicated": "1997",
    "description": "Egy különleges fiú megismeri a varázsvilágot, és elkezdődik a kaland a Roxfortban."
  },
  {
    "id": 8,
    "name": "A Hobbit",
    "genre_id": 4,
    "author": "J. R. R. Tolkien",
    "publicated": "1937",
    "description": "Bilbó egy váratlan utazáson talál bátorságra, barátokra és egy titokzatos gyűrűre."
  },
  {
    "id": 9,
    "name": "Frankenstein",
    "genre_id": 4,
    "author": "Mary Shelley",
    "publicated": "1818",
    "description": "Egy tudós teremtése életre kel, és kérdéseket vet fel felelősségről és emberségről."
  },
  {
    "id": 10,
    "name": "A Da Vinci-kód",
    "genre_id": 5,
    "author": "Dan Brown",
    "publicated": "2003",
    "description": "Rejtélyek és kódok nyomán egy veszélyes összeesküvés bontakozik ki Európa szívében."
  },
  {
    "id": 11,
    "name": "A csendes páciens",
    "genre_id": 5,
    "author": "Alex Michaelides",
    "publicated": "2019",
    "description": "Egy nő néma marad egy tragédia után, és egy terapeuta megszállottan keresi az okot."
  },
  {
    "id": 12,
    "name": "Gyilkosság az Orient expresszen",
    "genre_id": 5,
    "author": "Agatha Christie",
    "publicated": "1934",
    "description": "Poirot egy vonaton rekedve old meg egy bűntényt, ahol mindenkinek lehet indítéka."
  },
  {
    "id": 13,
    "name": "Büszkeség és balítélet",
    "genre_id": 6,
    "author": "Jane Austen",
    "publicated": "1813",
    "description": "Szellemes és érzelmes történet szerelemről, félreértésekről és társadalmi elvárásokról."
  },
  {
    "id": 14,
    "name": "A notebook",
    "genre_id": 6,
    "author": "Nicholas Sparks",
    "publicated": "1996",
    "description": "Egy nagy szerelem emlékei kelnek életre, amikor a múlt és a jelen összefonódik."
  },
  {
    "id": 15,
    "name": "Anna Karenina",
    "genre_id": 6,
    "author": "Lev Tolsztoj",
    "publicated": "1878",
    "description": "Szenvedély és társadalmi ítélet között őrlődő sorsok a 19. századi Oroszországban."
  },
  {
    "id": 16,
    "name": "Sapiens - Az emberiség rövid története",
    "genre_id": 8,
    "author": "Yuval Noah Harari",
    "publicated": "2011",
    "description": "Közérthető áttekintés arról, hogyan lett a Homo sapiens a Föld meghatározó faja."
  },
  {
    "id": 17,
    "name": "A világegyetem rövid története",
    "genre_id": 8,
    "author": "Stephen Hawking",
    "publicated": "1988",
    "description": "Bevezető a kozmológia nagy kérdéseibe: téridő, fekete lyukak és az univerzum eredete."
  },
  {
    "id": 18,
    "name": "Gondolkodj gyorsan, dönts lassan",
    "genre_id": 8,
    "author": "Daniel Kahneman",
    "publicated": "2011",
    "description": "Hogyan hozunk döntéseket, és miért tévedünk gyakran? Két gondolkodási rendszer nyomában."
  },
  {
    "id": 19,
    "name": "Matematika 7. osztály",
    "genre_id": 9,
    "author": "Szerzői munkaközösség",
    "publicated": "2020",
    "description": "Feladatok és magyarázatok arányosságra, egyenletekre, geometriára - gyakorlásra kihegyezve."
  },
  {
    "id": 20,
    "name": "Angol nyelvkönyv B1",
    "genre_id": 9,
    "author": "Szerzői munkaközösség",
    "publicated": "2021",
    "description": "Középszintű nyelvtan, szókincs és kommunikációs feladatok iskolai használatra."
  },
  {
    "id": 21,
    "name": "Atomic Habits",
    "genre_id": 10,
    "author": "James Clear",
    "publicated": "2018",
    "description": "Apró szokásokból nagy változás: gyakorlati módszerek a tartós fejlődéshez."
  },
  {
    "id": 22,
    "name": "Miért alszunk?",
    "genre_id": 10,
    "author": "Matthew Walker",
    "publicated": "2017",
    "description": "Az alvás szerepe az egészségben, tanulásban és teljesítményben - közérthetően, kutatásokra építve."
  },
  {
    "id": 23,
    "name": "A pénzügyi intelligencia",
    "genre_id": 11,
    "author": "Robert T. Kiyosaki",
    "publicated": "1997",
    "description": "Alap gondolatok pénzről, szemléletről és a személyes pénzügyek tudatosabb kezeléséről."
  },
  {
    "id": 24,
    "name": "A befektetés pszichológiája",
    "genre_id": 11,
    "author": "Morgan Housel",
    "publicated": "2020",
    "description": "Történetek és tanulságok arról, hogyan befolyásolja a viselkedés a pénzügyi döntéseinket."
  },
  {
    "id": 25,
    "name": "A művészet története",
    "genre_id": 12,
    "author": "E. H. Gombrich",
    "publicated": "1950",
    "description": "Átfogó, mégis olvasmányos bevezető a képzőművészet nagy korszakaiba és stílusaiba."
  },
  {
    "id": 26,
    "name": "Művészet - Alapok",
    "genre_id": 12,
    "author": "Szerzői munkaközösség",
    "publicated": "2019",
    "description": "Rajzi és vizuális alapismeretek: kompozíció, színek, formák és technikák rövid összefoglalóval."
  }
];

// Get elements, and last choice theme
let appContainer  = document.querySelector('.app-container'),
    toggleIcons   = document.querySelectorAll('i.theme-icon'),
    bsBrakpoints  = document.querySelector('#bs-brakpoints'),
    currentYear   = document.querySelector('#current-year'),
    currentTheme  = localStorage.getItem('keri_library_theme') ?? 'dark';
    
// Set theme
document.body.setAttribute('data-bs-theme', currentTheme);
toggleIcons.forEach(e => {
  e.classList[currentTheme === 'dark' ? 'remove' : 'add']('fa-moon');
  e.classList[currentTheme === 'dark' ? 'add' : 'remove']('fa-sun');
});

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
function setBsTooltips() {
  setTimeout(() => {
    let tooltips = document.querySelectorAll( 
                      '[data-bs-toggle="tooltip"]:not(.tooltip-set)');
    [...tooltips].map(e => {
      e.classList.add('tooltip-set');
      new bootstrap.Tooltip(e);
    });
  }, 600);
}
