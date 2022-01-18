import { createStore } from "vuex";
import { state } from "../../../Backend/db";
const apiHandler = require("../apiHandlers/apiHandler");

export default createStore({
  state: {
    publications: [],
    user: {},
  },
  mutations: {
    setUser(data) {
      state.user = { ...data };
    },
    setPublications(data) {
      state.publications = data;
    },
    setComments(data) {
      state.publications[data.index].comments = data.comments;
    },
    addComment(data) {
      state.publications[data.index].splice(0, 0, data.comment);
    },
    addPublication(data) {
      state.publications.splice(0, 0, data);
    },
  },
  actions: {
    async login({ commit }, userInfo) {
      try {
        const response = await apiHandler.login(userInfo);
        if (!response.ok) {
          throw response;
        }
        const data = response.json();
        commit("setUser", data);
        this.$router.push({ name: "Acceuil" });
      } catch (err) {
        throw err;
      }
    },

    async signup({ commit }, userInfo) {
      try {
        const response = await apiHandler.signup(userInfo);
        if (!response.ok) {
          throw response;
        }
        const data = response.json();
        commit("setUser", data);
        this.$router.push({ name: "Acceuil" });
      } catch (err) {
        throw err;
      }
    },
    async getAllPublications({ commit }) {
      try {
        const response = await apiHandler.getAllPublications();
        if (!response.ok) {
          throw response;
        }
        const data = response.json();
        commit("setPublications", data);
      } catch (err) {
        throw err;
      }
    },
    async createPublication({ commit }, publication) {
      try {
        const response = await apiHandler.createPublication(publication);
        if (!response.ok) {
          throw response;
        }
        const data = response.json();
        commit("addPublication", data);
        this.$router.push({ name: "Acceuil" });
      } catch (err) {
        throw err;
      }
    },

    async getAllComments({ commit }, publicationId) {
      try {
        const response = await apiHandler.getAllComments(publicationId);
        if (!response.ok) {
          throw response;
        }
        const data = response.json();
        const index = state.publications.findIndex(
          (pub) => pub.id_publication == publicationId
        );
        commit("setComments", { comments: data, index: index });
      } catch (err) {
        throw err;
      }
    },
  },
  modules: {},
});
