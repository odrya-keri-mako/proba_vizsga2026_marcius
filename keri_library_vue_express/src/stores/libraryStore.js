import { reactive } from "vue";
import { Tooltip } from "bootstrap";
import { api } from "../services/api";

export const libraryStore = reactive({
  
  books: [],
  genres: [],

  loaded: false,
  loading: false,
  error: "",

  // Set promise
  _initPromise: null,

  // Set filter
  filter: { search: "", key: "name" },

  // Load initial data
  async initOnce() {
    if (this.loaded) return;
    if (this._initPromise) return this._initPromise;
    this.loading = true;
    this.error = "";

    this._initPromise = (async () => {
      try {
        const r = await api.get("/api/init");
        this.books = r.data.books || [];
        this.genres = r.data.genres || [];
        this.loaded = true;
      } catch (e) {
        this.error = e?.response?.data?.error || "Init betöltés hiba.";
      } finally {
        this.loading = false;
        this._initPromise = null;
      }
    })();
    return this._initPromise;
  },

  // Scroll to top
  scrollToTop() {
    const appContainer = document.querySelector(".app-container");
    if (appContainer &&
       (appContainer.scrollTop > 0 ||
        appContainer.scrollLeft > 0))
        appContainer.scrollTo(0, 0);
  },

  // Set bootstrap tooltips
  setBsTooltips() {
    const tooltips = document.querySelectorAll(
      '[data-bs-toggle="tooltip"]:not(.tooltip-set)'
    );

    [...tooltips].forEach((el) => {
      el.classList.add("tooltip-set");
      Tooltip.getOrCreateInstance(el);
    });
  },
});