import { createContext, useState, useEffect } from 'react';
import { api_login, api_register } from '../services/authService.js';
import { getUserData } from '../services/userDataService.js';

const UserContext = createContext();

// This creates a context every component will inherit with data from the user
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

  // Load user data from localStorage when the component is mounted
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Wrappers for authService API calls, set user data for the entire context

  const login = async (username, password) => {
    const result = await api_login(username, password);
    if (result.success) {
      const userData = await getUserData(result.data.id);
      setUser(userData);
      // Store user data in browser
      localStorage.setItem('user', JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, message: result.error };
  };

  const register = async (username, password) => {
    const result = await api_register(username, password);
    if (result.success) {
      const userData = await getUserData(result.data.id);
      setUser(userData);
      // Store user data in browser
      localStorage.setItem('user', JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, message: result.error };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <UserContext.Provider value={{ user, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };