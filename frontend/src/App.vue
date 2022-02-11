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
  margin: 0 0 1em 0;
}
figure {
  margin: 0;
}
label {
  font-family: var(--main-police);
  color: var(--main-blue-color);
  font-size: 1.5em;
  text-align: center;
  font-weight: bold;
}
textarea {
  resize: none;
}

input {
  margin: 0.3125em 0 1.5em 0;
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
  outline: 0.3125em solid var(--main-lightblue-color);
}
.blue {
  color: var(--main-blue-color);
}
.red {
  color: red;
}
.button_blue {
  color: white;
  padding: 0.625em;
  font-size: 1.25em;
  background-color: var(--main-blue-color);
  border: var(--main-blue-color);
  border-radius: 0.625em;
  margin: 1.25em;
  box-shadow: 0 0.3125em 1em 0 rgba(0, 0, 0, 0.63);
  transition: box-shadow;
}
.button_blue:hover {
  box-shadow: 0 0.5em 0.3125em 0 rgba(0, 0, 0, 0.801);
}

.button_red {
  color: white;
  padding: 0.625em;
  font-size: 1.25em;
  background-color: red;
  border: var(--main-blue-color);
  border-radius: 0.625em;
  margin: 1.25em;
  box-shadow: 0 0.3125em 1em 0 rgba(0, 0, 0, 0.63);
  transition: box-shadow;
}
.button_red:hover {
  box-shadow: 0 0.5em 0.3125em 0 rgba(0, 0, 0, 0.801);
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
  margin-bottom: 2.5em;
}

.error {
  color: red;
  font-weight: bold;
}
</style>
