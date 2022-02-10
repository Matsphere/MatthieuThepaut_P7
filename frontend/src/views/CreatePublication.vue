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
      title : ""
    };
  },
  methods: {
    async submitData() {
      try {
        if (!this.title || !this.text) return
        const data = {
          title : this.title,
          text: this.text,
          author_id: this.user.id_user,
        };

        await this.$store.dispatch("createPublication", data);
        this.$router.push({ name: "Acceuil" });
      } catch (err) {
        console.log(err.response);
      }
    },
  },
  created() {
    if (!this.$store.state.isLogged) {
      this.$router.push({ name: "Login" });
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
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
  width: 50%;
}
#text {
  margin: 20px 0;
  width: 100%;
  height: 300px;
}
</style>
