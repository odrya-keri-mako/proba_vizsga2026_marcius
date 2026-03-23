import { reactive } from "vue";

export const libraryStore = reactive({
  
  books: [],
  genres: [],

  filter: {
    search: "",
    key: "name"
  },

  // Books modal state
  modal: {
    mode: "DETAILS"
  }

});