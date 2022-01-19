<template>
  <div class="login">
    <figure class="logo">
      <img
        src="../assets/images/icon-above-font.svg"
        alt="Logo de Groupomania"
      />
    </figure>
    <form @submit.prevent="submitData" class="form">
      <label for="email">E-mail :</label>
      <input type="text" id="email" required />
      <label for="password">Mot de passe :</label>
      <input type="password" id="password" required minlength="8" />
      <button type="submit" class="button">Connexion</button>
    </form>
    <p>Pas encore membre ?</p>
    <router-link :to="{ name: 'Signup' }">Créer un compte!</router-link>
  </div>
</template>
<script>
export default {
  methods: {
    async submitData() {
      try {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const data = {
          email: email,
          password: password,
        };
        await this.$store.dispatch("login", data);
        console.log(this.$store.user);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
<style scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.logo {
  width: 300px;
}

.form {
  display: flex;
  flex-direction: column;
}

.form input {
  margin: 5px;
}
.button {
  margin: 20px 0px;
}
</style>
