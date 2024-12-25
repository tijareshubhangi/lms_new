import axios from "axios";

const instance = axios.create({
  baseURL: "http://3.7.70.230:3000/",
  timeout: 15000,
});

export default instance;
