import { createStore } from "vuex";
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
      state.user.avatar = data.avatar;
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
    setFeedback(state, data) {
      const index = state.publications.findIndex(
        (pub) => pub.id_publication == data.id_publication
      );
      state.publications[index].users_liked = data.users_liked;
      state.publications[index].users_disliked = data.users_disliked;
    },
    setComments(state, data) {
      const index = state.publications.findIndex(
        (pub) => pub.id_publication == data.id_publication
      );
      state.publications[index].comments = data.comments;
    },
    addComment(state, data) {
      const index = state.publications.findIndex(
        (pub) => pub.id_publication == data.pub_id
      );
      data.avatar = state.user.avatar;
      state.publications[index].comments.push(data);
    },
    editComment(state, data) {
      const indexPublication = state.publications.findIndex(
        (pub) => pub.id_publication == data.id_publication
      );
      const indexComment = state.publications[
        indexPublication
      ].comments.findIndex((com) => com.id_comment == data.id_comment);

      state.publications[indexPublication].comments[indexComment].comment =
        data.comment;
    },
    deleteComment(state, data) {
      const indexPublication = state.publications.findIndex(
        (pub) => pub.id_publication == data.id_publication
      );

      const indexComment = state.publications[
        indexPublication
      ].comments.findIndex((com) => com.id_comment == data.id_comment);

      state.publications[indexPublication].comments.splice(indexComment, 1);
    },
    addPublication(state, data) {
      state.publications.splice(0, 0, data);
    },
    editPublication(state, data) {
      const index = state.publications.findIndex(
        (pub) => pub.id_publication == data.id_publication
      );
      state.publications[index].text = data.text;
    },
    deletePublication(state, id_publication) {
      const index = state.publications.findIndex(
        (pub) => pub.id_publication == id_publication
      );
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
      console.log(id);
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
      console.log(response);
      const data = response.data;
      commit("addPublication", data);
    },

    async editPublication({ commit }, { id_publication, text }) {
      const response = await apiHandler.editPublication(id_publication, text);
      if (response.statusText != "OK") {
        throw response;
      }

      commit("editPublication", { id_publication: id_publication, text: text });
    },

    async deletePublication({ commit }, id_publication) {
      const response = await apiHandler.deletePublication(id_publication);
      if (response.statusText != "OK") {
        throw response;
      }

      commit("deletePublication", id_publication);
    },

    async feedback(
      { commit, state },
      { vote, id_publication, users_liked, users_disliked }
    ) {
      const response = await apiHandler.feedback({
        vote: vote,
        id_publication: id_publication,
        id_user: state.user.id_user,
        users_liked: users_liked,
        users_disliked: users_disliked,
      });
      if (response.statusText != "OK") {
        throw response;
      }

      commit("setFeedback", { ...response.data });
    },

    async getAllComments({ commit }, id_publication) {
      const response = await apiHandler.getAllComments(id_publication);
      if (response.statusText != "OK") {
        throw response;
      }
      const data = response.data;

      commit("setComments", { comments: data, id_publication: id_publication });
    },

    async createComment({ commit }, data) {
      console.log(data);
      const response = await apiHandler.createComment(data);
      if (response.statusText != "Created") {
        throw response;
      }

      commit("addComment", data);
    },

    async editComment({ commit }, { comment, id_comment, id_publication }) {
      const response = await apiHandler.editComment({
        comment: comment,
        id: id_comment,
      });
      if (response.statusText != "OK") {
        throw response;
      }

      console.log(response);

      commit("editComment", {
        comment: comment,
        id_comment: id_comment,
        id_publication: id_publication,
      });
    },

    async deleteComment({ commit }, { id_comment, id_publication }) {
      const response = await apiHandler.deleteComment(id_comment);
      if (response.statusText != "OK") {
        throw response;
      }

      commit("deleteComment", {
        id_comment: id_comment,
        id_publication: id_publication,
      });
    },
  },
  modules: {},
});
