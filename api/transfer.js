import axiosCbaInstance from 'config/api';
import { routes } from 'config/backendConfig';
import { trimMessage } from 'helper';

export async function validateAccountNumber(params) {
  try {
    const response = await axiosCbaInstance.get(routes?.validateAccountNumber, { params });
    return { ok: true, data: response.data };
  } catch (error) {
    console.log(JSON.stringify(error, null, 2));
    return { ok: false, message: trimMessage(error?.response?.data?.message || error?.message) };
  }
}

export async function makeInternalTransfer(params, payload) {
  try {
    const response = await axiosCbaInstance.post(routes?.makeInternalTransfer, payload, { params });
    return { ok: true, data: response.data };
  } catch (error) {
    console.log(JSON.stringify(error, null, 2));
    return { ok: false, message: trimMessage(error?.response?.data?.message || error?.message) };
  }
}
