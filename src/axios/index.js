import axios from "axios";
import Cookies from "js-cookie";

const BasicAxios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + Cookies.get("access_token"),
  },
});

BasicAxios.defaults.withCredentials = true;

export default BasicAxios;
