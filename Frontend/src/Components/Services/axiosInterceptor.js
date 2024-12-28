import axios from "axios";

const instance = axios.create({
  baseURL: "http://3.110.27.127:3000/",
  timeout: 15000,
});

export default instance;
