import { User } from 'src/types/user.type';

export const setAccessTokenToLS = (access_token: string) => {
  localStorage.setItem('access_token', access_token);
};

export const getAccessTokenFromLS = () => {
  return localStorage.getItem('access_token') || '';
};

export const clearLocalStorage = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('user');
};

export const getUserFromLs = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const setUserToLs = (user: User) => {
  localStorage.setItem('user', JSON.stringify(user));
};
