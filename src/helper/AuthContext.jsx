import { createContext, useContext, useState } from "react";
import { getToken, removeToken, saveToken } from "./local";

// Create the context
const AuthContext = createContext();

// AuthProvider component to wrap the app
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(getToken());

  // Function to login (store token)
  const loginUser = (token) => {
    setToken(token);
     saveToken(token)
  };

  // Function to logout (clear token)
  const logoutUser = () => {
    setToken(null);
    removeToken()
   
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        loginUser,
        logoutUser,
        isAuthenticated: !!token, // optional: derived state
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth
export const useAuth = () => useContext(AuthContext);
