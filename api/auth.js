import axiosCbaInstance from 'config/api';
import { baseUrl, orgKey, routes } from 'config/backendConfig';
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

    const url = new URL(`${baseUrl}${routes?.login}`);
    if (param) {
      Object.entries(param).forEach(([key, value]) => url.searchParams.append(key, value));
    }

    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-org-key': orgKey,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      console.log(JSON.stringify(data?.message || data, null, 2));
      return { ok: false, message: trimMessage(data?.message || 'Something went wrong') };
    }

    return { ok: true, data };
  } catch (error) {
    console.log(JSON.stringify(error?.message, null, 2));
    return { ok: false, message: trimMessage(error?.message) };
  }
}

export async function getSecurityQuestions(param) {
  try {
    const response = await axiosCbaInstance.get(
      routes?.getSecurityQuestions,
      { params: param },
      {
        headers: {
          username: param?.username,
        },
      }
    );

    return { ok: true, data: response.data };
  } catch (error) {
    console.log(JSON.stringify(error, null, 2));

    return {
      ok: false,
      message: trimMessage(error?.response?.data?.message || error?.message),
    };
  }
}

export async function setSecurityQuestions(username, payload) {
  try {
    const response = await axiosCbaInstance.post(routes?.setSecurityQuestions, payload, {
      headers: { username },
    });
    return { ok: true, data: response.data };
  } catch (error) {
    console.log(JSON.stringify(error, null, 2));
    return { ok: false, message: trimMessage(error?.response?.data?.message || error?.message) };
  }
}

export async function setupTransactionPin(username, payload) {
  try {
    const response = await axiosCbaInstance.post(routes?.setupTransactionPin, payload, {
      headers: { username },
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

export async function accountSetup(payload) {
  try {
    const response = await axiosCbaInstance.post(routes?.accountSetup, payload);
    return { ok: true, data: response.data };
  } catch (error) {
    console.log(JSON.stringify(error, null, 2));
    return { ok: false, message: trimMessage(error?.response?.data?.message || error?.message) };
  }
}
