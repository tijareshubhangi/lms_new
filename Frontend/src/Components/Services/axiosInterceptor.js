import axios from "axios";

const instance = axios.create({
  baseURL: "http://13.235.87.214:3000/",
  timeout: 15000,
});

export default instance;
