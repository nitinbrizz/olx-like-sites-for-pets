import React, { useEffect, useState } from "react";
import {auth} from "./firebase";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setpending] = useState(true)

  useEffect(() => {
    auth.onAuthStateChanged(setCurrentUser,setpending(true))
  }, []);

  return (
    <AuthContext.Provider value={{currentUser,pending}}>
      {children}
    </AuthContext.Provider>
  );
};