import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Acceuil from "../views/Acceuil.vue";
import Article from "../views/Article.vue";
import Profil from "../views/Profil.vue";

const routes = [
  {
    path: "/",
    name: "Acceuil",
    component: Acceuil,
  },
  {
    path: "/article/:id",
    name: "Article",
    component: Article,
    props: true,
  },
  {
    path: "/profil/:id",
    name: "Profil",
    component: Profil,
    props: true,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
