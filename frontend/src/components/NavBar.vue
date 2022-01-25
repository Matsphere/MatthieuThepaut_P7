<template>
  <div class="nav">
    <figure>
      <router-link to="/">
        <img
          src="@/assets/images/icon-left-font.svg"
          alt="Logo Groupomania"
          class="logo"
        />
      </router-link>
    </figure>
    <router-link :to="{ name: 'Acceuil' }">Acceuil</router-link>
    <router-link :to="{ name: 'Profil', params: { id: userId } }"
      >Profil</router-link
    >
    <router-link @click="logout" :to="{ name: 'Login' }"
      >Déconnexion</router-link
    >
    <div class="nav_user">
      <router-link :to="{ name: 'Profil', params: { id: userId } }">
        <figure>
          <img :src="avatar" alt="Avatar de l'utilisateur" class="avatar" />
        </figure>
        <p>{{ this.pseudo }}</p>
      </router-link>
    </div>
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
    async logout() {
      await this.$store.dispatch("logout");
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
  border-bottom: 10px solid blue;
}

a {
  color: blue;
}

.logo {
  height: 150px;
}

.avatar {
  height: 100px;
  margin: 5px;
}
</style>
