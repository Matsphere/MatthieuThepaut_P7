const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const axiosClient = axios.create({
  baseURL: process.env.URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  login(data) {
    return axiosClient.post(
      "/api/auth/login",
      JSON.stringify({ email: data.email, password: data.password })
    );
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
  getAllPublications() {
    return axiosClient.get("/api/publications/");
  },

  createPublication(data) {
    return axiosClient.post("/api/publications/");
  },

  getAllComments(data) {
    return axiosClient.post(
      "/api/publications/comments",
      JSON.stringify({ pub_id: data })
    );
  },
};