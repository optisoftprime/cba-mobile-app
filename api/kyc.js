import axiosCbaInstance from 'config/api';
import { routes } from 'config/backendConfig';
import { trimMessage } from 'helper';

export async function fetchAllKycTiers(param) {
  try {
    const response = await axiosCbaInstance.get(routes?.fetchAllKycTiers, { params: param });
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

export async function kycUpgradeRequest(param, payload) {
  try {
    const response = await axiosCbaInstance.post(routes?.kycUpgradeRequest, payload, {
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
