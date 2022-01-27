import { createStore } from "vuex";
import { state } from "../../../Backend/db";
import { editAvatar } from "../../../Backend/models/user";
import apiHandler from "../apiHandlers/apiHandler";

export default createStore({
  state: {
    publications: [],
    user: null,
    isLogged: false,
  },
  mutations: {
    setUser(state, data) {
      state.user = data;
      state.isLogged = true;
    },
    setAvatar(state, data) {
      state.user.avatar = daya.avatar;
      if (data.avatar_edited == 0) {
        state.user.avatar_edited = 1;
      }
    },
    setInfo(state, data) {
      state.user.pseudo = data.pseudo;
      state.user.bio = data.bio;
    },
    logout(state) {
      state.user = null;
      state.isLogged = false;
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
    editComment(state, data) {
      state.publications[data.publicationIndex].comments[
        data.commentIndex
      ].comment = data.comment;
    },
    deleteComment(state, data) {
      state.publications[data.publicationIndex].comments.splice(
        data.commentIndex,
        1
      );
    },
    addPublication(state, data) {
      state.publications.splice(0, 0, data);
    },
    editPublication(state, data) {
      state.publications[data.index].text = data.text;
    },
    deletePublication(state, index) {
      state.publications.splice(index, 1);
    },
  },
  actions: {
    async login({ commit }, userInfo) {
      const response = await apiHandler.login(userInfo);
      if (response.statusText != "OK") {
        throw response;
      }
      commit("setUser", response.data);
    },

    async signup({ commit }, userInfo) {
      const response = await apiHandler.signup(userInfo);
      if (response.statusText != "OK") {
        throw response;
      }
      const data = response.data;
      commit("setUser", data);
    },

    async getUser(id) {
      const response = await apiHandler.getUser(id);
      if (response.statusText != "OK") {
        throw response;
      }
      const data = response.data;
      return data;
    },

    async editAvatar({ commit }, { data, id }) {
      const response = await apiHandler.editAvatar(data, id);
      if (response.statusText != "OK") {
        throw response;
      }
      commit("setAvatar", data);
    },

    async editInfo({ commit }, { data, id }) {
      const response = await apiHandler.editInfo(data, id);
      if (response.statusText != "OK") {
        throw response;
      }
      commit("setInfo", data);
    },

    async getAllPublications({ commit }) {
      const response = await apiHandler.getAllPublications();
      if (response.statusText != "OK") {
        throw response;
      }
      const data = response.data;
      commit("setPublications", data);
    },
    async createPublication({ commit }, publication) {
      const response = await apiHandler.createPublication(publication);
      if (response.statusText != "OK") {
        throw response;
      }
      const data = response.data;
      commit("addPublication", data);
    },

    async editPublication({ commit }, { id_publication, text }) {
      const response = await apiHandler.editPublication(id_publication, text);
      if (response.statusText != "OK") {
        throw response;
      }
      const index = state.publications.findIndex(
        (pub) => pub.id_publication == id_publication
      );

      commit("editPublication", { index: index, text: text });
    },

    async deletePublication({ commit }, id_publication) {
      const response = await apiHandler.deletePublication(id_publication);
      if (response.statusText != "OK") {
        throw response;
      }

      const index = state.publications.findIndex(
        (pub) => pub.id_publication == id_publication
      );

     

      commit("deletePublication", index);
    },

    async getAllComments({ commit }, publicationId) {
      const response = await apiHandler.getAllComments(publicationId);
      if (response.statusText != "OK") {
        throw response;
      }
      const data = response.data;
      const index = state.publications.findIndex(
        (pub) => pub.id_publication == publicationId
      );
      commit("setComments", { comments: data, index: index });
    },

    async editComment({ commit }, { comment, id_comment, publicationId }) {
      const response = await apiHandler.editComment(comment, id_comment);
      if (response.statusText != "OK") {
        throw response;
      }
      const indexPublication = state.publications.findIndex(
        (pub) => pub.id_publication == publicationId
      );

      const indexComment = state.publications[
        indexPublication
      ].comments.findIndex((com) => com.id_comment == id_comment);

      commit("editComment", {
        comment: comment,
        indexComment: indexComment,
        indexPublication: indexPublication,
      });
    },

    async deleteComment({ commit }, { id_comment, pub_id }) {
      const response = await apiHandler.deleteComment(id_comment);
      if (response.statusText != "OK") {
        throw response;
      }

      const indexPublication = state.publications.findIndex(
        (pub) => pub.id_publication == pub_id
      );

      const indexComment = state.publications[
        indexPublication
      ].comments.findIndex((com) => com.id_comment == id_comment);

      commit("deleteComment", {
        indexComment: indexComment,
        indexPublication: indexPublication,
      });
    },
  },
  modules: {},
});
