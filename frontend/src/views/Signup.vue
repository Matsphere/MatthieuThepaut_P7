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
      <label for="pseudo">Nom d'utilisateur</label>
      <input type="text" id="pseudo" required />
      <label for="password">Mot de passe</label>
      <input type="password" id="password" required minlength="8" />
      <button type="submit">Créer un compte</button>
    </form>
  </div>
</template>
<script>
export default {
  method: {
    async submitData() {
     try {
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const pseudo = document.getElementById("pseudo").value
      const data = {
        email: email,
        password: password,
        pseudo : pseudo
      };
     await this.$store.dispatch('signup', data);
     } catch(err) {
       console.log(err);

     }
    },
  },
};
</script>
