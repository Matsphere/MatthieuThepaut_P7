<template>
  <div class="publication">
    <div>
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
        ,</router-link
      >
      <a @click="toggleEditPublication" v-if="myPublication"
        ><i class="fas fa-edit"></i
      ></a>
      <a @click="deletePublication" v-if="myPublication"
        ><i class="fas fa-trash-alt"></i
      ></a>
    </div>
    <div class="underline"></div>
    <p class="text" v-show="!editPublicationMode">
      {{ this.publication.text }}
    </p>
    <form v-show="editPublicationMode" @submit.prevent="editPublication">
      <textarea
        name="text"
        id="text"
        cols="30"
        rows="10"
        v-model="text"
      ></textarea>
      <button type="submit">Enregistrer</button>
      <button @click="cancelEdit">Annuler</button>
    </form>
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
  data() {
    return {
      editPublicationMode: false,
    };
  },
  methods: {
    toggleEditPublication() {
      this.editPublicationMode = true;
    },

    cancelEdit() {
      this.editPublicationMode = false;
    },

    async displayComments() {
      try {
        const publicationId = this.publication.id_publication;
        await this.$store.dispatch("getAllComments", publicationId);
      } catch (err) {
        console.log(err);
      }
    },

    async editPublication() {
      try {
      await this.$store.dispatch("editPublication", {
        id_publication : this.publication.id_publication,
        text : this.text,
      });
     } catch (err) {
       console.log(err.response);
     }
    },

    async deletePublication() {
      try {
        await this.$store.dispatch("deletePublication", this.publication.id_publication)
      }
    }
  },
  computed : {
    text() {
      return this.publication.text
    }
  }
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
