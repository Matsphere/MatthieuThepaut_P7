<template>
  <div class="publication">
    <h1>Nouvelle publication</h1>
    <form @submit.prevent="submitData">
      <label for="title">Titre :</label>
      <input id="title" name="title" v-model="title" required />
      <label for="text">Article :</label>
      <textarea id="text" name="text" v-model="text"></textarea>
      <button type="submit" class="button_blue">Publier</button>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      text: "",
      title: "",
    };
  },
  methods: {
    async submitData() {
      try {
        if (!this.title || !this.text) return;
        const data = {
          title: this.title,
          text: this.text,
          author_id: this.user.id_user,
        };

        await this.$store.dispatch("createPublication", data);
        this.$router.push({ name: "Acceuil" });
      } catch (err) {
        this.$router.push({ name: "Error", params: { error: err } });
      }
    },
  },
  created() {
    if (!this.isLogged) {
      this.$router.push({ name: "Login" });
    } else if (!this.user.is_active) {
      this.$router.push({
        name: "Error",
        params: {
          error:
            "Votre compte a été désactivé veuillez contacter un administrateur!",
        },
      });
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    isLogged() {
      return this.$store.state.isLogged;
    },
  },
};
</script>

<style scoped>
.publication {
  display: flex;
  flex-direction: column;
  align-items: center;
}
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
#text {
  margin: 1.25em 0;
  width: 50%;
  height: 18.75em
}

#title {
  width: 40%;
}

@media only screen and (max-width: 900px) {
  #text {
    width: 65%;
  }

  #title {
    width: 55%;
  }
}

@media only screen and (max-width: 600px) {
  #text {
    width: 80%;
  }

  #title {
    width: 70%;
  }
}
</style>
