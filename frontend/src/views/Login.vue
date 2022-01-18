<template>
  <div class="login">
    <figure class="logo">
      <img
        src="../assets/images/icon-above-font.svg"
        alt="Logo de Groupomania"
      />
    </figure>
    <form @submit.prevent="submitData">
      <label for="email">E-mail</label>
      <input type="text" id="email" required />
      <label for="password">Mot de passe</label>
      <input type="password" id="password" required minlength="8" />
      <button type="submit">Connexion</button>
    </form>
    <p>Pas encore membre ?</p>
    <router-link :to="{ name: 'Signup' }">Créer un compte!</router-link>
  </div>
</template>
<script>
export default {
  method: {
    async submitData() {
      try {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const data = {
          email: email,
          password: password,
        };
        await this.$store.dispatch("login", data);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
