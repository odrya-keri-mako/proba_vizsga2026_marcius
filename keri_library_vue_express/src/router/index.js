import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import BooksView from "../views/BooksView.vue";

export default createRouter({
  history: createWebHistory(),
  linkActiveClass: "active", 
  routes: [
    { path: "/", name: "home", component: HomeView },
    { path: "/books", name: "books", component: BooksView },
  ],
});