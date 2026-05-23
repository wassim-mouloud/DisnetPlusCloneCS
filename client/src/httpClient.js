// src/httpClient.js
import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5029",
  withCredentials: true,
});
