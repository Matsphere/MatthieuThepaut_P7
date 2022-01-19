import { createStore } from "vuex";
import { state } from "../../../Backend/db";
import apiHandler from "../apiHandlers/apiHandler";

export default createStore({
  state: {
    publications: [],
    user: { merde: "merde" },
  },
  mutations: {
    setUser(data) {
      state.user = data;
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
      const response = await apiHandler.login(userInfo);
      if (response.statusText != "OK") {
        throw response;
      }
      console.log(state);
      commit("setUser", response.data);
      // this.$router.push({ name: "Acceuil" });
    },

    async signup({ commit }, userInfo) {
      const response = await apiHandler.signup(userInfo);
      if (!response.ok) {
        throw response;
      }
      const data = response.json();
      commit("setUser", data);
      this.$router.push({ name: "Acceuil" });
    },
    async getAllPublications({ commit }) {
      const response = await apiHandler.getAllPublications();
      if (!response.ok) {
        throw response;
      }
      const data = response.json();
      commit("setPublications", data);
    },
    async createPublication({ commit }, publication) {
      const response = await apiHandler.createPublication(publication);
      if (!response.ok) {
        throw response;
      }
      const data = response.json();
      commit("addPublication", data);
      this.$router.push({ name: "Acceuil" });
    },

    async getAllComments({ commit }, publicationId) {
      const response = await apiHandler.getAllComments(publicationId);
      if (!response.ok) {
        throw response;
      }
      const data = response.json();
      const index = state.publications.findIndex(
        (pub) => pub.id_publication == publicationId
      );
      commit("setComments", { comments: data, index: index });
    },
  },
  modules: {},
});
