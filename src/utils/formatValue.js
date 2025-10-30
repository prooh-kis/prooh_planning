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
  return Number(num).toFixed(0);
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


export function calculateAspectRatio(resolution) {
  if (!resolution) {
    return 'Unknown';
  }

  // Handle cases where resolution might be null, undefined, or empty
  if (typeof resolution !== 'string') {
    console.warn('Invalid resolution format. Expected string, got:', typeof resolution, resolution);
    return 'Unknown';
  }

  // Clean the resolution string - remove any whitespace and convert to lowercase
  const cleanResolution = resolution.trim().toLowerCase();
  
  // Handle common resolution formats
  let width, height;
  
  // Case 1: Standard "widthxheight" format
  if (cleanResolution.includes('x')) {
    const parts = cleanResolution.split('x');
    if (parts.length !== 2) {
      console.warn('Invalid resolution format. Expected "widthxheight":', resolution);
      return 'Unknown';
    }
    
    width = parseInt(parts[0], 10);
    height = parseInt(parts[1], 10);
  }
  // Case 2: Handle other common separators
  else if (cleanResolution.includes('*')) {
    const parts = cleanResolution.split('*');
    if (parts.length !== 2) {
      console.warn('Invalid resolution format. Expected "width*height":', resolution);
      return 'Unknown';
    }
    
    width = parseInt(parts[0], 10);
    height = parseInt(parts[1], 10);
  }
  // Case 3: Handle "width x height" with spaces
  else if (cleanResolution.includes(' x ')) {
    const parts = cleanResolution.split(' x ');
    if (parts.length !== 2) {
      console.warn('Invalid resolution format. Expected "width x height":', resolution);
      return 'Unknown';
    }
    
    width = parseInt(parts[0], 10);
    height = parseInt(parts[1], 10);
  }
  // Case 4: Unknown format
  else {
    console.warn('Unknown resolution format:', resolution);
    return 'Unknown';
  }

  // Validate parsed numbers
  if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
    console.warn('Invalid resolution values. Both width and height must be positive numbers:', resolution);
    return 'Unknown';
  }

  try {
    // Calculate greatest common divisor (GCD) using Euclidean algorithm
    const gcd = (a, b) => {
      a = Math.abs(a);
      b = Math.abs(b);
      return b === 0 ? a : gcd(b, a % b);
    };
    
    const divisor = gcd(width, height);

    // Calculate simplified ratio
    const ratioWidth = width / divisor;
    const ratioHeight = height / divisor;

    // Handle special cases and common ratios
    const commonRatios = {
      '1:1': '1:1',
      '4:3': '4:3',
      '16:9': '16:9',
      '16:10': '16:10',
      '21:9': '21:9',
      '32:9': '32:9'
    };

    const calculatedRatio = `${ratioWidth}:${ratioHeight}`;
    
    // Return common ratio name if it matches a standard
    return commonRatios[calculatedRatio] || calculatedRatio;
    
  } catch (error) {
    console.warn('Error calculating aspect ratio for resolution:', resolution, error);
    return 'Unknown';
  }
}

export const formattedINR = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0, // Remove decimal places
  }).format(amount);

export const getNameFromEmailLetters = (email) => {
  if (!email) return '';
  
  // Split at @ and take the first part
  const localPart = email.split('@')[0] || '';
  
  // Replace dots, underscores, and numbers with spaces
  let name = localPart.replace(/[._0-9]/g, ' ');
  
  // Capitalize first letter of each word
  name = name.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
    .trim();
  
  // Return the first word
  return name.split(' ')[0];
}