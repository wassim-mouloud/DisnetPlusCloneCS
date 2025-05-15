// src/httpClient.js
import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5029", // Change if your ASP.NET backend runs on a different port
  withCredentials: true,
});
