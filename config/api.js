import axios from 'axios';
import { remove, loadSecure, removeSecure, saveSecure } from './storage';
import { baseUrl, orgKey, routes } from './backendConfig';
import { navigateReplace, useCurrentRoute } from 'app/navigate';
import Toast from 'react-native-toast-message';
import { refreshToken } from 'api/auth';

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

const axiosCbaInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
    'x-org-key': orgKey,
  },
});

// ─────────────────────────────────────────────
// Request interceptor (attach access token)
// ─────────────────────────────────────────────
axiosCbaInstance.interceptors.request.use(async (config) => {
  const auth = await loadSecure('auth');

  if (auth?.accessToken) {
    config.headers.Authorization = `Bearer ${auth.accessToken}`;
  }

  return config;
});

// ─────────────────────────────────────────────
// Response interceptor (handle refresh flow)
// ─────────────────────────────────────────────
axiosCbaInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    if ((status === 401 || status === 403) && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosCbaInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const auth = await loadSecure('auth');

        if (!auth?.refreshToken) {
          throw new Error('No refresh token found');
        }

        // ── refresh token request ──
        const refreshResponse = await refreshToken({
          refreshToken: auth.refreshToken,
        });

        // Response shape from backend:
        // { success: true, data: { token: "...", refreshToken: "...", ... }, errorCode: "200" }
        const refreshSucceeded = refreshResponse?.ok && refreshResponse?.data?.success === true;

        if (refreshSucceeded) {
          const newAccessToken = refreshResponse.data.data.token;
          const newRefreshToken = refreshResponse.data.data.refreshToken || auth.refreshToken;

          await saveSecure('auth', {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
          });

          axiosCbaInstance.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          processQueue(null, newAccessToken);

          return axiosCbaInstance(originalRequest);
        }

        throw new Error(refreshResponse?.message || 'Refresh token invalid');
      } catch (refreshError) {
        processQueue(refreshError, null);

        console.log('Refresh failed:', refreshError?.message);

        await removeSecure('auth');
        await remove('user');

        // ── Guard: don't redirect to login if we're already there ──
        // router.pathname is a string like "/login" or "/auth/login"
        // We check the axios request URL as a fallback since this file
        // is not a React component and can't call hooks directly.
        const requestUrl = originalRequest?.url ?? '';
        const isLoginRequest = requestUrl.includes('login') || requestUrl.includes('auth');

        if (!isLoginRequest) {
          Toast.show({
            type: 'error',
            text1: 'Session Expired',
            text2: 'Please login again',
          });

          navigateReplace('login');
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosCbaInstance;
