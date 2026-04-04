import axios from 'axios';
import { load, remove, loadSecure, removeSecure } from './storage';
import { baseUrl, orgKey } from './backendConfig';
import { navigateTo } from 'app/navigate';
import Toast from 'react-native-toast-message';

const axiosCbaInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
    'x-org-key': orgKey,
  },
});

axiosCbaInstance.interceptors.request.use(async (config) => {
  const auth = await loadSecure('auth');
  if (auth?.accessToken) {
    config.headers.Authorization = `Bearer ${auth.accessToken}`;
  }
  return config;
});

axiosCbaInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      await removeSecure('auth');
      await remove('user');
      navigateTo('landingScreen');
      Toast.show({ type: 'error', text1: 'Session Expired', text2: 'Login to continue' });
    }
    return Promise.reject(error);
  }
);

export default axiosCbaInstance;
