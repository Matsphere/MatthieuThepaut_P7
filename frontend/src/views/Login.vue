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
      <input type="text" id="email" required v-model="userInfo.email" />
      <label for="password">Mot de passe :</label>
      <input
        type="password"
        id="password"
        required
        minlength="8"
        v-model="userInfo.password"
      />
      <button type="submit" class="button">Connexion</button>
    </form>
    <p>Pas encore membre ?</p>
    <router-link :to="{ name: 'Signup' }">Créer un compte!</router-link>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userInfo: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async submitData() {
      try {
        const data = {
          email: this.userInfo.email,
          password: this.userInfo.password,
        };
        await this.$store.dispatch("login", data);
        this.$router.push({ name: "Acceuil" });
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
