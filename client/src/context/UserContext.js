import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';

// Create a context
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token"); // assuming you store JWT token in local storage
        if (token) {
          const decodedToken = jwtDecode(token);
          
          // Check if token is expired
          const currentTime = Date.now() / 1000; // Convert to seconds
          if (decodedToken.exp && decodedToken.exp < currentTime) {
            // Token is expired, remove it
            console.log("Token expired, logging out");
            localStorage.removeItem("token");
            setUser(null);
          } else {
            // Token is valid
            setUser(decodedToken); // Store the decoded user information
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        // If there's an error decoding the token, it's likely invalid
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};
