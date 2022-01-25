<template>
  <div class="publication">
    <h1>Nouvelle publication</h1>
    <form @submit.prevent="submitData">
      <label for="text">Article :</label>
      <textarea
        id="text"
        name="text"
        rows="20"
        cols="70"
        v-model="text"
      ></textarea>
      <button type="submit">Publier</button>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      text: "",
    };
  },
  method: {
    async submitData() {
      try {
        const data = {
          text: this.text,
          author_id: this.user.id_user,
        };
        await this.$store.dispatch("createPublication", data);
      } catch (err) {
        console.log(err);
      }
    },
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
#text {
  margin: 20px 0;
}
</style>
