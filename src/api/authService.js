import api from './api';

// LOGIN
export const login = async (email, password) => {
  const res = await api.post('/auth/login', { email, password });
  const { token, user } = res.data;

  // Guardamos token en localStorage
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));

  return user;
};

// LOGOUT
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// OBTENER USUARIO ACTUAL
export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};
