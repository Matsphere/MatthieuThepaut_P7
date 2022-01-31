const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const axiosClient = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default {
  login(data) {
    return axiosClient.post("/api/auth/login", {
      email: data.email,
      password: data.password,
    });
  },

  logout() {
    return axiosClient.get("/api/auth/logout");
  },

  signup(data) {
    return axiosClient.post("/api/auth/signup", {
      email: data.email,
      password: data.password,
      pseudo: data.pseudo,
    });
  },

  getUser(id) {
    const url = "/api/auth/profile/" + id;
    return axiosClient.get(url);
  },

  editAvatar(data, id) {
    // const form = new FormData();
    // form.append("file", data.avatar);
    return axiosClient.post("/api/auth/profile/" + id + "/avatar", {
      data: {
        oldAvatar: data.oldAvatar,
        avatar_edited: data.avatar_edited,
      },
    });
  },

  editInfo(data, id) {
    return axiosClient.post("/api/auth/profile/" + id + "/info", data);
  },

  getAllPublications() {
    return axiosClient.get("/api/publications/");
  },

  createPublication(data) {
    return axiosClient.post("/api/publications/", data);
  },

  editPublication(data) {
    return axiosClient.put(
      "/api/publications/" + data.id_publication,
      data.text
    );
  },

  deletePublication(id) {
    return axiosClient.delete("/api/publications/" + id);
  },

  feedback(data) {
    return axiosClient.post(
      "/api/publications/" + data.id_publication + "/like",
      data
    );
  },

  getAllComments(data) {
    return axiosClient.post("/api/publications/comments", { pub_id: data });
  },

  editComment(data) {
    return axiosClient.put("/api/comments/" + data.id_comment, data.comment);
  },

  deleteComment(id) {
    return axiosClient.delete("/api/comments/" + id);
  },
};
