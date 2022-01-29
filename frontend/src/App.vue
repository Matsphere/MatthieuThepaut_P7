<template>
  <div>
    <NavBar
      v-if="user"
      :id_user="user.id_user"
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
body {
  margin: 0;
}
figure {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

a {
  text-decoration: none;
}

.nav a.router-link-exact-active {
  color: #42b983;
}

.nav {
  margin-bottom: 40px;
}
</style>
