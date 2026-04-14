export const baseUrl = 'https://gateway.ezoneapps.com:30002/ezone-cba-mobile';
export const orgKey = 'ORG-1728290007232';

export const routes = {
  // Auth
  initiate: '/api/v1/auth/onboarding/initiate',
  generateOtp: '/api/v1/auth/onboarding/otp/generate',
  validateOtp: '/api/v1/auth/onboarding/otp/validate',
  register: '/api/v1/auth/onboarding/register',
  login: '/api/v1/auth/login',
  passwordResetRequest: '/api/v1/auth/password-reset/request',
  passwordResetConfirm: '/api/v1/auth/password-reset/confirm',

  // Security
  getSecurityQuestions: '/api/v1/auth/security-question',
  setSecurityQuestions: '/api/v1/auth/set-security-questions',
  setupTransactionPin: '/api/v1/auth/setup-transaction-pin',
  resetTransactionPin: '/api/v1/auth/transaction-pin/reset',
  validateSecurityQuestion: '/api/v1/auth/validate-security-question',

  // Account
  accountSetup: '/api/v1/account/account-setup',
  allUserAccounts: '/api/v1/account/all-user-accounts',

  // Dashboard
  dashboard: '/api/v1/dashboard',

  // Loan
  fetchAllOrgLoanProducts: '/api/v1/loanProduct/fetch-all-org-loan-product',
  loanBooking: '/api/v1/loan/loan-booking',
  myLoans: '/api/v1/loan/my-loans',

  // Internal Transfer
  validateAccountNumber: '/api/v1/internal-transfer/validate-account-number',
  makeInternalTransfer: '/api/v1/internal-transfer/make-transfer',

  // Savings
  bookSavingProduct: '/api/v1/saving-product-booking',
  allSavingProducts: '/api/v1/saving-product-booking/all-saving-products',
  userSavingTransactions: '/api/v1/saving-product-booking/user-saving-transactions',
};
