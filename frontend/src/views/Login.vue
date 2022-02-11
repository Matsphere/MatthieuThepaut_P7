<template>
  <div class="login">
    <figure>
      <img
        src="assets/icon-above-font.png"
        alt="Logo de Groupomania"
        class="logo"
      />
    </figure>
    <p class="error">{{ this.errorMsg }}</p>
    <form @submit.prevent="submitData" class="form">
      <label for="email">E-mail</label>
      <input type="text" id="email" required v-model="userInfo.email" />
      <label for="password">Mot de passe</label>
      <input
        type="password"
        id="password"
        required
        minlength="8"
        v-model="userInfo.password"
      />
      <button type="submit" class="button_blue">Connexion</button>
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
      errorMsg: "",
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
        if (err.response.status == 404) {
          this.errorMsg = err.response.data.message;

          return;
        } else if (err.response.status == 401) {
          this.errorMsg = "Mot de Passe Incorrect";
          return;
        } else if (err.response.status == 406) {
          this.errorMsg = err.response.data.message;
        } else {
          this.$router.push({ name: "Error", params: { error: err } });
        }
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
a {
  color: #134b98;
  font-weight: bold;
}
</style>
