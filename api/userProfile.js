import axiosCbaInstance from 'config/api';
import { routes } from 'config/backendConfig';
import { trimMessage } from 'helper';

export async function createSupportTicket(param, payload) {
  try {
    const response = await axiosCbaInstance.post(routes?.createSupportTicket, payload, {
      params: param,
    });
    // console.log('here');
    // console.log(JSON.stringify(response, null, 2));
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

export async function deactivateUser(param, payload) {
  try {
    const response = await axiosCbaInstance.post(routes?.deactivateUser, payload, {
      params: param,
    });
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

export async function fetchNotificationPreferences(param) {
  try {
    const response = await axiosCbaInstance.get(routes?.fetchNotificationPreferences, {
      params: param,
    });
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

export async function fetchUserDetails(param) {
  try {
    const response = await axiosCbaInstance.get(routes?.fetchUserDetails, {
      params: param,
    });
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

export async function logout(param, payload) {
  try {
    const response = await axiosCbaInstance.post(routes?.logout, payload, {
      params: param,
    });
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

export async function updateUserNotificationPreferences(param, payload) {
  try {
    const response = await axiosCbaInstance.post(
      routes?.updateUserNotificationPreferences,
      payload,
      { params: param }
    );
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
