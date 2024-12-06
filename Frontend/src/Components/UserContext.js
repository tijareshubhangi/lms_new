import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: {
      firstName: "",
      lastName: "",
    },
    email: "",
    // Add other user data as needed
  });

  const updateUser = (updatedUser) => {
    setUser(updatedUser); // Update user state with the new data
  };

  const logout = () => {
    setUser(null); // Reset user state on logout
  };

  return (
    <UserContext.Provider value={{ user, updateUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
