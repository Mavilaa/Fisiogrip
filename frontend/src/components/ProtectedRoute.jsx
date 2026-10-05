// components/ProtectedRoute.jsx
// Protege as páginas do usuário comum (dashboard, sessão, histórico, ranking).
// Se não estiver logado -> /login. Se for admin -> manda para o painel /admin,
// já que o admin não deve ver as telas de exercício do paciente.
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.is_admin) return <Navigate to="/admin" replace />;
  return children;
}
