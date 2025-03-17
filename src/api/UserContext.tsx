import React, { createContext, useContext, useState, useEffect } from "react";
import { getUser } from "./userApi";
 // Import your API function

// Define User Type
interface User {
  _id: string;
  name: string;
  image?: string;
}

// Define Context Type
interface UserContextType {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  fetchUsers: () => Promise<void>;
}

// Create Context
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUser();
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <UserContext.Provider value={{ users, setUsers, fetchUsers }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom Hook to Use Context
export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
