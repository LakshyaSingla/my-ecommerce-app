import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // 1. Manage the currently logged-in user
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // 2. Manage the "database" of all registered users
  const [usersDb, setUsersDb] = useState(() => {
    const savedDb = localStorage.getItem('usersDb');
    return savedDb ? JSON.parse(savedDb) : [];
  });

  // 3. Save the users database whenever a new user signs up
  useEffect(() => {
    localStorage.setItem('usersDb', JSON.stringify(usersDb));
  }, [usersDb]);

  // 4. Save the current session so users stay logged in after refreshing
  useEffect(() => {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [user]);

  const signup = (email, password) => {
    // Check if user already exists
    const userExists = usersDb.find(u => u.email === email);
    if (userExists) {
      return { success: false, message: 'An account with this email already exists.' };
    }
    
    // Create new user and add to "database"
    const newUser = { email, password, name: email.split('@')[0] };
    setUsersDb([...usersDb, newUser]);
    
    // Automatically log them in after signing up
    setUser({ email: newUser.email, name: newUser.name });
    return { success: true };
  };

  const login = (email, password) => {
    const existingUser = usersDb.find(u => u.email === email);
    
    if (!existingUser) {
      return { success: false, message: 'User not found. Please sign up first.' };
    }
    if (existingUser.password !== password) {
      return { success: false, message: 'Incorrect password.' };
    }
    
    // Success! Log them in. (Notice we don't save the password to the active session)
    setUser({ email: existingUser.email, name: existingUser.name });
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};