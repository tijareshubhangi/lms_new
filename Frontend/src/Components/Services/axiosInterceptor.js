import axios from "axios";

const instance = axios.create({
  baseURL: "http://13.232.88.198:3000/",
  timeout: 15000,
});

export default instance;
