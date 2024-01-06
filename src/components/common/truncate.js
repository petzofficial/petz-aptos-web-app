export const truncateString = (str, numWords) => {
  const words = str.split(" ");
  const truncatedWords = words.slice(0, numWords).join(" ");
  return words.length > numWords ? `${truncatedWords} ...` : truncatedWords;
};
