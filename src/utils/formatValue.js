export function formatNumber(num) {
  if (num >= 0) {
    if (num >= 10000000) {
      return (num / 10000000).toFixed(1) + "Cr";
    } else if (num >= 100000) {
      return (num / 100000).toFixed(1) + "L";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    } else if (!num) {
      return "0";
    }
  } else {
    let num1 = num * -1;
    if (num1 >= 10000000) {
      return -1 * (num1 / 10000000).toFixed(1) + "Cr";
    } else if (num1 >= 100000) {
      return -1 * (num1 / 100000).toFixed(1) + "L";
    } else if (num1 >= 1000) {
      return -1 * (num1 / 1000).toFixed(1) + "K";
    } else if (!num1) {
      return "0";
    }
  }
  return num.toString();
}
