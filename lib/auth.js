// lib/auth.js
import api from "./axios";

// Call this before login or register
export const getCSRFToken = () => api.get("/sanctum/csrf-cookie");


export const register = async (data) => {
  await getCSRFToken();
  return api.post("/api/register", data);
};

export const login = async (data) => {
  await getCSRFToken();
  return api.post("/api/login", data);
};

export const getProfile = () => api.get("/api/profile");

export const logout = () => api.get("/api/logout");