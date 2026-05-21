import axios from 'axios';
import { load, remove, loadSecure, removeSecure } from './storage';
import { baseUrl, orgKey } from './backendConfig';
import { navigateReplace } from 'app/navigate';
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

  console.log(
    `\n📤 [API REQUEST]\n` +
      `   Method  : ${config.method?.toUpperCase()}\n` +
      `   URL     : ${config.baseURL}${config.url}\n` +
      `   Token   : ${auth?.accessToken ?? 'none'}\n` +
      `   Params  : ${JSON.stringify(config.params ?? {}, null, 2)}\n` +
      `   Payload : ${JSON.stringify(config.data ?? {}, null, 2)}`
  );

  return config;
});

axiosCbaInstance.interceptors.response.use(
  (response) => {
    console.log(
      `\n✅ [API RESPONSE]\n` +
        `   Method  : ${response.config.method?.toUpperCase()}\n` +
        `   URL     : ${response.config.baseURL}${response.config.url}\n` +
        `   Status  : ${response.status}\n` +
        `   Data    : ${JSON.stringify(response.data, null, 2)}`
    );
    return response;
  },
  async (error) => {
    console.log(
      `\n❌ [API ERROR]\n` +
        `   Method  : ${error.config?.method?.toUpperCase()}\n` +
        `   URL     : ${error.config?.baseURL}${error.config?.url}\n` +
        `   Status  : ${error.response?.status ?? 'Network Error'}\n` +
        `   Message : ${JSON.stringify(error.response?.data ?? error.message, null, 2)}`
    );

    if (error.response?.status === 401 || error.response?.status === 403) {
      await removeSecure('auth');
      await remove('user');
      navigateReplace('landingScreen');
      Toast.show({ type: 'error', text1: 'Session Expired', text2: 'Login to continue' });
    }

    return Promise.reject(error);
  }
);

export default axiosCbaInstance;
