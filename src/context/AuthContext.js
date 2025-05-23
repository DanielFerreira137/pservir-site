import { useState, useEffect, createContext, useContext } from 'react';
import { parseCookies, setCookie, destroyCookie } from 'nookies';
import api from '../api/api';
import { fetchCustomerInfo } from "../api/routes/customer/infoMe";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
 /** @type {[InfoMe|null, Function]} */
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const { token } = parseCookies();

      if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        try {
          const userData = await fetchCustomerInfo();
          setUser(userData);
          console.log("User data:", userData);
        } catch (err) {
          console.error("Erro ao buscar info do user:", err);
          destroyCookie(null, 'token');
          setUser(null);
        }
      }

      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = (userData, token) => {
    setCookie(null, 'token', token, {
      maxAge: 24 * 60 * 60, // 1 dia
      path: '/',
    });

    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(userData);
  };

  const logout = async () => {
    destroyCookie(null, 'token');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);

    try {
      await api.post('/auth/logout');
    } catch (err) {
      console.error('Erro ao tentar fazer logout:', err);
    } finally {
     
    }
  };

  const isAuthenticated = () => !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default useAuth;
