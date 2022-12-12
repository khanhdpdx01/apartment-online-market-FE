import axios from "axios";

export default axios.create({
  baseURL: window.VUE_APP_SERVICE_ENDPOINT,
  timeout: 1500,
  withCredentials: true,
});
