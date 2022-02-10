import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Acceuil from "../views/Acceuil.vue";
import CreatePublication from "../views/CreatePublication";
import Profil from "../views/Profil.vue";
import Signup from "../views/Signup.vue";
import ErrorMsg from "../views/ErrorMsg.vue";

const routes = [
  {
    path: "/",
    name: "Acceuil",
    component: Acceuil,
  },
  {
    path: "/createPublication",
    name: "CreatePublication",
    component: CreatePublication,
    props: true,
  },
  {
    path: "/profil/:id_user",
    name: "Profil",
    component: Profil,
    props: true,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/error/:error",
    name: "Error",
    component: ErrorMsg,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.URL),
  routes,
});

export default router;
