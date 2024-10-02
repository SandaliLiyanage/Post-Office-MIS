import React, { createContext, useState, ReactNode, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define the User interface
interface User {
  name: string;
  postalCode: string;
  role: string;
  token: string;
  postOfficeName: string;
  email: string;
}

// Define the UserContextType interface
interface UserContextType {
  user: User | null;
  saveUser: (user: User | null) => void;
  removeUser: () => void;
}

// Create the UserContext
const UserContext = createContext<UserContextType | undefined>(undefined);

// UserProvider component to wrap around the app
export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  // Load the user from AsyncStorage when the app starts
  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error("Failed to load user data", error);
      }
    };
    loadUser();
  }, []);

  // Save user data both in state and AsyncStorage
  const saveUser = async (user: User | null) => {
    try {
      setUser(user);
      if (user) {
        console.log("User saved to AsyncStorage", user);
        await AsyncStorage.setItem("user", JSON.stringify(user));
      } else {
        await AsyncStorage.removeItem("user");
      }
    } catch (error) {
      console.error("Failed to save user data", error);
    }
  };

  // Remove the user from state and AsyncStorage
  const removeUser = async () => {
    try {
      setUser(null);
      await AsyncStorage.removeItem("user");
    } catch (error) {
      console.error("Failed to remove user data", error);
    }
  };

  return (
    <UserContext.Provider value={{ user, saveUser, removeUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
