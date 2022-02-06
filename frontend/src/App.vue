<template>
  <div>
    <NavBar
      v-if="user"
      :userId="user.id_user"
      :avatar="user.avatar"
      :pseudo="user.pseudo"
      class="nav"
    />
    <div v-else class="nav"></div>
    <router-view />
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";

export default {
  components: {
    NavBar,
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
};
</script>

<style>
:root {
  --main-red-color: #fd2d01;
  --main-blue-color: #134b98;
  --main-lightblue-color: #81a7be;
  --main-police: "Cursive", "Arial", "Impact";
}

body {
  margin: 0;
}
figure {
  margin: 0;
}
label {
  font-family: var(--main-police);
  color: var(--main-red-color);
  text-align: center;
  font-weight: bold;
}

input {
  margin: 5px 0 25px 0;
}
h1 {
  font-family: var(--main-police);
  color: var(--main-red-color);
}

h2 {
  font-family: var(--main-police);
  color: var(--main-blue-color);
}

p {
  font-family: var(--main-police);
}

*:focus {
  outline: 5px solid var(--main-lightblue-color);
}

.button_blue {
  color: white;
  padding: 10px;
  font-size: 20px;
  background-color: var(--main-blue-color);
  border: var(--main-blue-color);
  border-radius: 10px;
  margin: 20px;
  box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.63);
  transition: box-shadow;
}
.button_blue:hover {
  box-shadow: 0px 8px 5px 0px rgba(0, 0, 0, 0.801);
}

.button_red {
  color: white;
  padding: 10px;
  font-size: 20px;
  background-color: red;
  border: var(--main-blue-color);
  border-radius: 10px;
  margin: 20px;
  box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.63);
  transition: box-shadow;
}
.button_red:hover {
  box-shadow: 0px 8px 5px 0px rgba(0, 0, 0, 0.801);
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  text-decoration: none;
  font-family: var(--main-police);
}

.nav a.router-link-exact-active {
  color: var(--main-red-color);
}

.nav {
  margin-bottom: 40px;
}
</style>
