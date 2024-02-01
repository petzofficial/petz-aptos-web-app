export const truncateString = (str, numWords) => {
  const words = str?.split(" ");
  const truncatedWords = words?.slice(0, numWords)?.join(" ");
  return words?.length > numWords ? `${truncatedWords} ...` : truncatedWords;
};
export const shortenString = (inputString) => {
  if (inputString?.length <= 9) {
    return inputString;
  } else {
    return (
      inputString?.substring(0, 5) +
      "..." +
      inputString?.substring(inputString?.length - 4)
    );
  }
};
export function showFirstTenWords(text) {
  // Split the text into an array of words
  const words = text?.split(/\s+/);

  // Take the first 10 words and join them back into a string
  const shortenedText = words?.slice(0, 10)?.join(" ");

  return shortenedText;
}
