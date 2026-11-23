import axios from "axios";

const API = axios.create({
  baseURL: "https://school-erp-backend-1-ks0j.onrender.com/api",
});

export default API;