import axios from "axios";

export default axios.create({
  baseURL: "http://34.143.194.243:9090/api/",
  timeout: 1500,
  withCredentials: true,
});
