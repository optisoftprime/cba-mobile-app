import { navigateReplace } from 'app/navigate';
import axiosCbaInstance from 'config/api';
import { baseUrl, orgKey, routes } from 'config/backendConfig';
import { loadSecure, remove, removeSecure } from 'config/storage';
import { trimMessage } from 'helper';
import Toast from 'react-native-toast-message';

export async function getTransactionHistory(params) {
  try {
    const response = await axiosCbaInstance.get(routes?.transactionHistory, { params });
    return { ok: true, data: response.data };
  } catch (error) {
    console.log(JSON.stringify(error, null, 2));
    return { ok: false, message: trimMessage(error?.response?.data?.message || error?.message) };
  }
}

export async function downloadStatement(params) {
  try {
    const auth = await loadSecure('auth');

    // Build query string from params object
    const queryString =
      params && Object.keys(params).length > 0 ? '?' + new URLSearchParams(params).toString() : '';

    const response = await fetch(`${baseUrl}${routes?.downloadStatement}${queryString}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-org-key': orgKey,
        ...(auth?.accessToken && {
          Authorization: `Bearer ${auth.accessToken}`,
        }),
      },
    });

    if (response.status === 401 || response.status === 403) {
      await removeSecure('auth');
      await remove('user');
      Toast.show({
        type: 'error',
        text1: 'Session Expired',
        text2: 'Please login again',
      });
      navigateReplace('login');
      return { ok: false, message: 'Session expired' };
    }

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      return { ok: false, message: trimMessage(errData?.message || 'Download failed') };
    }

    // Get raw binary as ArrayBuffer — avoids any string encoding corruption
    const arrayBuffer = await response.arrayBuffer();

    // Convert ArrayBuffer → base64 string safely
    const uint8Array = new Uint8Array(arrayBuffer);
    let binary = '';
    for (let i = 0; i < uint8Array.length; i++) {
      binary += String.fromCharCode(uint8Array[i]);
    }
    const base64 = btoa(binary);

    return { ok: true, data: base64 };
  } catch (error) {
    console.log(JSON.stringify(error?.message, null, 2));
    return { ok: false, message: trimMessage(error?.message) };
  }
}
