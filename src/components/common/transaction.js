export const calculateGasFee = (gasUnitPrice, gasUnits) => {
  const gasFee = gasUnitPrice * gasUnits;
  return gasFee;
};
