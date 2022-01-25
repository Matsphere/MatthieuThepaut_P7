<template>
  <div class="publication">
    <div>
      <figure>
        <img :src="publication.avatar" alt="Avatar de l'auteur" />
      </figure>
      <p>{{ this.publication.pseudo }}</p>
    </div>
    <p>{{ this.publication.text }}</p>
    <div>
      <i class="far fa-thumbs-up"></i>
      <span>N°</span>
      <i class="far fa-thumbs-down"></i>
      <span>N°</span>
    </div>
    <p @click="displayComments" v-if="!publication.comments">
      Afficher les commentaires
    </p>

    <div v-else>
      <Comment
        v-for="comment in publication.comments"
        :key="comment.id_comment"
        :comment="comment"
      />
    </div>
  </div>
</template>

<script>
const Comment = require("./Comment.vue");
export default {
  name: "Publication",
  components: {
    Comment,
  },
  props: {
    Publication: Object,
    User: Object,
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
<style scoped></style>
