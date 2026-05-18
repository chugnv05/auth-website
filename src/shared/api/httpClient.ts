import axios from "axios"; // call API
import { ENV } from "../config/env";
import "./interceptors";

export const httpClient = axios.create({
  baseURL: ENV.API_URL,
  withCredentials: true, // gui coookie kem request(refresh cookie)
  headers: {
    "Content-Type": "application/json",
  },
});
