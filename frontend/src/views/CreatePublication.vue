<template>
  <div class="publication">
    <h1>Nouvelle publication</h1>
    <form @submit.prevent="submitData">
      <label for="text">Article</label>
      <input type="text" id="text" required />
      <button type="submit">Publier</button>
    </form>
  </div>
</template>
<script>
export default {
  method: {
    async submitData() {
      try {
        const text = document.getElementById("text").value;
        const data = {
          text: text,
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
      return this.$store.user;
    },
  },
};
</script>
