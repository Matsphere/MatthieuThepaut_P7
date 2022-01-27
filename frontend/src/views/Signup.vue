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
      <input type="text" id="pseudo" required v-model="userInfo.pseudo" />
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
      <button type="submit" class="button">Créer un compte</button>
    </form>
    <p>Déjà inscrit ?</p>
    <router-link :to="{ name: 'Login' }">Se connecter</router-link>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userInfo: {
        pseudo: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    submitData: async function () {
      try {
        const data = {
          email: this.userInfo.email,
          password: this.userInfo.password,
          pseudo: this.userInfo.pseudo,
        };
        console.log(data);
        await this.$store.dispatch("signup", data);
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
  margin: 10px 0px;
}
.button {
  margin: 20px 0px;
}
</style>
