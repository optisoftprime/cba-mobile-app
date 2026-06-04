import { navigateReplace } from 'app/navigate';
import axiosCbaInstance from 'config/api';
import { routes } from 'config/backendConfig';
import { trimMessage } from 'helper';

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
    const response = await axiosCbaInstance.get(routes?.downloadStatement, { params });
    return { ok: true, data: response.data };
  } catch (error) {
    console.log(JSON.stringify(error, null, 2));
    return { ok: false, message: trimMessage(error?.response?.data?.message || error?.message) };
  }
}