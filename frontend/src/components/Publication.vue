<template>
  <div class="publication">
    <router-link
      class="author"
      :to="{ name: 'Profil', params: { id: publication.author_id } }"
    >
      <figure>
        <img
          :src="publication.avatar"
          alt="Avatar de l'auteur"
          class="avatar"
        />
      </figure>
      <p>{{ this.publication.pseudo }}</p>
    </router-link>
    <div class="underline"></div>
    <p class="text">{{ this.publication.text }}</p>
    <div class="underline"></div>
    <div class="reaction">
      <i class="far fa-thumbs-up"></i>
      <span>N°</span>
      <i class="far fa-thumbs-down"></i>
      <span>N°</span>
      <p @click="displayComments">Commenter</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Publication",
  components: {},
  props: {
    publication: Object,
  },
  methods: {
    async displayComments() {
      try {
        const publicationId = this.publication.id_publication;
        await this.$store.dispatch("getAllComments", publicationId);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.publication {
  margin: auto;
  width: 60%;
  border: 1px solid;
}
.author {
  display: flex;
  align-items: center;
}
.avatar {
  margin: 10px;
  height: 100px;
}
.underline {
  border: 1px solid;
  width: 80%;
  margin: auto;
}
.reaction {
  width: 50%;
  margin: 10px auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.far {
  margin: 5px;
}
span {
  margin: 5px;
}
</style>
