import axios, { AxiosError, AxiosInstance, HttpStatusCode } from 'axios';
import { toast } from 'react-toastify';
import { clearLocalStorage, getAccessTokenFromLS, setAccessTokenToLS, setUserToLs } from './getTokenfromLS';
import { AuthResponse } from 'src/types/auth.type';
import { API_URL, path } from '../constants/path';

export const http: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
});

// Add a response interceptor
http.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    const url = response.config.url;
    if (url === path.login || url === path.register) {
      const access_token = (response.data as AuthResponse).data.access_token;
      if (access_token) {
        setAccessTokenToLS(access_token);
        setUserToLs(response.data.data.user);
      }
    } else if (url === path.logout) {
      clearLocalStorage();
    }

    console.log('res http', response);
    return response;
  },
  function (error: AxiosError) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
      toast.error(error.message, {
        position: 'top-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      });
    }

    if (error.response?.status === HttpStatusCode.Unauthorized) {
      clearLocalStorage();
    }

    return Promise.reject(error);
  }
);

//add a request interceptor
http.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const access_token = getAccessTokenFromLS();
    if (access_token && config.headers) {
      config.headers.authorization = access_token;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
