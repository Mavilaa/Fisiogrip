// pages/LoginPage.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', senha: '' });
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErro('');
    setLoading(true);
    try {
      const data = await login(form.email, form.senha);
      navigate(data.is_admin ? '/admin' : '/dashboard');
    } catch (err) {
      setErro(err.response?.data?.error || 'Email ou senha inválidos. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-bg">
      <div className="auth-card fade-in-up">
        <div className="auth-logo">🤝</div>
        <h1 className="auth-title">FisioGrasp</h1>
        <p className="auth-sub">Entre para iniciar sua reabilitação</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              required
              className="input"
              placeholder="seu@email.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="input-group">
            <label className="input-label" htmlFor="senha">Senha</label>
            <input
              id="senha"
              type="password"
              required
              className="input"
              placeholder="••••••••"
              value={form.senha}
              onChange={(e) => setForm({ ...form, senha: e.target.value })}
            />
          </div>

          {erro && <div className="alert alert-danger" role="alert">⚠️ {erro}</div>}

          <button
            id="btn-login"
            type="submit"
            disabled={loading}
            className="btn btn-primary btn-full"
            style={{ marginTop: 4, padding: '13px' }}
          >
            {loading ? (
              <><span className="spinner" style={{ width: 16, height: 16, borderWidth: 2 }} /> Entrando...</>
            ) : 'Entrar'}
          </button>
        </form>

        <hr className="divider" />
        <p style={{ fontSize: 13, textAlign: 'center', color: 'var(--muted)' }}>
          Não tem conta?{' '}
          <Link to="/register" style={{ color: 'var(--primary)', fontWeight: 600 }}>
            Cadastre-se grátis
          </Link>
        </p>

        {/* Dicas de acesso rápido — modo mock */}
        <div style={{ marginTop: 20, padding: '14px 16px', background: 'var(--bg)', borderRadius: 'var(--radius-sm)', fontSize: 12 }}>
          <div style={{ fontWeight: 700, color: 'var(--text-2)', marginBottom: 6 }}>🔑 Acessos rápidos (mock):</div>
          <div style={{ color: 'var(--muted)', lineHeight: 1.8 }}>
            <div>👤 <strong>joao@email.com</strong> / 123456</div>
            <div>🛠️ <strong>admin@fisiogrip.com</strong> / admin123</div>
          </div>
        </div>
      </div>
    </div>
  );
}
