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
      data.pseudo = state.user.pseudo;
      state.publications[index].comments.splice(0, 0, data);
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
      state.publications[indexPublication].comments[
        indexComment
      ].date_modified = data.date_modified;
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
      state.publications[index].title = data.title;
      state.publications[index].text = data.text;
      state.publications[index].date_modified = data.date_modified;
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
      commit("setAvatar", {
        avatar: response.data,
        avatar_edited: data.avatar_edited,
      });
    },

    async editInfo({ commit }, { data, id }) {
      const response = await apiHandler.editInfo(data, id);
      if (response.statusText != "OK") {
        throw response;
      }
      commit("setInfo", data);
    },

    async toggleActivateUser({ commit }, { status, id }) {
      try {
        const response = await apiHandler.toggleActivateUser(status, id);
        if (response.statusText != "OK") {
          throw response;
        }
        commit();
      } catch (err) {
        console.log(err.response);
      }
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
      commit("addPublication", response.data);

      if (response.statusText != "OK") {
        throw response;
      }
    },

    async editPublication({ commit }, { id_publication, title, text }) {
      const response = await apiHandler.editPublication(
        id_publication,
        title,
        text
      );
      if (response.statusText != "OK") {
        throw response;
      }
      const date = new Date();
      const date_modified =
        date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) +
        " - " +
        date.toLocaleDateString();
      commit("editPublication", {
        id_publication: id_publication,
        title: title,
        text: text,
        date_modified: date_modified,
      });
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

    async createComment({ commit }, comment) {
      const response = await apiHandler.createComment(comment);
      if (response.statusText != "Created") {
        throw response;
      }
      const date = new Date();
      const date_created =
        date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) +
        " - " +
        date.toLocaleDateString();

      const data = response.data;
      data.date_created = date_created;
      data.date_modified = date_created;
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

      const date = new Date();
      const date_modified =
        date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) +
        " - " +
        date.toLocaleDateString();

      commit("editComment", {
        date_modified: date_modified,
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
