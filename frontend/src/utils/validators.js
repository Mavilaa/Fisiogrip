// utils/validators.js

export const validators = {
  email: (v)  => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
  senha: (v)  => v.length >= 8,
  nome:  (v)  => v.trim().length >= 2,

  loginForm({ email, senha }) {
    const erros = {};
    if (!this.email(email)) erros.email = 'Email inválido.';
    if (!this.senha(senha)) erros.senha = 'Senha deve ter ao menos 8 caracteres.';
    return erros;
  },

  registerForm({ nome, email, senha }) {
    const erros = {};
    if (!this.nome(nome))   erros.nome  = 'Nome deve ter ao menos 2 caracteres.';
    if (!this.email(email)) erros.email = 'Email inválido.';
    if (!this.senha(senha)) erros.senha = 'Senha deve ter ao menos 8 caracteres.';
    return erros;
  },
};
