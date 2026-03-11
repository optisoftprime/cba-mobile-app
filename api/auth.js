import axiosCbaInstance from 'config/api';
import { routes } from 'config/backendConfig';
import { trimMessage } from 'helper';

export async function initiate(param, payload) {
  try {
    const response = await axiosCbaInstance.post(routes?.initiate, payload, { params: param });
    return { ok: true, data: response.data };
  } catch (error) {
    console.log(
      JSON.stringify(
        error?.response?.data || error?.response?.data?.message || error?.message,
        null,
        2
      )
    );
    return { ok: false, message: trimMessage(error?.response?.data?.message || error?.message) };
  }
}

export async function generateOtp(param, payload) {
  try {
    const response = await axiosCbaInstance.post(routes?.generateOtp, payload, { params: param });
    return { ok: true, data: response.data };
  } catch (error) {
    console.log(
      JSON.stringify(
        error?.response?.data || error?.response?.data?.message || error?.message,
        null,
        2
      )
    );
    return { ok: false, message: trimMessage(error?.response?.data?.message || error?.message) };
  }
}

export async function validateOtp(param, payload) {
  try {
    const response = await axiosCbaInstance.post(routes?.validateOtp, payload, { params: param });
    return { ok: true, data: response.data };
  } catch (error) {
    console.log(
      JSON.stringify(
        error?.response?.data || error?.response?.data?.message || error?.message,
        null,
        2
      )
    );
    return { ok: false, message: trimMessage(error?.response?.data?.message || error?.message) };
  }
}

export async function register(param, payload) {
  try {
    const response = await axiosCbaInstance.post(routes?.register, payload, { params: param });
    return { ok: true, data: response.data };
  } catch (error) {
    console.log(
      JSON.stringify(
        error?.response?.data || error?.response?.data?.message || error?.message,
        null,
        2
      )
    );
    return { ok: false, message: trimMessage(error?.response?.data?.message || error?.message) };
  }
}

export async function login(param, payload) {
  try {
    console.log(payload);
    const response = await axiosCbaInstance.post(routes?.login, payload, { params: param });
    return { ok: true, data: response.data };
  } catch (error) {
    console.log(
      JSON.stringify(
        error?.response?.data || error?.response?.data?.message || error?.message,
        null,
        2
      )
    );
    return { ok: false, message: trimMessage(error?.response?.data?.message || error?.message) };
  }
}

export async function getSecurityQuestions(param) {
  try {
    const response = await axiosCbaInstance.get(routes?.getSecurityQuestions, {params:param},{
      headers: {
        username: param?.username,
      },
    });

    return { ok: true, data: response.data };
  } catch (error) {
    console.log(JSON.stringify(error, null, 2));

    return {
      ok: false,
      message: trimMessage(error?.response?.data?.message || error?.message),
    };
  }
}

export async function setSecurityQuestions(param, payload) {
  try {
    const response = await axiosCbaInstance.post(routes?.setSecurityQuestions, payload, {
      params: param,
    });
    return { ok: true, data: response.data };
  } catch (error) {
    console.log(JSON.stringify(error, null, 2));
    return { ok: false, message: trimMessage(error?.response?.data?.message || error?.message) };
  }
}

export async function setupTransactionPin(param, payload) {
  try {
    const response = await axiosCbaInstance.post(routes?.setupTransactionPin, payload, {
      params: param,
    });
    return { ok: true, data: response.data };
  } catch (error) {
    console.log(JSON.stringify(error, null, 2));
    return { ok: false, message: trimMessage(error?.response?.data?.message || error?.message) };
  }
}

export async function resetTransactionPin(param, payload) {
  try {
    const response = await axiosCbaInstance.post(routes?.resetTransactionPin, payload, {
      params: param,
    });
    return { ok: true, data: response.data };
  } catch (error) {
    console.log(JSON.stringify(error, null, 2));
    return { ok: false, message: trimMessage(error?.response?.data?.message || error?.message) };
  }
}

export async function validateSecurityQuestion(param, payload) {
  try {
    const response = await axiosCbaInstance.post(routes?.validateSecurityQuestion, payload, {
      params: param,
    });
    return { ok: true, data: response.data };
  } catch (error) {
    console.log(JSON.stringify(error, null, 2));
    return { ok: false, message: trimMessage(error?.response?.data?.message || error?.message) };
  }
}
