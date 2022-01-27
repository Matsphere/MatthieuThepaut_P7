<template>
  <div>
    <div>
      <router-link
        :to="{ name: 'Profil', params: { id: this.comment.author_id } }"
      >
        <figure>
          <img :src="this.comment.avatar" alt="Avatar de l'utilisateur" />
        </figure>
        <p>{{ this.comment.pseudo }}</p>
      </router-link>
      <a @click="toggleEditComment" v-if="myComment"
        ><i class="fas fa-edit"></i
      ></a>
      <a @click="deleteComment" v-if="myComment"
        ><i class="fas fa-trash-alt"></i
      ></a>
    </div>
    <p v-show="!editCommentMode">{{ this.comment.comment }}</p>
    <form v-show="editCommentMode" @submit.prevent="editComment">
      <textarea name="comment" id="text" cols="30" rows="10"></textarea>
      <button type="submit">Enregistrer</button>
      <button @click="cancelEdit">Annuler</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Comment",
  props: {
    comment: Object,
  },
  data() {
    return {
      editCommentMode: false,
    };
  },
  methods: {
    toggleEditComment() {
      this.editCommentMode = true;
    },

    cancelEdit() {
      this.editCommentMode = false;
    },

    async editComment() {
     try {
      const text = document.getElementById("text").value;
      await this.$store.dispatch("editComment", {
        comment: text,
        id_comment: this.comment.id_comment,
        publicationId: this.comment.pub_id,
      });
     } catch (err) {
       console.log(err.response);
     }
    },

    async deleteComment() {
     try {
      await this.$store.dispatch("deleteComment", {
        id_comment: this.comment.id_comment,
        pub_id: this.comment.pub_id,
      });
     } catch (err) {
       console.log(err.response);
     }
    },
  },
  computed: {
    myProfile() {
      if (this.comment.author_id == this.$store.state.user.id_user) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
