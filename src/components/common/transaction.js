export const calculateGasFee = (gasUnitPrice, gasUnits) => {
  const gasFee = gasUnitPrice * gasUnits;
  return gasFee;
};
export function calculateInverseWithDecimals(number, decimals) {
  if (isNaN(number) || isNaN(decimals) || decimals < 0) {
    return "Invalid input";
  }
  const result = 1 / number;
  const roundedResult = result.toFixed(decimals);

  return parseFloat(roundedResult);
}

const inputNumber = 10000;
const numberOfDecimals = 8;
const output = calculateInverseWithDecimals(inputNumber, numberOfDecimals);
console.log(output); // Output: 0.0001
