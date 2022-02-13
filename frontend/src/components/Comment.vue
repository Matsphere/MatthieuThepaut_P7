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
        <p class="author_pseudo">{{ this.comment.pseudo }}</p>
      </router-link>
      <p class="date">{{ this.date }}</p>
      <div>
        <a
          @click.prevent="toggleEditComment"
          href="#"
          v-if="myComment"
          class="blue"
          ><i class="fas fa-edit"></i
        ></a>
        <a
          @click.prevent="deleteComment"
          href="#"
          v-if="myComment || isAdmin"
          class="red"
          ><i class="fas fa-trash-alt"></i
        ></a>
      </div>
    </div>
    <p v-show="!editCommentMode">{{ this.comment.comment }}</p>
    <form
      v-show="editCommentMode"
      @submit.prevent="editComment"
      id="form_comment"
    >
      <textarea name="comment" id="text" v-model="text"></textarea>
      <div>
        <button @click="cancelEdit" class="button_red">Annuler</button>
        <button type="submit" class="button_blue">Enregistrer</button>
      </div>
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
        if (!this.text) return;
        await this.$store.dispatch("editComment", {
          comment: this.text,
          id_comment: this.comment.id_comment,
          id_publication: this.comment.pub_id,
        });
        this.editCommentMode = false;
      } catch (err) {
        this.$router.push({ name: "Error", params: { error: err } });
      }
    },

    async deleteComment() {
      try {
        await this.$store.dispatch("deleteComment", {
          id_comment: this.comment.id_comment,
          id_publication: this.comment.pub_id,
        });
      } catch (err) {
        this.$router.push({ name: "Error", params: { error: err } });
      }
    },
  },
  computed: {
    date() {
      if (this.comment.date_created == this.comment.date_modified) {
        return this.comment.date_created;
      } else return "*" + this.comment.date_modified;
    },

    isAdmin() {
      return this.$store.state.user.is_admin;
    },
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
  border: 0.125em solid;
  margin: 0.3125em;
  padding: 0.625em;
  border-radius: 1.25em;
}
.menu {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
}

.author {
  display: flex;
  align-items: center;
  font-size: 1em;
  font-weight: bold;
}
.date {
  font-size: 0.9em;
  margin: auto 1em;
  order: 2;
}
.red {
  font-size: 1rem;
  margin: 0.625em;
}
.blue {
  font-size: 1rem;
  margin: 0.625em;
}
#form_comment {
  display: flex;
  flex-direction: column;
  align-items: center;
}
#text {
  height: 9.375em;
  width: 100%;
}

#avatar {
  height: 3.125em;
  margin: 0.3125em 1.25em 0.3125em 0.3125em;
  border-radius: 1.25em;
}
</style>
