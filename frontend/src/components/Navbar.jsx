// components/Navbar.jsx
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { pathname } = useLocation();
  const isActive = (path) => (pathname === path ? 'nav-link active' : 'nav-link');

  return (
    <nav className="navbar">
      <Link to={user?.is_admin ? '/admin' : '/dashboard'} className="navbar-brand">
        <span>🤝</span> FisioGrasp
      </Link>
      {user && (
        <div className="navbar-links">
          {!user.is_admin && (
            <>
              <Link to="/dashboard" className={isActive('/dashboard')}>Início</Link>
              <Link to="/history" className={isActive('/history')}>Histórico</Link>
              <Link to="/ranking" className={isActive('/ranking')}>Ranking</Link>
            </>
          )}
          {user.is_admin && (
            <Link to="/admin" className="nav-link admin">🛠️ Painel Admin</Link>
          )}
          <button onClick={logout} className="nav-link-logout">Sair</button>
        </div>
      )}
    </nav>
  );
}
