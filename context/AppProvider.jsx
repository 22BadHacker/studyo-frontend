'use client'
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

// Creating the context
const AppContext = createContext();


// Custom hook
export const useAppHook = () => useContext(AppContext);

// Backend API
const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`


// the actual AppProvider
const AppProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [authToken, setAuthToken] = useState(null);


  const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}`, // change as needed
    withCredentials: true
  });



  // Login
  const login = async (formData) => {
    setAuthError(null);
    try {
      setLoading(true);
      await axios.get('http://localhost:8000/sanctum/csrf-cookie');
      const response = await api.post("/login", formData);
      setUser(response.data.user);
      console.log(response.data)
      // router.push("/");
      toast.success("Login successful");

    

      if(response.data.status){
        Cookies.set("authToken", response.data.token, { expire: 7});
        setAuthToken(response.data.token);

      } else{
        // toast.error("Inavalid Login Details")
      }
      
      
    toast.error("Inavalid Login Details")
    } catch (error) {
      // setAuthError(error.response?.data?.message || "Login failed");
      return { success: false };
    } finally{
      setLoading(false);
    }
  }


  // Register
  const register = async (formData) => {
    setAuthError(null);
    try {
      setLoading(true);
      await axios.get('http://localhost:8000/sanctum/csrf-cookie');
      const response = await api.post("/register", formData);
      setUser(response.data.user);
      console.log(response.data)
      router.push("/");
      toast.success("Registration successful");
    } catch (error) {
      if (error.response) {
      console.log(error.response.data.errors) // <-- see which fields failed
    }
    } finally {
      setLoading(false);
    }
  }

  // Logout
  const logout = async () => {
    try {
      await api.post("/logout");
      setUser(null);
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  // LOAD USER ON APP START
  const getUser = async () => {
    try {
      const res = await api.get("/profile");
      setUser(res.data);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    getUser();
  }, []);


  const value = {
    user,
    setUser,
    loading,
    authError,
    register,
    login,
    logout
  };

   return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export default AppProvider
