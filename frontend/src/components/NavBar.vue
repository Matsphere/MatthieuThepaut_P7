<template>
  <div class="nav">
    <figure class="logo">
      <router-link :to="{ name: 'Acceuil' }">
        <img
          src="assets/icon-left-font.png"
          alt="Logo Groupomania"
          class="logo"
        />
      </router-link>
    </figure>
    <router-link :to="{ name: 'Acceuil' }">Acceuil</router-link>
    <router-link :to="{ name: 'Profil', params: { id_user: userId } }"
      >Profil</router-link
    >
    <router-link @click="logout" :to="{ name: 'Login' }"
      >Déconnexion</router-link
    >

    <router-link
      :to="{ name: 'Profil', params: { id_user: userId } }"
      class="nav_user"
    >
      <figure>
        <img :src="avatar" alt="Avatar de l'utilisateur" class="avatar" />
      </figure>
      <p>{{ this.pseudo }}</p>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "NavBar",

  props: {
    userId: Number,
    pseudo: String,
    avatar: String,
  },
  methods: {
    logout() {
      this.$store.commit("logout");
      this.$router.push({ name: "Login" });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #134b98;
}

.nav_user {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 150px;
}
a {
  color: white;
  font-weight: bold;
  font-size: 20px;
}
p {
  margin: 0;
}
.logo {
  height: 150px;
}

.avatar {
  height: 100px;
  margin: 5px;
  border-radius: 20px;
}
</style>
