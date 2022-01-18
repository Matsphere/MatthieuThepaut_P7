<template>
  <div class="login">
    <figure class="logo">
      <img
        src="../assets/images/icon-above-font.svg"
        alt="Logo de Groupomania"
      />
    </figure>
    <form @submit.prevent="submitData" class="form">
      <label for="pseudo">Nom d'utilisateur</label>
      <input type="text" id="pseudo" required />
      <label for="email">E-mail</label>
      <input type="text" id="email" required />
      <label for="password">Mot de passe</label>
      <input type="password" id="password" required minlength="8" />
      <button type="submit" class="button">Créer un compte</button>
    </form>
  </div>
</template>
<script>
export default {
  methods: {
    submitData: async function () {
      try {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const pseudo = document.getElementById("pseudo").value;
        const data = {
          email: email,
          password: password,
          pseudo: pseudo,
        };
        console.log(data);
        await this.$store.dispatch("signup", data);
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
  margin: 10px 0px;
}
.button {
  margin: 20px 0px;
}
</style>
