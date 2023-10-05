export const setAccessTokenToLS = (access_token: string) => {
  localStorage.setItem('access_token', access_token);
};

export const getAccessTokenFromLS = () => {
  return localStorage.getItem('access_token') || '';
};

export const clearLocalStorage = () => {
  localStorage.removeItem('access_token');
};
