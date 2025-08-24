import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000", // ⚡ Deploy hone ke baad Render backend ka URL daalna
});

export default API;
