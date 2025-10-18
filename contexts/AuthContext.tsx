import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// In a real app, this would be an API call to a persistent database.
// Here, we use a simple in-memory object to simulate a shared database.
// New signups will be added to this object but will be lost if the app restarts.
const userDatabase: { [email: string]: string } = {
  'user@example.com': 'password123',
};

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
    // Check for a logged-in user session in localStorage on initial load
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
    // Check against the shared in-memory database
    if (userDatabase[email] && userDatabase[email] === pass) {
      const loggedInUser = { email };
      setUser(loggedInUser);
      // Store the current user's session in localStorage
      localStorage.setItem('kane-music-user', JSON.stringify(loggedInUser));
    } else {
      throw new Error('Invalid email or password');
    }
  };
  
  const signup = async (email: string, pass: string): Promise<void> => {
    // Check if user exists in the shared in-memory database
    if (userDatabase[email]) {
      throw new Error('User with this email already exists');
    }
    // Add new user to the in-memory database for the current app session
    userDatabase[email] = pass;
    
    // Automatically log in after signup
    const newUser = { email };
    setUser(newUser);
    // Store the new user's session in localStorage
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
