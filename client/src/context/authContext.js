import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const { createContext, useContext, useState, useEffect } = require("react");


const AuthContext=createContext();

export const AuthProvider=({children})=>{
    const [user,setUser]=useState(null);
    const navigate=useNavigate();

    //check for cookies
    useEffect(()=>{
        const token=Cookies.get("accessToken");
        if(token){
            setUser({token})
        }
    },[])
    const login = (userData) => {
        console.log("userData", userData);
        
        setUser(userData);
        Cookies.set("accessToken", userData.token, { expires: 1 });  // Store token in cookies
        navigate("/dashboard");
      };
    
      const logout = () => {
        setUser(null);
        Cookies.remove("accessToken"); // Remove token from cookies
        navigate("/login");
      };
      return (
        <AuthContext.Provider value={{ user, login, logout }}>
          {children}
        </AuthContext.Provider>
      );
    
}
export const useAuth = () => {
    return useContext(AuthContext);
  };