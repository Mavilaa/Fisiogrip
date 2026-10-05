// App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { BluetoothProvider } from './context/BluetoothContext';
import { SessionProvider } from './context/SessionContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import Navbar from './components/Navbar';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DeviceListPage from './pages/DeviceListPage';
import DashboardPage from './pages/DashboardPage';
import SessionPage from './pages/SessionPage';
import ResultPage from './pages/ResultPage';
import HistoryPage from './pages/HistoryPage';
import RankingPage from './pages/RankingPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

// Decide para onde a rota "/" deve mandar o usuário
function RootRedirect() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return <Navigate to={user.is_admin ? '/admin' : '/dashboard'} replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <BluetoothProvider>
        <SessionProvider>
          <BrowserRouter>
            <Navbar />
            <Routes>
              {/* Públicas */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Protegidas — somente usuários comuns */}
              <Route path="/devices" element={<ProtectedRoute><DeviceListPage /></ProtectedRoute>} />
              <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
              <Route path="/session" element={<ProtectedRoute><SessionPage /></ProtectedRoute>} />
              <Route path="/result" element={<ProtectedRoute><ResultPage /></ProtectedRoute>} />
              <Route path="/history" element={<ProtectedRoute><HistoryPage /></ProtectedRoute>} />
              <Route path="/ranking" element={<ProtectedRoute><RankingPage /></ProtectedRoute>} />

              {/* Administrativa — somente contas com is_admin */}
              <Route path="/admin" element={<AdminRoute><AdminDashboardPage /></AdminRoute>} />

              {/* Raiz — redireciona conforme sessão */}
              <Route path="/" element={<RootRedirect />} />
              <Route path="*" element={<RootRedirect />} />
            </Routes>
          </BrowserRouter>
        </SessionProvider>
      </BluetoothProvider>
    </AuthProvider>
  );
}
