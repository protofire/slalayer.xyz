import { ethers } from 'ethers';

/**
 * Formats a number into a shortened form (K, M, B, T).
 * @param num A number to format.
 * @returns A formatted number in the form of a string.
 */
export const formatNumber = (num: number): string => {
  if (num >= 1.0e12) {
    return (num / 1.0e12).toFixed(2) + 'T';
  } else if (num >= 1.0e9) {
    return (num / 1.0e9).toFixed(2) + 'B';
  } else if (num >= 1.0e6) {
    return (num / 1.0e6).toFixed(2) + 'M';
  } else if (num >= 1.0e3) {
    return (num / 1.0e3).toFixed(2) + 'K';
  } else {
    return num.toFixed(2);
  }
};

/**
 * Formats ETH value from BigInt into a shortened form.
 * @param value Value in Wei.
 * @returns The formatted ETH value as a string.
 */
export const formatEtherShort = (value: bigint | number | string): string => {
  const formatted = parseFloat(ethers.formatEther(value));
  return formatNumber(formatted);
};
