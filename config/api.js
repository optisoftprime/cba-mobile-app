import axios from 'axios';
import { load, save, remove } from './storage';
import { baseUrl, orgKey } from './backendConfig';
import { navigateTo } from 'app/navigate';

const axiosCbaInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
    'x-org-key': orgKey,
  },
});

// REQUEST interceptor — attach token before every request
axiosCbaInstance.interceptors.request.use(async (config) => {
  const auth = await load('auth');
  if (auth?.accessToken) {
    config.headers.Authorization = `Bearer ${auth.accessToken}`;
  }
  return config;
});

// RESPONSE interceptor — if 401, clear auth but keep app settings
axiosCbaInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await remove('auth'); // clears token/user auth
      await remove('user'); // clears user data
      // 'app' key is untouched — keeps hasOpenedBefore
      navigateTo('landingScreen');
    }
    return Promise.reject(error);
  }
);

export default axiosCbaInstance;
