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
};
