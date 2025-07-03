export function getUniqueArray(arrayOfArrays) {
  const flattened = arrayOfArrays.flat();
  const seen = new Set();
  return flattened.filter(item => {
    const key = typeof item + JSON.stringify(item);
    return seen.has(key) ? false : seen.add(key);
  });
}
