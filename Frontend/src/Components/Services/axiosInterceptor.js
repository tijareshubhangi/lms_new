import axios from "axios";

const instance = axios.create({
  baseURL: "http://65.0.127.154:3000/",
  timeout: 15000,
});

export default instance;
