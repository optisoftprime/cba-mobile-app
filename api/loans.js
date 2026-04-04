import axiosCbaInstance from 'config/api';
import { routes } from 'config/backendConfig';
import { trimMessage } from 'helper';

export async function fetchAllLoanProducts() {
  try {
    const response = await axiosCbaInstance.get(routes?.fetchAllOrgLoanProducts);
    return { ok: true, data: response.data };
  } catch (error) {
    console.log(JSON.stringify(error, null, 2));
    return { ok: false, message: trimMessage(error?.response?.data?.message || error?.message) };
  }
}

export async function bookLoan(payload) {
  try {
    const response = await axiosCbaInstance.post(routes?.loanBooking, payload);
    return { ok: true, data: response.data };
  } catch (error) {
    console.log(JSON.stringify(error, null, 2));
    return { ok: false, message: trimMessage(error?.response?.data?.message || error?.message) };
  }
}

export async function getMyLoans() {
  try {
    const response = await axiosCbaInstance.get(routes?.myLoans);
    return { ok: true, data: response.data };
  } catch (error) {
    console.log(JSON.stringify(error, null, 2));
    return { ok: false, message: trimMessage(error?.response?.data?.message || error?.message) };
  }
}