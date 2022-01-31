<template>
  <div class="comment">
    <div class="menu">
      <router-link
        :to="{ name: 'Profil', params: { id_user: this.comment.author_id } }"
        class="author"
      >
        <figure>
          <img
            :src="comment.avatar"
            alt="Avatar de l'utilisateur"
            id="avatar"
          />
        </figure>
        <p>{{ this.comment.pseudo }}</p>
      </router-link>
      <div>
        <a @click.prevent="toggleEditComment" href="#" v-if="myComment"
          ><i class="fas fa-edit"></i
        ></a>
        <a @click.prevent="deleteComment" href="#" v-if="myComment"
          ><i class="fas fa-trash-alt"></i
        ></a>
      </div>
    </div>
    <p v-show="!editCommentMode">{{ this.comment.comment }}</p>
    <form v-show="editCommentMode" @submit.prevent="editComment">
      <textarea name="comment" id="text" v-model="text"></textarea>
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
      text: this.comment.comment,
      editCommentMode: false,
    };
  },
  methods: {
    toggleEditComment() {
      this.editCommentMode = true;
    },

    cancelEdit() {
      this.editCommentMode = false;
      this.text = this.comment.comment;
    },

    async editComment() {
      try {
        await this.$store.dispatch("editComment", {
          comment: this.text,
          id_comment: this.comment.id_comment,
          id_publication: this.comment.pub_id,
        });
        this.editCommentMode = false;
      } catch (err) {
        console.log(err.response);
      }
    },

    async deleteComment() {
      try {
        await this.$store.dispatch("deleteComment", {
          id_comment: this.comment.id_comment,
          id_publication: this.comment.pub_id,
        });
      } catch (err) {
        console.log(err.response);
      }
    },
  },
  computed: {
    myComment() {
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
<style scoped>
.comment {
  border: 5px solid red;
  margin: 5px;
}
.menu {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.author {
  display: flex;
  align-items: center;
  font-size: 20px;
}
.fas {
  font-size: 25px;
  margin: 10px;
}

#text {
  height: 20px;
}

#avatar {
  height: 100px;
  margin: 5px 20px 5px 5px;
}
</style>
