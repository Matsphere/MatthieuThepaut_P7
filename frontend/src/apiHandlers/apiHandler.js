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

  getAllPublications() {
    return axiosClient.get("/api/publications/");
  },
};
