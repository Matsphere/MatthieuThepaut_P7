import { createStore } from "vuex";
import { state } from "../../../Backend/db";
import apiHandler from "../apiHandlers/apiHandler";

export default createStore({
  state: {
    publications: [],
    user: null,
  },
  mutations: {
    setUser(state, data) {
      state.user = data;
    },
    clearUser(state) {
      state.user = {};
    },
    setPublications(state, data) {
      state.publications = data;
    },
    setComments(state, data) {
      state.publications[data.index].comments = data.comments;
    },
    addComment(state, data) {
      state.publications[data.index].splice(0, 0, data.comment);
    },
    addPublication(state, data) {
      state.publications.splice(0, 0, data);
    },
  },
  actions: {
    async login({ commit }, userInfo) {
      const response = await apiHandler.login(userInfo);
      if (response.statusText != "OK") {
        throw response;
      }
      commit("setUser", response.data);
      console.log(this.state.user);
    },

    async logout({ commit }) {
      const response = await apiHandler.logout();
      if (response.statusText != "OK") {
        throw response;
      }
      commit("clearUser");
      console.log(this.state.user);
    },

    async signup({ commit }, userInfo) {
      const response = await apiHandler.signup(userInfo);
      if (response.statusText != "OK") {
        throw response;
      }
      const data = response.json();
      commit("setUser", data);
    },
    async getAllPublications({ commit }) {
      const response = await apiHandler.getAllPublications();
      if (response.statusText != "OK") {
        throw response;
      }
      const data = response.json();
      commit("setPublications", data);
    },
    async createPublication({ commit }, publication) {
      const response = await apiHandler.createPublication(publication);
      if (response.statusText != "OK") {
        throw response;
      }
      const data = response.json();
      commit("addPublication", data);
      this.$router.push({ name: "Acceuil" });
    },

    async getAllComments({ commit }, publicationId) {
      const response = await apiHandler.getAllComments(publicationId);
      if (response.statusText != "OK") {
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
