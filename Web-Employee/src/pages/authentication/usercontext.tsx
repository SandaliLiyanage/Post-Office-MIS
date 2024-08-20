import React, { createContext, useState, ReactNode } from 'react';



  interface User {
    name: string;
    postalCode: string;
    role: string;
    token: string;
  }
  
  interface UserContextType {
    user: User | null;
    saveUser: (user: User | null) => void;
  }
  
  const UserContext = createContext<UserContextType | undefined>(undefined);
  
  export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
  
    const saveUser = (user: User | null) => {
      setUser(user);
        if (user) {
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