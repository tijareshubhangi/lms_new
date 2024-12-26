import axios from "axios";

const instance = axios.create({
  baseURL: "http://3.110.123.25:9000/",
  timeout: 15000,
});

export default instance;
