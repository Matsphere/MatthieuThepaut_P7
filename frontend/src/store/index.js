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
      state.publications = data ;
    },
    setComments(data) {
      const index = state.publications.findIndex(pub => pub.id_publication == data.publicationId);
      state.publications[index].comments = data.comments;
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

    async getAllComments({ commit }, publicationId) {
      try {
        const response = await apiHandler.getAllComments(publicationId);
        if (!response.ok) {
          throw response;
        }
        const data = response.json();
        commit("setComments", {comments: data, publicationId: publicationId });
      } catch (err) {
        throw err;
      }
    },
  },
  modules: {},
});
