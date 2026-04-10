// utils/helpers.js
export function trimMessage(message, maxLength = 53) {
  if (!message) return 'Something went wrong';
  const str = String(message);
  return str.length > maxLength ? str.substring(0, maxLength).trimEnd() + '...' : str;
}

export const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-NG', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

export const formatAmount = (amount) =>  `₦${Number(amount ?? 0).toLocaleString('en-NG', { minimumFractionDigits: 2 })}`;


export const formatWithCommas = (value) => {
  const digits = value.replace(/[^0-9.]/g, '');
  const parts = digits.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.length > 1 ? `${parts[0]}.${parts[1]}` : parts[0];
};

export const stripCommas = (value) => value.replace(/,/g, '');

// Deduplicate transactions by accountNumber, keep most recent per account
export function getUniqueRecipients(transactions = []) {
  const seen = new Map();
  for (const tx of transactions) {
    if (tx.accountNumber && !seen.has(tx.accountNumber)) {
      seen.set(tx.accountNumber, tx);
    }
  }
  return Array.from(seen.values());
}

// ─── Recipient Suggestion Item ────────────────────────────────────────────────

