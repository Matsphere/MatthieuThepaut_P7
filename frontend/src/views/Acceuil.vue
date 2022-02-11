<template>
  <div class="home">
    <router-link
      v-if="isLogged"
      class="new_article button_blue"
      :to="{ name: 'CreatePublication' }"
      >Nouvel article</router-link
    >

    <div v-if="publications" class="publications">
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
    isLogged() {
      return this.$store.state.isLogged
    }
  },

  created: async function () {
    try {
      if (!this.isLogged) {
        this.$router.push({ name: "Login" });
      } else if (!this.user.is_active) {
        this.$router.push({ name: "Error", params : {error : 'Votre compte a été désactivé veuillez contacter un administrateur!'} });
      }
       else {
      await this.$store.dispatch("getAllPublications");
      }
    } catch (err) {
      if (err.response.status == 401) {
        this.$router.push({ name: "Login" });
      }
    }
  },
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  margin: auto;
}

.publications {
  margin: 30px 0;
  width: 100%;
}
</style>
