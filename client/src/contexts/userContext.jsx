import { createContext, useState } from 'react';
import { api_login, api_register } from '../services/authService.js';
import { getUserData } from '../services/userDataService.js';

const UserContext = createContext();

// This creates a context every component will inherit with data from the user
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Wrappers for authService API calls, set user data for the entire context

  const login = async (username, password) => {
    const result = await api_login(username, password);
    if (result.success) {
      const userData = await getUserData(result.data.id);
      setUser(userData);
      return { success: true };
    }
    return { success: false, message: result.error };
  };

  const register = async (username, password) => {
    const result = await api_register(username, password);
    if (result.success) {
      const userData = await getUserData(result.data.id);
      setUser(userData);
      return { success: true };
    }
    return { success: false, message: result.error };
  };

  return (
    <UserContext.Provider value={{ user, login, register }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };