<template>
  <div class="profile">
    <div>
      <figure v-show="!editAvatar">
        <img :src="user.avatar" alt="Photo de profil" class="avatar" />
      </figure>
      <button v-show="avatarEditMode" @click="toggleEditAvatar">
        Changer d'avatar
      </button>
      <form v-show="editAvatar" @submit.prevent="submitAvatar" id="avatar">
        <input id="avatarUrl" type="file" />
      </form>
      <button v-show="editAvatar" type="submit" form="avatar">
        Enregistrer
      </button>
      <button @click="cancelEdit" v-show="editAvatar">Annuler</button>
    </div>
    <div>
      <h2>Pseudo :</h2>
      <p v-show="!editInfo">
        {{ this.user.pseudo }}
      </p>
      <h2>Bio :</h2>
      <p v-show="!editInfo">
        {{ this.user.bio }}
      </p>
      <button v-show="infoEditMode" @click="toggleEditInfo">
        Modifier mon profil
      </button>
      <form v-show="editInfo" @submit.prevent="submitInfo" id="info">
        <label for="pseudo">Pseudo :</label>
        <input id="pseudo" type="text" v-model="pseudo" />
        <label for="bio">Bio :</label>
        <textarea id="bio" name="text" v-model="bio"></textarea>
      </form>
      <button v-show="editInfo" type="submit" form="info">Enregistrer</button>
      <button @click="cancelEdit" v-show="editInfo">Annuler</button>
    </div>
  </div>
</template>
<script>
import apiHandler from "../apiHandlers/apiHandler";

export default {
  props: {
    id_user: String,
  },
  data() {
    return {
      user: {},
      myProfile: false,
      editAvatar: false,
      editInfo: false,
      pseudo: "",
      bio: "",
    };
  },
  methods: {
    toggleEditAvatar() {
      this.editAvatar = true;
    },

    toggleEditInfo() {
      this.editInfo = true;
    },

    cancelEdit() {
      this.editAvatar = false;
      this.editInfo = false;
      this.pseudo = this.user.pseudo;
      this.bio = this.user.bio;
    },

    async submitInfo() {
      try {
        const data = {
          pseudo: this.pseudo,
          bio: this.bio,
        };
        await this.$store.dispatch("editInfo", {
          data: data,
          id: this.id_user,
        });
        this.editInfo = false;
      } catch (err) {
        console.log(err.response);
      }
    },

    async submitAvatar() {
      try {
        const url = document.getElementById("avatarUrl").value;
        const data = {
          avatar: url,
          oldAvatar: this.user.avatar,
          avatar_edited: this.user.avatar_edited,
        };
        console.log(data);
        await this.$store.dispatch("editAvatar", {
          data: data,
          id: this.id_user,
        });
        this.editAvatar = false;
      } catch (err) {
        console.log(err.response);
      }
    },
  },
  created: async function () {
    try {
      if (!this.$store.state.isLogged) {
        this.$router.push({ name: "Login" });
      }

      if (this.id_user == this.$store.state.user.id_user) {
        this.user = this.currentUser;
      } else {
        console.log(this.id_user);
        const response = await apiHandler.getUser(this.id_user);
        if (response.statusText != "OK") {
          throw response;
        }
        this.user = response.data;
      }
      this.pseudo = this.user.pseudo;
      this.bio = this.user.bio;
    } catch (err) {
      console.log(err.response);
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.user;
    },

    avatarEditMode() {
      if (this.id_user == this.$store.state.user.id_user && !this.editAvatar) {
        return true;
      } else {
        return false;
      }
    },

    infoEditMode() {
      if (this.id_user == this.$store.state.user.id_user && !this.editinfo) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style scoped></style>
