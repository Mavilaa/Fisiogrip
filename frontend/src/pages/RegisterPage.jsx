// pages/RegisterPage.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerApi } from '../api/authApi';

const PERFIS = [
  { id: 'motor',   label: 'Reab. Motora', icon: '🦾' },
  { id: 'tdah',    label: 'TDAH',         icon: '⚡' },
  { id: 'autismo', label: 'Autismo',      icon: '🌟' },
  { id: 'outro',   label: 'Outro',        icon: '💙' },
];

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nome: '', email: '', senha: '', perfil: 'outro' });
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (form.senha.length < 6) { setErro('Senha deve ter ao menos 6 caracteres.'); return; }
    setErro('');
    setLoading(true);
    try {
      await registerApi(form);
      navigate('/login');
    } catch (err) {
      setErro(err.response?.data?.error || 'Erro ao cadastrar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-bg">
      <div className="auth-card fade-in-up" style={{ maxWidth: 440 }}>
        <div className="auth-logo">🤝</div>
        <h1 className="auth-title">Criar conta</h1>
        <p className="auth-sub">FisioGrasp — Reabilitação Gamificada</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label" htmlFor="nome">Nome completo</label>
            <input
              id="nome" type="text" required className="input"
              placeholder="Seu nome"
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
            />
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="reg-email">Email</label>
            <input
              id="reg-email" type="email" required className="input"
              placeholder="seu@email.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="reg-senha">Senha</label>
            <input
              id="reg-senha" type="password" required className="input"
              placeholder="Mínimo 6 caracteres"
              value={form.senha}
              onChange={(e) => setForm({ ...form, senha: e.target.value })}
            />
          </div>

          <div className="input-group">
            <label className="input-label">Perfil de reabilitação</label>
            <div className="chip-group" style={{ marginTop: 4 }}>
              {PERFIS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setForm({ ...form, perfil: p.id })}
                  className={`chip${form.perfil === p.id ? ' selected' : ''}`}
                >
                  {p.icon} {p.label}
                </button>
              ))}
            </div>
          </div>

          {erro && <div className="alert alert-danger">⚠️ {erro}</div>}

          <button
            id="btn-register"
            type="submit"
            disabled={loading}
            className="btn btn-primary btn-full"
            style={{ marginTop: 4, padding: '13px' }}
          >
            {loading ? (
              <><span className="spinner" style={{ width: 16, height: 16, borderWidth: 2 }} /> Cadastrando...</>
            ) : 'Criar conta'}
          </button>
        </form>

        <hr className="divider" />
        <p style={{ fontSize: 13, textAlign: 'center', color: 'var(--muted)' }}>
          Já tem conta?{' '}
          <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 600 }}>
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}
