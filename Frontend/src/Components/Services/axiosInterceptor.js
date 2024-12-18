import axios from "axios";

const instance = axios.create({
  baseURL: "http://43.204.234.11:3000/",
  timeout: 15000,
});

export default instance;
