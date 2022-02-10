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
      <p>{{ this.date }}</p>
      <div>
        <a
          @click.prevent="toggleEditComment"
          href="#"
          v-if="myComment && isActive"
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
        if(!this.text) return
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
    date() {
      if (this.comment.date_created == this.comment.date_modified) {
        return this.comment.date_created;
      } else return "Modifié à " + this.comment.date_modified;
    },
    isActive() {
      return this.$store.state.user.is_active;
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
  border: 2px solid;
  margin: 5px;
  padding: 10px;
  border-radius: 20px;
}
.menu {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.author {
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
}
.red {
  font-size: 25px;
  margin: 10px;
}
.blue {
  font-size: 25px;
  margin: 10px;
}
#form_comment {
  display: flex;
  flex-direction: column;
  align-items: center;
}
#text {
  height: 150px;
  width: 100%;
}

#avatar {
  height: 50px;
  margin: 5px 20px 5px 5px;
  border-radius: 20px;
}
</style>
