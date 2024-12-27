import axios from "axios";

const instance = axios.create({
  baseURL: "http://13.126.223.163:9000/",
  timeout: 15000,
});

export default instance;
