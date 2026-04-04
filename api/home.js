import axiosCbaInstance from 'config/api';
import { baseUrl, orgKey, routes } from 'config/backendConfig';
import { trimMessage } from 'helper';

export async function getDashBoardData() {
  try {
    const response = await axiosCbaInstance.get(routes?.dashboard);
    return { ok: true, data: response.data };
  } catch (error) {
    console.log(JSON.stringify(error, null, 2));
    return { ok: false, message: trimMessage(error?.response?.data?.message || error?.message) };
  }
}
