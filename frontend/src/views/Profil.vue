<template>
  <div class="profile">
    <div class="menu">
      <button
        v-show="
          currentUser.is_admin && user.is_active && !editInfo && !editAvatar
        "
        @click="deactivateUser"
        class="button_red"
      >
        Désactiver l'utilisateur
      </button>
      <button
        v-show="
          currentUser.is_admin && !user.is_active && !editInfo && !editAvatar
        "
        @click="activateUser"
        class="button_blue"
      >
        Résactiver l'utilisateur
      </button>
      <button
        v-show="avatarEditMode && user.is_active && !editInfo && !editAvatar"
        @click="toggleEditAvatar"
        class="button_blue"
      >
        Changer d'avatar
      </button>
      <button
        v-show="infoEditMode && user.is_active && !editInfo && !editAvatar"
        @click="toggleEditInfo"
        class="button_blue"
      >
        Modifier mon profil
      </button>
    </div>
    <div id="avatar_picture">
      <h1>Profil de {{ this.user.pseudo }}</h1>
      <figure v-show="!editAvatar">
        <img :src="user.avatar" alt="Photo de profil" class="avatar" />
      </figure>
      <p class="error">{{ this.avatarErrorMsg }}</p>
      <form
        v-show="editAvatar"
        @submit.prevent="submitAvatar"
        id="avatar"
        enctype="multipart/form-data"
      >
        <input
          id="avatarUrl"
          name="image"
          type="file"
          accept=".jpeg, .jpg, .png"
        />
      </form>
      <div>
        <button @click="cancelEdit" v-show="editAvatar" class="button_red">
          Annuler
        </button>
        <button
          v-show="editAvatar"
          type="submit"
          form="avatar"
          class="button_blue"
        >
          Enregistrer
        </button>
      </div>
    </div>
    <div id="user_info">
      <h2 v-show="!editInfo">Bio :</h2>
      <p v-show="!editInfo">
        {{ this.user.bio }}
      </p>
      <p class="error">{{ this.infoErrorMsg }}</p>
      <form v-show="editInfo" @submit.prevent="submitInfo" id="info">
        <label for="pseudo">Pseudo :</label>
        <input id="pseudo" type="text" :value="user.pseudo" />
        <label for="bio">Bio :</label>
        <textarea id="bio" name="text" :value="user.bio"></textarea>
      </form>
      <div>
        <button @click="cancelEdit" v-show="editInfo" class="button_red">
          Annuler
        </button>
        <button v-show="editInfo" type="submit" form="info" class="button_blue">
          Enregistrer
        </button>
      </div>
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
      infoErrorMsg: "",
      avatarErrorMsg: "",
    };
  },
  methods: {
    async activateUser() {
      try {
        if (!this.currentUser.is_admin) {
          return;
        }
        const response = await apiHandler.toggleActivateUser(
          1,
          this.user.id_user
        );
        if (response.statusText != "OK") {
          throw response;
        }
      } catch (err) {
        this.$router.push({ name: "Error", params: { error: err } });
      }
    },
    async deactivateUser() {
      try {
        if (!this.currentUser.is_admin) {
          return;
        }
        const response = await apiHandler.toggleActivateUser(
          0,
          this.user.id_user
        );
        if (response.statusText != "OK") {
          throw response;
        }
      } catch (err) {
        this.$router.push({ name: "Error", params: { error: err } });
      }
    },

    toggleEditAvatar() {
      this.editAvatar = true;
    },

    toggleEditInfo() {
      this.editInfo = true;
    },

    cancelEdit() {
      this.editAvatar = false;
      this.editInfo = false;
      (this.infoErrorMsg = ""), (this.avatarErrorMsg = "");
    },

    async submitInfo() {
      try {
        const pseudo = document.getElementById("pseudo").value;
        const bio = document.getElementById("bio").value;

        const data = {
          pseudo: pseudo,
          bio: bio,
        };

        if (!pseudo) return;
        await this.$store.dispatch("editInfo", {
          data: data,
          id: this.id_user,
        });
        this.editInfo = false;
      } catch (err) {
        if (err.response.status == 500 && err.response.data.errno == 1062) {
          const field = err.response.data.sqlMessage.split("'")[3];
          this.infoErrorMsg = field + " déjà utilisé";
        } else {
          this.$router.push({ name: "Error", params: { error: err } });
        }
      }
    },

    async submitAvatar() {
      try {
        const file = document.getElementById("avatarUrl").files[0];
        const data = {
          file: file,
          oldAvatar: this.user.avatar,
          avatar_edited: this.user.avatar_edited,
        };
        if (!file) return;
        await this.$store.dispatch("editAvatar", {
          data: data,
          id: this.id_user,
        });
        this.editAvatar = false;
      } catch (err) {
        if (err.response.status == 500 && err.response.data.startsWith("<")) {
          this.avatarErrorMsg = "Fichiers image jpg, jpeg, png seulement";
        } else {
          this.$router.push({ name: "Error", params: { error: err } });
        }
      }
    },
  },
  created: async function () {
    try {
      if (!this.isLogged) {
        this.$router.push({ name: "Login" });
        return;
      }

      if (!this.currentUser.is_active) {
        this.$router.push({
          name: "Error",
          params: {
            error:
              "Votre compte a été désactivé veuillez contacter un administrateur!",
          },
        });
        return;
      }

      if (this.id_user == this.$store.state.user.id_user) {
        this.user = this.currentUser;
      } else {
        const response = await apiHandler.getUser(this.id_user);
        if (response.statusText != "OK") {
          throw response;
        }
        this.user = response.data;
      }
    } catch (err) {
      this.$router.push({ name: "Error", params: { error: err } });
    }
  },
  async updated() {
    try {
      if (!this.isLogged) {
        this.$router.push({ name: "Login" });
        return;
      }

      if (!this.currentUser.is_active) {
        this.$router.push({
          name: "Error",
          params: {
            error:
              "Votre compte a été désactivé veuillez contacter un administrateur!",
          },
        });
        return;
      }

      if (this.id_user == this.currentUser.id_user) {
        this.user = this.currentUser;
      } else {
        const response = await apiHandler.getUser(this.id_user);
        if (response.statusText != "OK") {
          throw response;
        }
        this.user = response.data;
      }
    } catch (err) {
      this.$router.push({ name: "Error", params: { error: err } });
    }
  },

  computed: {
    currentUser() {
      return this.$store.state.user;
    },

    isLogged() {
      return this.$store.state.isLogged;
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

<style scoped>
.profile {
  width: 80%;
  margin: auto;
}

.menu {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
#avatar_picture {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.avatar {
  height: 300px;
  border-radius: 40px;
}

#user_info {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

#info {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

#bio {
  width: 50%;
  height: 300px;
}
</style>
