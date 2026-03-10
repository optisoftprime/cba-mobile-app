import axiosCbaInstance from 'config/api';
import { routes } from 'config/backendConfig';
import { trimMessage } from 'helper';

export async function initiate(param, payload) {
  try {
    const response = await axiosCbaInstance.post(routes?.initiate, payload, { params: param });
    return { ok: true, data: response.data };
  } catch (error) {
    console.log(JSON.stringify(error, null, 2));
    return { ok: false, message: trimMessage(error?.message) };
  }
}

export async function generateOtp(param, payload) {
  try {
    const response = await axiosCbaInstance.post(routes?.generateOtp, payload, { params: param });
    return { ok: true, data: response.data };
  } catch (error) {
    console.log(JSON.stringify(error, null, 2));
    return { ok: false, message: trimMessage(error?.message) };
  }
}

export async function validateOtp(param, payload) {
  try {
    const response = await axiosCbaInstance.post(routes?.validateOtp, payload, { params: param });
    return { ok: true, data: response.data };
  } catch (error) {
    console.log(JSON.stringify(error, null, 2));
    return { ok: false, message: trimMessage(error?.message) };
  }
}

export async function register(param, payload) {
  try {
    const response = await axiosCbaInstance.post(routes?.register, payload, { params: param });
    return { ok: true, data: response.data };
  } catch (error) {
    console.log(JSON.stringify(error, null, 2));
    return { ok: false, message: trimMessage(error?.message) };
  }
}

export async function login(param, payload) {
  try {
    console.log(payload);
    const response = await axiosCbaInstance.post(routes?.login, payload, { params: param });
    return { ok: true, data: response.data };
  } catch (error) {
    console.log(JSON.stringify(error, null, 2));
    return { ok: false, message: trimMessage(error?.message) };
  }
}