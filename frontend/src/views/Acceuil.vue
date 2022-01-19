<template>
  <div class="home">
    <router-link :to="{ name: 'CreatePublication' }"
      >Nouvel article</router-link
    >

    <div v-if="publications">
      <Publication
        v-for="publication in publications"
        :key="publication.id_publication"
        :publication="publication"
      />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
const Publication = require("../components/Publication.vue");

export default {
  name: "Home",
  components: {
    Publication,
  },
  computed: {
    publications() {
      return this.$store.publications;
    },
    user() {
      return this.$store.user;
    },
  },
  created: async function () {
    try {
      if (!this.$store.user) {
        this.$router.push({ name: "Login" });
      }
      await this.$store.dispatch("getAllPublications");
    } catch (err) {
      if (err.status == 401) {
        this.$router.push({ name: "Login" });
      }
    }
  },
};
</script>
