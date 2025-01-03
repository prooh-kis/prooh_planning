export function formatNumber(num) {
  if (num >= 100000) {
    return (num / 100000).toFixed(1) + "L";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  } else if (num >= 10000000) {
    return (num / 10000000).toFixed(1) + "Cr";
  } else if (!num) {
    return "0";
  }
  return num.toString();
}
