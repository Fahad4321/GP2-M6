import axios from "axios";
import { getToken } from "./sessionStorage";
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

export default instance;
