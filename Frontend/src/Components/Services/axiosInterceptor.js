import axios from "axios";

const instance = axios.create({
  baseURL: "http://13.201.81.133:3000/",
  timeout: 15000,
});

export default instance;
