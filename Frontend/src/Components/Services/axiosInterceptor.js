import axios from "axios";

const instance = axios.create({
  baseURL: "http://13.232.95.214:9000/",
  timeout: 15000,
});

export default instance;
