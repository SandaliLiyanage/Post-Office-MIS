import React, { createContext, useState, ReactNode, useEffect } from 'react';



  interface User {
    name: string;
    postalCode: string;
    role: string;
    token: string;
    postOfficeName: string;
  }
  
  interface UserContextType {
    user: User | null;
    saveUser: (user: User | null) => void;
  }
  
  const UserContext = createContext<UserContextType | undefined>(undefined);
  
  export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    
    // Get the user from the local storage
    useEffect(() => {
      const user = localStorage.getItem('user');
      if (user) {
        setUser(JSON.parse(user));
      }
    }, []);
  
    const saveUser = (user: User | null) => {
      setUser(user);
        if (user) {
          console.log("User saved to the local storage", user);
          localStorage.setItem('user', JSON.stringify(user));
        } else {
          localStorage.removeItem('user');
      }
    };
  
    return (
      <UserContext.Provider value={{ user, saveUser }}>
        {children}
      </UserContext.Provider>
    );
  };
  
  export const useUser = () => {
    const context = React.useContext(UserContext);
    if (context === undefined) {
      throw new Error('useUser must be used within a UserProvider');
    }
    return context;
  };