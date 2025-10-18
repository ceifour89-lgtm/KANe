import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// For this demo, we'll store users in localStorage.
// In a real app, this would be an API call.
interface User {
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string) => Promise<void>;
  signup: (email: string, pass: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for a logged-in user in localStorage on initial load
    const storedUser = localStorage.getItem('kane-music-user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        localStorage.removeItem('kane-music-user');
      }
    }
  }, []);
  
  const login = async (email: string, pass: string): Promise<void> => {
    const storedUsers = JSON.parse(localStorage.getItem('kane-music-users') || '{}');
    if (storedUsers[email] && storedUsers[email] === pass) {
      const loggedInUser = { email };
      setUser(loggedInUser);
      localStorage.setItem('kane-music-user', JSON.stringify(loggedInUser));
    } else {
      throw new Error('Invalid email or password');
    }
  };
  
  const signup = async (email: string, pass: string): Promise<void> => {
    const storedUsers = JSON.parse(localStorage.getItem('kane-music-users') || '{}');
    if (storedUsers[email]) {
      throw new Error('User with this email already exists');
    }
    storedUsers[email] = pass;
    localStorage.setItem('kane-music-users', JSON.stringify(storedUsers));
    
    // Automatically log in after signup
    const newUser = { email };
    setUser(newUser);
    localStorage.setItem('kane-music-user', JSON.stringify(newUser));
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('kane-music-user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
