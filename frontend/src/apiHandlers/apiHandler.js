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
    const form = new FormData();
    form.append("image", data.file, data.file.name);
    form.append("oldAvatar", data.oldAvatar);
    form.append("avatar_edited", data.avatar_edited);
    return axiosClient.post("/api/auth/profile/" + id + "/avatar", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  editInfo(data, id) {
    return axiosClient.post("/api/auth/profile/" + id + "/info", data);
  },

  toggleActivateUser(status, id) {
    return axiosClient.post("/api/auth/profile/" + id + "/active", {
      status: status,
    });
  },

  getAllPublications() {
    return axiosClient.get("/api/publications/");
  },

  createPublication(data) {
    console.log(data);
    return axiosClient.post("/api/publications/", data);
  },

  editPublication(id_publication, text) {
    console.log(typeof text);
    const url = "/api/publications/" + id_publication;
    return axiosClient.put(url, { text: text });
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
    return axiosClient.post("/api/publications/" + data + "/comments", {
      pub_id: data,
    });
  },

  createComment(data) {
    return axiosClient.post(
      "/api/publications/" + data.pub_id + "/comment",
      data
    );
  },

  editComment(data) {
    return axiosClient.put("/api/comments/" + data.id, {
      comment: data.comment,
    });
  },

  deleteComment(id) {
    return axiosClient.delete("/api/comments/" + id);
  },
};
