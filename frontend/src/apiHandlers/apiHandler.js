import { deleteComment } from "../../../Backend/models/comment";

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
    return axiosClient.post(
      "/api/auth/login",
      JSON.stringify({ email: data.email, password: data.password })
    );
  },

  logout() {
    return axiosClient.get("/api/auth/logout");
  },

  signup(data) {
    return axiosClient.post(
      "/api/auth/signup",
      JSON.stringify({
        email: data.email,
        password: data.password,
        pseudo: data.pseudo,
      })
    );
  },

  getUser(id) {
    return axiosClient.get("/api/auth/profile/" + id);
  },

  editAvatar(data, id) {
    return axiosClient.post(
      "/api/auth/profile/" + id + "/avatar",
      JSON.stringify(data)
    );
  },

  editInfo(data, id) {
    return axiosClient.post(
      "/api/auth/profile/" + id + "/info",
      JSON.stringify(data)
    );
  },

  getAllPublications() {
    return axiosClient.get("/api/publications/");
  },

  createPublication(data) {
    return axiosClient.post("/api/publications/", JSON.stringify(data));
  },

  editPublication(data) {
    return axiosClient.put("/api/publications/" + data.id_publication, JSON.stringify(data.text))
  },

  deletePublication(id) {
    return axiosClient.delete("/api/publications/" + id)
  },

  getAllComments(data) {
    return axiosClient.post(
      "/api/publications/comments",
      JSON.stringify({ pub_id: data })
    );
  },

  editComment(data) {
    return axiosClient.put(
      "/api/comments/" + data.id_comment,
      JSON.stringify(data.comment)
    );
  },

  deleteComment(id) {
    return axiosClient.delete("/api/comments/" + id);
  },
};
