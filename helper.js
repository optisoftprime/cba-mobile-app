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

export const formatAmount = (amount) =>
  `₦${Number(amount ?? 0).toLocaleString('en-NG', { minimumFractionDigits: 2 })}`;

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

// Converts TIER_2 → "Tier 2 Account"
export function formatTier(tier) {
  if (!tier) return 'Tier 1 Account';
  const match = tier?.toString()?.match(/\d+/);
  return match ? `Tier ${match[0]} Account` : 'Tier 1 Account';
}

// Returns "Upgrade to Tier X" or null if already at max tier (3)
export function getUpgradeLabel(tier) {
  const match = tier?.toString()?.match(/\d+/);
  if (!match) return 'Upgrade to Tier 2';
  const current = parseInt(match[0], 10);
  if (current >= 3) return null;
  return `Upgrade to Tier ${current + 1}`;
}