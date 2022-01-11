<template>
  <div>
    <div>
      <router-link :to="{ name: 'Profil', params: { id: this.comment.author_id } }">
        <figure>
          <img :src="this.comment.avatar" alt="Avatar de l'utilisateur" />
        </figure>
        <p>{{ this.comment.pseudo }}</p>
      </router-link>
    </div>
    <p>{{ this.comment.comment }}</p>
  </div>
</template>

<script>
export default {
  name: "Comment",
  props: {
   comment : Object,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>