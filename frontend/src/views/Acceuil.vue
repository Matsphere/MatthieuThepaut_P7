<template>
  <div class="home">
    <router-link class="new_article" :to="{ name: 'CreatePublication' }"
      >Nouvel article</router-link
    >

    <div v-if="publications" class="publication">
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
import Publication from "../components/Publication.vue";

export default {
  name: "Home",
  components: {
    Publication,
  },
  computed: {
    publications() {
      return this.$store.state.publications;
    },
    user() {
      return this.$store.state.user;
    },
  },
  created: async function () {
    try {
      if (!this.$store.state.user) {
        this.$router.push({ name: "Login" });
      }
      await this.$store.dispatch("getAllPublications");
    } catch (err) {
      console.log(err);
      if (err.response.status == 401) {
        this.$router.push({ name: "Login" });
      }
    }
  },
};
</script>

<style scoped>
.new_article {
  background-color: blue;
  padding: 20px;
  border-radius: 10%;
  color: white;
}

.publication {
  margin-top: 40px;
}
</style>
