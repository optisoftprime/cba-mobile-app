// utils/helpers.js
export function trimMessage(message, maxLength = 50) {
  if (!message) return 'Something went wrong';
  const str = String(message);
  return str.length > maxLength ? str.substring(0, maxLength).trimEnd() + '...' : str;
}