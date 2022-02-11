<template>
  <div class="login">
    <figure class="logo">
      <img src="assets/icon-above-font.svg" alt="Logo de Groupomania" />
    </figure>
    <p class="error">{{ this.errorMsg }}</p>
    <form @submit.prevent="submitData" class="form">
      <label for="pseudo">Pseudo</label>
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
      <p class="password_info" :class="{ error: passwordError }">
        Le mot de passe doit contenir au minimum 8 caractères dont une majuscule
        et un chiffre
      </p>

      <button type="submit" class="button_blue">Créer un compte</button>
    </form>
    <p>Déjà inscrit ?</p>
    <router-link :to="{ name: 'Login' }">Se connecter</router-link>
  </div>
</template>
<script>
const validator = require("password-validator");

let schema = new validator();

schema
  .is()
  .min(8)
  .is()
  .max(20)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits()
  .has()
  .not()
  .spaces();
export default {
  data() {
    return {
      userInfo: {
        pseudo: "",
        email: "",
        password: "",
      },
      errorMsg: "",
      passwordError: false,
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
        if (!schema.validate(data.password)) {
          this.passwordError = true;
          return;
        } else {
          this.passwordError = false;
        }
        const emailPattern =
          /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
        if (!emailPattern.test(data.email)) {
          this.errorMsg = "Email Invalide";
          return;
        }

        const usernamePattern = /[A-Za-z0-9]{5,20}$/;
        if (!usernamePattern.test(data.pseudo)) {
          this.errorMsg =
            "Le pseudo doit contenir seulement des lettres ou des chiffres";
          return;
        }
        await this.$store.dispatch("signup", data);
        this.$router.push({ name: "Acceuil" });
      } catch (err) {
        console.log(err.response);

        if (err.response.status == 500 && err.response.data.errno == 1062) {
          const field = err.response.data.sqlMessage.split("'")[3];
          this.errorMsg = field + " déjà utilisé";
        } else if (err.response.status == 406) {
          this.errorMsg = err.response.data.message;
        } else if (err.response.status == 401) {
          this.passwordError = true;
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
  align-items: center;
  width: 40%;
}
input {
  width: 45%;
}

a {
  color: #134b98;
  font-weight: bold;
}
.password_info {
  font-style: italic;
  text-align: center;
}

@media only screen and (max-width: 1200px) {
  .form {
    width: 55%;
  }
}
@media only screen and (max-width: 900px) {
  .form {
    width: 65%;
  }
}

@media only screen and (max-width: 600px) {
  .form {
    width: 100%;
  }
}
</style>
