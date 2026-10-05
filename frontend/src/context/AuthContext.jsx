// context/AuthContext.jsx — Mock
import { createContext, useContext, useState } from 'react';
import { loginApi, logoutApi } from '../api/authApi';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('fisiogrip_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  async function login(email, senha) {
    const { data } = await loginApi(email, senha);
    localStorage.setItem('fisiogrip_token', data.token);
    localStorage.setItem('fisiogrip_user', JSON.stringify(data));
    setUser(data);
    return data;
  }

  async function logout() {
    try { await logoutApi(); } catch (_) { /* mock nunca falha, mas por segurança */ }
    localStorage.removeItem('fisiogrip_token');
    localStorage.removeItem('fisiogrip_user');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
