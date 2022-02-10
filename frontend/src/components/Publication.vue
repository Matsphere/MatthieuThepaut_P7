<template>
  <div class="publication">
    <div class="menu">
      <router-link
        class="author"
        :to="{ name: 'Profil', params: { id_user: publication.author_id } }"
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
      <p>{{ this.date }}</p>
      <div>
        <a
          class="blue"
          @click.prevent="toggleEditPublication"
          href="#"
          v-if="myPublication && isActive"
          aria-label="éditer"
          ><i class="fas fa-edit" aria-hidden="true"></i
        ></a>
        <a
          class="red"
          @click.prevent="deletePublication"
          href="#"
          v-if="myPublication || isAdmin"
          aria-label="supprimer"
          ><i class="fas fa-trash-alt red" aria-hidden="true"></i
        ></a>
      </div>
    </div>
    <div class="underline"></div>
    <h2 v-show="!editPublicationMode">{{ this.publication.title }}</h2>
    <p v-show="!editPublicationMode">
      {{ this.publication.text }}
    </p>
    <form
      v-show="editPublicationMode"
      @submit.prevent="editPublication"
      id="article"
    >
      <input type="text" id="title" v-model="title" />
      <textarea name="text" id="text" v-model="text"></textarea>
      <div>
        <button @click="cancelEdit" class="button_red">Annuler</button>
        <button type="submit" class="button_blue">Enregistrer</button>
      </div>
    </form>
    <div class="underline"></div>
    <div class="reaction">
      <div>
        <a
          v-show="!isLiked"
          href="#"
          @click.prevent="sendLike"
          class="blue"
          :class="{ disabled: isDisliked }"
          aria-label="J'aime"
        >
          <i class="far fa-thumbs-up" aria-hidden="true"></i>
        </a>
        <a
          v-show="isLiked"
          href="#"
          @click.prevent="cancelLike"
          class="blue"
          aria-label="Je n'aime plus"
        >
          <i class="fas fa-thumbs-up" aria-hidden="true"></i>
        </a>
        <span>{{ this.likes }}</span>
        <a
          v-show="!isDisliked"
          href="#"
          @click.prevent="sendDislike"
          class="red"
          :class="{ disabled: isLiked }"
          aria-label="Je n'aime pas"
        >
          <i class="far fa-thumbs-down" aria-hidden="true"></i>
        </a>
        <a
          v-show="isDisliked"
          href="#"
          @click.prevent="cancelDislike"
          class="red"
          aria-label="Je ne déteste plus"
        >
          <i class="fas fa-thumbs-down" aria-hidden="true"></i>
        </a>

        <span>{{ this.dislikes }}</span>
      </div>

      <p>{{ this.publication.comments_number }} commentaires</p>

      <button @click="displayComments" class="button_blue">Commenter</button>
    </div>
    <div class="underline" v-if="commentOn"></div>
    <div v-if="commentOn">
      <form @submit.prevent="createComment" v-if="isActive" id="new_comment">
        <textarea name="comment" id="comment" v-model="comment"></textarea>

        <button type="submit" class="button_blue">
          Publier le commentaire
        </button>
      </form>
      <Comment
        v-for="comment in publication.comments"
        :key="comment.id_comment"
        :comment="comment"
      />
    </div>
  </div>
</template>

<script>
import Comment from "./Comment.vue";
export default {
  name: "Publication",
  components: {
    Comment,
  },
  props: {
    publication: Object,
  },
  data() {
    return {
      editPublicationMode: false,
      commentOn: false,
      title: "",
      text: "",
      comment: "",
    };
  },
  created() {
    this.title = this.publication.title;
    this.text = this.publication.text;
  },

  methods: {
    toggleEditPublication() {
      this.editPublicationMode = true;
    },

    cancelEdit() {
      this.editPublicationMode = false;
      this.title = this.publication.title;
      this.text = this.publication.text;
    },

    async displayComments() {
      try {
        await this.$store.dispatch(
          "getAllComments",
          this.publication.id_publication
        );
        this.commentOn = true;
      } catch (err) {
        console.log(err);
      }
    },

    async createComment() {
      try {
        if (!this.comment) return;
        await this.$store.dispatch("createComment", {
          comment: this.comment,
          author_id: this.$store.state.user.id_user,
          pub_id: this.publication.id_publication,
        });
        this.comment = "";
      } catch (err) {
        console.log(err);
      }
    },

    async editPublication() {
      try {
        if (!this.title || !this.text) {
          return;
        }
        await this.$store.dispatch("editPublication", {
          id_publication: this.publication.id_publication,
          title: this.title,
          text: this.text,
        });
        this.editPublicationMode = false;
      } catch (err) {
        console.log(err);
      }
    },

    async deletePublication() {
      try {
        await this.$store.dispatch(
          "deletePublication",
          this.publication.id_publication
        );
      } catch (err) {
        console.log(err.response);
      }
    },

    async sendLike() {
      try {
        const vote = 1;
        await this.$store.dispatch("feedback", {
          vote: vote,
          id_publication: this.publication.id_publication,
          users_liked: this.publication.users_liked,
          users_disliked: this.publication.users_disliked,
        });
      } catch (err) {
        console.log(err);
      }
    },

    async cancelLike() {
      try {
        const vote = 0;
        await this.$store.dispatch("feedback", {
          vote: vote,
          id_publication: this.publication.id_publication,
          users_liked: this.publication.users_liked,
          users_disliked: this.publication.users_disliked,
        });
      } catch (err) {
        console.log(err.response);
      }
    },

    async sendDislike() {
      try {
        const vote = -1;
        await this.$store.dispatch("feedback", {
          vote: vote,
          id_publication: this.publication.id_publication,
          users_liked: this.publication.users_liked,
          users_disliked: this.publication.users_disliked,
        });
      } catch (err) {
        console.log(err.response);
      }
    },

    async cancelDislike() {
      try {
        const vote = 0;
        await this.$store.dispatch("feedback", {
          vote: vote,
          id_publication: this.publication.id_publication,
          users_liked: this.publication.users_liked,
          users_disliked: this.publication.users_disliked,
        });
      } catch (err) {
        console.log(err.response);
      }
    },
  },
  computed: {
    date() {
      if (this.publication.date_created == this.publication.date_modified) {
        return this.publication.date_created;
      } else return "Modifiée à " + this.publication.date_modified;
    },
    isActive() {
      return this.$store.state.user.is_active;
    },
    isAdmin() {
      return this.$store.state.user.is_admin;
    },
    myPublication() {
      if (this.publication.author_id == this.$store.state.user.id_user) {
        return true;
      } else return false;
    },

    isLiked() {
      if (
        this.publication.users_liked.includes(this.$store.state.user.id_user)
      ) {
        return true;
      } else {
        return false;
      }
    },

    isDisliked() {
      if (
        this.publication.users_disliked.includes(this.$store.state.user.id_user)
      ) {
        return true;
      } else {
        return false;
      }
    },

    likes() {
      return this.publication.users_liked.length;
    },

    dislikes() {
      return this.publication.users_disliked.length;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.publication {
  margin: 30px auto;
  padding: 20px;
  width: 60%;
  border: 1px solid #81a7be;
  border-radius: 20px;
  box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.63);
}

.menu {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.author {
  display: flex;
  align-items: center;
  color: #134b98;
  font-weight: bold;
}

.avatar {
  margin: 10px;
  height: 100px;
  border-radius: 20px;
}
.underline {
  border: 1px solid #fd2d01;
  width: 80%;
  margin: 10px auto;
}
#article {
  display: flex;
  flex-direction: column;
  align-items: center;
}
#text {
  width: 60%;
  height: 300px;
}
.reaction {
  width: 80%;
  margin: 10px auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
#new_comment {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
#comment {
  width: 80%;
  height: 100px;
}
.blue {
  margin: 15px;
  font-size: 20px;
}
.red {
  margin: 15px;
  font-size: 20px;
}

.disabled {
  pointer-events: none;
  color: lightgrey;
}
span {
  margin: 5px;
}
</style>
