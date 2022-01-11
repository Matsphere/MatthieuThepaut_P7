<template>
  <div>
    <figure>
      <router-link to="/">
        <img src="@/assets/images/icon-left-font.svg" alt="Logo Groupomania" />
      </router-link>
    </figure>
    <router-link :to="{ name: 'Acceuil' }">Acceuil</router-link>
    <router-link :to="{ name: 'Profil', params: { id: userId } }"
      >Profil</router-link
    >
    <p>Déconnexion</p>
    <div>
      <router-link :to="{ name: 'Profil', params: { id: userId } }">
        <figure>
          <img :src="avatar" alt="Avatar de l'utilisateur" />
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
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
