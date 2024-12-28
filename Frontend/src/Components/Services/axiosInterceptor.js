import axios from "axios";

const instance = axios.create({
  baseURL: "http://3.109.208.105:3000/",
  timeout: 15000,
});

export default instance;
