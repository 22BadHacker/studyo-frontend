// lib/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000", // Laravel API URL
  withCredentials: true, // Send cookies (important for Sanctum)
});

export default api;
