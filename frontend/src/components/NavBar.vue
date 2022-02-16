<template>
  <div class="nav">
    <router-link :to="{ name: 'Acceuil' }" class="logo_cont">
      <figure>
        <img
          src="assets/icon-left-font-monochrome-white.png"
          alt="Logo Groupomania"
          class="logo"
        />
      </figure>
    </router-link>
    <router-link :to="{ name: 'Acceuil' }" class="home_text"
      >Acceuil</router-link
    >
    <router-link
      :to="{ name: 'Acceuil' }"
      class="home_icon"
      aria-label="Acceuil"
      ><i class="fas fa-home" aria-hidden="true"></i
    ></router-link>

    <router-link
      :to="{ name: 'Profil', params: { id_user: userId } }"
      class="profile"
      >Profil</router-link
    >
    <router-link @click="logout" :to="{ name: 'Login' }" class="logout_text"
      >Déconnexion</router-link
    >
    <router-link
      @click="logout"
      :to="{ name: 'Login' }"
      aria-label="Déconnexion"
      class="logout_icon"
      ><i class="fas fa-sign-out-alt" aria-hidden="true"></i
    ></router-link>

    <router-link
      :to="{ name: 'Profil', params: { id_user: userId } }"
      class="nav_user"
    >
      <figure>
        <img :src="avatar" alt="Avatar de l'utilisateur" class="avatar" />
      </figure>
      <p>{{ this.pseudo }}</p>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "NavBar",

  props: {
    userId: Number,
    pseudo: String,
    avatar: String,
  },
  methods: {
    logout() {
      this.$store.commit("logout");
      this.$router.push({ name: "Login" });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #134b98;
  width: 100%;
}

.nav_user {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 0.8em;
  font-size: 1em;
}
a {
  color: white;
  font-weight: bold;
  font-size: 1.5em;
}
p {
  margin: 0;
}
.logo {
  height: 6.5em;
  margin: 0.6em;
}
.logo_cont {
  font-size: 1em;
}

.avatar {
  height: 5em;

  border-radius: 1.5em;
}

.logout_icon {
  display: none;
}

.home_icon {
  display: none;
}

@media only screen and (max-width: 700px) {
  .logout_icon {
    display: block;
    font-size: 2em;
  }
  .logout_text {
    display: none;
  }
  .home_icon {
    display: block;
    font-size: 2em;
  }
  .home_text {
    display: none;
  }
  .profile {
    display: none;
  }
}

@media only screen and (max-width: 450px) {
  .logo {
    height: 100px;
  }

  .avatar {
    height: 60px;

    border-radius: 1.5em;
  }
}
</style>
