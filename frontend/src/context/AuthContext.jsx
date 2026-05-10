import { createContext, useState, useEffect, useCallback } from 'react';
import { loginUser as loginAPI, registerUser as registerAPI, googleLogin as googleLoginAPI } from '../api/auth';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Persist auth on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (credentials) => {
    const data = await loginAPI(credentials);
    const { token: jwt, user: userData } = data;
    setToken(jwt);
    setUser(userData);
    localStorage.setItem('token', jwt);
    localStorage.setItem('user', JSON.stringify(userData));
    return data;
  }, []);

  const register = useCallback(async (userData) => {
    const data = await registerAPI(userData);
    const { token: jwt, user: newUser } = data;
    if (jwt) {
      setToken(jwt);
      setUser(newUser);
      localStorage.setItem('token', jwt);
      localStorage.setItem('user', JSON.stringify(newUser));
    }
    return data;
  }, []);

  const googleLogin = useCallback(async (accessToken) => {
    const data = await googleLoginAPI(accessToken);
    const { token: jwt, user: userData } = data;
    if (jwt) {
      setToken(jwt);
      setUser(userData);
      localStorage.setItem('token', jwt);
      localStorage.setItem('user', JSON.stringify(userData));
    }
    return data;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }, []);

  const isAuthenticated = !!token;
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated,
        isAdmin,
        login,
        register,
        googleLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
