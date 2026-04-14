export const formatNumber = (num) => {
  if (!num && num !== 0) return "";
  return Number(num).toLocaleString();
};