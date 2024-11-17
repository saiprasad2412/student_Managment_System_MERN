import axios from "axios"
import { loginUrl, registerUrl } from "../urls"


const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/api/v1",
    withCredentials: true, // Include cookies and credentials
  });
  export const loginFn = async (payload) => {
    try {
        const response = await axiosInstance.post("/auth/login", payload);

      return response.data;
    } catch (error) {
      console.error("Error in loginFn:", error.response?.data || error.message);
      return error.response?.data || { success: false, message: error.message };
    }
  };
export const registerFn=async(payload)=>{
    try {
        const response = await axiosInstance.post("/auth/register", payload);
        return response.data
        
    } catch (error) {
        return error
        
    }
}

export const logoutFn=async()=>{
    try {
        const response = await axiosInstance.post("/auth/logout");
        return response.data
        
    } catch (error) {
        return error
        
    }
}