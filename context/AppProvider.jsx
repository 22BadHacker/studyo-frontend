'use client'
import React, { createContext, use, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import toast, {Toaster } from "react-hot-toast";


// Creating the context
const AppContext = createContext();


// the actual AppProvider
const AppProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [authToken, setAuthToken] = useState(null);

  // useEffect(() => {
  //   const token = Cookies.get("authToken");
  //   if (token) {
  //     setAuthToken(token);

  //   }else{
  //     router.push('/Auth/Login')
  //   }

  // })




  // Toast Helpers
  const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);


   // Axios Instance
  const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
    withCredentials: true,
  });


 // LOGIN
  const login = async (formData) => {
    setAuthError(null);
    try {
      await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
        withCredentials: true,
      });
      const response = await api.post("/login", formData);

      if (response.data.status) {
        setUser(response.data.user);
        Cookies.set("authToken", response.data.token, { expires: 7 });
        setAuthToken(response.data.token);
        notifySuccess("Login successful!");

        setTimeout(() => {
          router.push('/');
        }, 1500);
      } else {
        notifyError("Invalid login details.");
      }
    } catch (error) {
      notifyError(error.response?.data?.message || "Login failed.");
      return { success: false };
    }
  };



  // REGISTER
  const register = async (formData) => {
    setAuthError(null);
    try {
      await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
        withCredentials: true,
      });
      const response = await api.post("/register", formData);

      setUser(response.data.user);
      notifySuccess("Registration successful!");

      setTimeout(() => {
        router.push('/');
      }, 1500);
    } catch (error) {
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        Object.values(errors).forEach((msgs) =>
          msgs.forEach((msg) => notifyError(msg))
        );
      } else {
        notifyError("Registration failed.");
      }
    }
  };



  // LOGOUT
  const logout = async () => {
  try {
    await axios.post('/logout'); // Laravel logout route
  } catch (error) {
    console.error('Logout failed', error);
  } finally {
    // Clear local user state
    setUser(null);
    setAuthToken(null); // Or wherever you store auth
    router.push('/Auth/Login');
    notifySuccess("Logged out successfully.");
  }
};


  const logout2 = async () => {
    try {
      // await api.post("/logout");
      setAuthToken(null);
      setUser(null);
      notifySuccess("Logged out successfully.");
      router.push('/Auth/Login');
    } catch (error) {
      notifyError("Logout failed.");
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
    logout,
    notifySuccess, 
    notifyError,
    authToken
  };

   return <AppContext.Provider value={value}>
             <Toaster
                position="bottom-right"
                toastOptions={{
                  duration: 3000,
                  style: {
                    background: '#323232',
                    color: '#fff',
                    padding: '16px 20px',
                    borderRadius: '10px',
                    fontSize: '14px',
                  },
                }}
              />
            {children}
          </AppContext.Provider>;
}

export default AppProvider


// Custom hook to use it
export const useAppHook = () => useContext(AppContext);
