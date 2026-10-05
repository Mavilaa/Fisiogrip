// services/authService.js
// Gerencia token JWT no localStorage

const TOKEN_KEY = 'fisiogrip_token';
const USER_KEY  = 'fisiogrip_user';

export const authService = {
  saveToken:   (token) => localStorage.setItem(TOKEN_KEY, token),
  getToken:    ()      => localStorage.getItem(TOKEN_KEY),
  removeToken: ()      => localStorage.removeItem(TOKEN_KEY),

  saveUser:    (user)  => localStorage.setItem(USER_KEY, JSON.stringify(user)),
  getUser:     ()      => { const u = localStorage.getItem(USER_KEY); return u ? JSON.parse(u) : null; },
  removeUser:  ()      => localStorage.removeItem(USER_KEY),

  isLoggedIn:  ()      => !!localStorage.getItem(TOKEN_KEY),

  clear: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
};
