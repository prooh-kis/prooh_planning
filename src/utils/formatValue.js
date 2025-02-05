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

export function numberToWords(num) {
  if (num === 0) return "zero";

  const belowTwenty = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", 
                        "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", 
                        "eighteen", "nineteen"];

  const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

  const units = ["", "thousand", "lakh", "crore", "arab", "kharab"];

  function helper(n) {
      if (n === 0) return "";
      else if (n < 20) return belowTwenty[n] + " ";
      else if (n < 100) return tens[Math.floor(n / 10)] + " " + helper(n % 10);
      else return belowTwenty[Math.floor(n / 100)] + " hundred " + (n % 100 !== 0 ? "and " + helper(n % 100) : "");
  }

  let result = "";
  let i = 0;
  let divisor = [1000, 100, 100, 100, 100]; // Indian system grouping

  while (num > 0) {
      let part = num % divisor[i];
      if (part !== 0) {
          result = helper(part) + units[i] + " " + result;
      }
      num = Math.floor(num / divisor[i]);
      i++;
  }

  return result.trim();
}
