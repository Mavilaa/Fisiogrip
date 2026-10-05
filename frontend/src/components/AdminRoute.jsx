// components/AdminRoute.jsx
// Protege o painel administrativo. Usuários comuns logados são mandados
// de volta para o dashboard deles; deslogados vão para o login.
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (!user.is_admin) return <Navigate to="/dashboard" replace />;
  return children;
}
