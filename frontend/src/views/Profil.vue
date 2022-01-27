<template>
  <div class="profile">
    <div>
      <figure v-show="!editAvatar">
        <img :src="user.avatar" alt="Photo de profil" class="avatar" />
      </figure>
      <button v-show="avatarEditMode" @click="toggleEditAvatar">
        Changer d'avatar
      </button>
      <form v-show="editAvatar" @submit.prevent="submitAvatar">
        <input id="avatarUrl" type="file" />
        <button type="submit">Enregistrer</button>
        <button @click="cancelEdit">Annuler</button>
      </form>
    </div>
    <div>
      <p v-show="!editInfo">
        {{ this.user.pseudo }}
      </p>
      <p v-show="!editInfo">
        {{ this.user.bio }}
      </p>
      <button v-show="infoEditMode" @click="toggleEditInfo">
        Changer d'avatar
      </button>
      <form v-show="editAvatar" @submit.prevent="submitInfo">
        <label for="pseudo">Pseudo :</label>
        <input id="pseudo" type="text" />
        <label for="bio">Bio :</label>
        <textarea id="bio" name="text" rows="20" cols="70"></textarea>
        <button type="submit">Enregistrer</button>
        <button @click="cancelEdit">Annuler</button>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    userId: String,
  },
  data() {
    return {
      user: {},
      myProfile: false,
      editAvatar: false,
      editInfo: false,
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
    },

    async submitInfo() {
      try {
        const pseudo = document.getElementById("pseudo").value;
        const bio = document.getElementById("bio").value;
        const data = {
          pseudo: pseudo,
          bio: bio,
        };
        await this.$store.dispatch("editInfo", { data : data, id : this.userId});
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
          id: this.userId,
        });
        this.editAvatar = false;
      } catch (err) {
        console.log(err.response);
      }
    },
  },
  created: async function () {
    if (!this.$store.state.isLogged) {
      this.$router.push({ name: "Login" });
    }

    if (this.myProfile) {
      this.user = this.currentUser;
    } else {
      this.user = await this.$store.dispatch("getUser", this.userId);
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.user;
    },

    myProfile () {
if (this.userId == this.$store.state.user.id_user) {
  return true
} else {
  return false
}
    },

    avatarEditMode() {
      if (this.myProfile && !this.editAvatar) {
        return true;
      } else {
        return false;
      }
    },

    infoEditMode() {
      if (this.myProfile && !this.editinfo) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style scoped>

</style>
