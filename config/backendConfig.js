// export const baseUrl = 'https://gateway.ezoneapps.com:30002/ezone-cba-mobile';
// export const orgKey = 'ORG-1728290007232';

// export const routes = {
//   initiate: '/api/v1/auth/onboarding/initiate',
//   generateOtp: '/api/v1/auth/onboarding/otp/generate',
//   validateOtp: '/api/v1/auth/onboarding/otp/validate',
//   register: '/api/v1/auth/onboarding/register',
//   login: '/api/v1/auth/login',
//   getSecurityQuestions: '/api/v1/auth/security-question',
//   setSecurityQuestions: '/api/v1/auth/set-security-questions',
//   setupTransactionPin: '/api/v1/auth/setup-transaction-pin',
//   resetTransactionPin: '/api/v1/auth/transaction-pin/reset',
//   validateSecurityQuestion: '/api/v1/auth/validate-security-question',
// };

export const baseUrl = 'https://gateway.ezoneapps.com:30002/ezone-cba-mobile';
export const orgKey = 'ORG-1728290007232';

export const routes = {
  initiate: '/api/v1/auth/onboarding/initiate',
  generateOtp: '/api/v1/auth/onboarding/otp/generate',
  validateOtp: '/api/v1/auth/onboarding/otp/validate',
  register: '/api/v1/auth/onboarding/register',
  login: '/api/v1/auth/login',
  getSecurityQuestions: '/api/v1/auth/security-question',
  setSecurityQuestions: '/api/v1/auth/set-security-questions',
  setupTransactionPin: '/api/v1/auth/setup-transaction-pin',
  resetTransactionPin: '/api/v1/auth/transaction-pin/reset',
  validateSecurityQuestion: '/api/v1/auth/validate-security-question',

  // Account
  accountSetup: '/api/v1/account/account-setup',

  // Loan
  fetchAllOrgLoanProducts: '/api/v1/loanProduct/fetch-all-org-loan-product',
  loanBooking: '/api/v1/loan/loan-booking',
  myLoans: '/api/v1/loan/my-loans',

  // Dashboard
  dashboard: '/api/v1/dashboard',

  // Internal Transfer
  validateAccountNumber: '/api/v1/internal-transfer/validate-account-number',
  makeInternalTransfer: '/api/v1/internal-transfer/make-transfer',
};
