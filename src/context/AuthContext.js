import { useState, useEffect, createContext, useContext } from 'react';
import { parseCookies, setCookie, destroyCookie } from 'nookies';
import api from '../api/api';
import { fetchCustomerInfo } from "../api/routes/customer/infoMe";
import { customerWishList } from '../api/routes/customer/customerWishList';
import { addWishList } from '../api/routes/customer/addWishList';
import { removeWishList } from '../api/routes/customer/removeWishList';

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
  const [wishlist, setWishlist] = useState([]);
  const [wishlistLength, setWishlistLength] = useState(0);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  // Carrega a wishlist quando o usuário faz login
  const loadWishlist = async () => {
    if (!user) {
      setWishlist([]);
      setWishlistLength(0);
      return;
    }

    setWishlistLoading(true);
    try {
      const wishlistData = await customerWishList();
      console.log('Lista de desejos carregada:', wishlistData);
      setWishlist(wishlistData || []);
      setWishlistLength(wishlistData?.length || 0);
      return wishlistData;
    } catch (err) {
      console.error('Erro ao carregar lista de desejos:', err);
      setWishlist([]);
      setWishlistLength(0);
      throw err;
    } finally {
      setWishlistLoading(false);
    }
  };

  // Adiciona produto à wishlist
  const addToWishlist = async (productId) => {
    if (!user) {
      throw new Error('Usuário não autenticado');
    }

    try {
      const response = await addWishList({ productId });
      
      if (response) {
        // Atualiza o estado local
        await loadWishlist(); // Recarrega a wishlist completa
        
      }
    } catch (error) {
      console.error('Erro ao adicionar à wishlist:', error);
     
    }
  };

  // Remove produto da wishlist
  const removeFromWishlist = async (productId) => {
    if (!user) {
      throw new Error('Usuário não autenticado');
    }

    try {
      const response = await removeWishList({ productId });
      
      if (response) {
        // Atualiza o estado local
        await loadWishlist(); // Recarrega a wishlist completa
       
      } 
    } catch (error) {
      console.error('Erro ao remover da wishlist:', error);
    
    }
  };

  // Verifica se um produto está na wishlist
  const isInWishlist = (productId) => {
    return wishlist.some(item => item.product_id == productId);
  };

  // Toggle produto na wishlist (adiciona se não existe, remove se existe)
  const toggleWishlist = async (productId) => {
    if (!user) {
      return { success: false, message: 'Faça login para adicionar à lista de desejos' };
    }

    const isCurrentlyInWishlist = isInWishlist(productId);
    
    if (isCurrentlyInWishlist) {
      return await removeFromWishlist(productId);
    } else {
      return await addToWishlist(productId);
    }
  };

  // Limpa a wishlist (quando faz logout)
  const clearWishlist = () => {
    setWishlist([]);
    setWishlistLength(0);
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const { token } = parseCookies();

      if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        try {
          const userData = await fetchCustomerInfo();
          setUser(userData);
          // Não carregar wishlist aqui, vamos carregar no próximo useEffect
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

  // Carrega wishlist quando usuário muda
  useEffect(() => {
    if (user) {
      loadWishlist();
    } else {
      clearWishlist();
    }
  }, [user]);

  const login = async (userData, token) => {
    setCookie(null, 'token', token, {
      maxAge: 24 * 60 * 60, // 1 dia
      path: '/',
    });

    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(userData);
    // A wishlist será carregada automaticamente pelo useEffect acima
  };

  const logout = async () => {
    destroyCookie(null, 'token');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
    clearWishlist();

    try {
      window.location.href = '/'; // Redireciona para a página inicial
    } catch (err) {
      console.error('Erro ao tentar fazer logout:', err);
    }
  };

  const isAuthenticated = () => !!user;

  // Função para compatibilidade com código existente
  const getWishlist = async () => {
    return await loadWishlist();
  };

  const contextValue = {
    // Estados de autenticação
    user,
    loading,
    
    // Funções de autenticação
    login,
    logout,
    isAuthenticated,
    
    // Estados da wishlist
    wishlist,
    wishlistLength,
    wishlistLoading,
    
    // Funções da wishlist
    loadWishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    clearWishlist,
    getWishlist, // Para compatibilidade
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default useAuth;