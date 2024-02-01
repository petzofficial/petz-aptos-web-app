"use client";
export const shortenString = (inputString: string) => {
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

export const formatTimestamp = (timestamp?: string) => {
  if (timestamp === undefined) {
    return "Timestamp is undefined";
  }

  const microsecondsPerMillisecond = BigInt(1000);
  const timestampAsBigInt = BigInt(timestamp);
  const milliseconds = timestampAsBigInt / microsecondsPerMillisecond;

  const date = new Date(Number(milliseconds));
  const formattedDate = `${date.getFullYear()}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(
    date.getHours()
  ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(
    date.getSeconds()
  ).padStart(2, "0")}`;

  return formattedDate;
};

export const formatedExpirationTime = (expirationTime: any) => {
  const output = new Date(expirationTime * 1000);
  return output;
};
export const convertToDecimal = (value: number | string) => {
  if (typeof value === "string") {
    if (value?.includes(".")) {
      return value;
    } else {
      return value?.slice(0, 1) + "." + value?.slice(1);
    }
  } else if (typeof value === "number" && !Number?.isInteger(value)) {
    return value;
  } else {
    const stringValue = value?.toString();
    const updatedValueStr =
      stringValue?.slice(0, 1) + "." + stringValue?.slice(1);
    return parseFloat(updatedValueStr);
  }
};

export const convertToOctal = (value: any) => {
  const convertedValue = value / 100000000;
  return convertedValue;
};

export const calculateGasFee = (gasUnitPrice: any, gasUnits: any) => {
  const gasFee = gasUnitPrice * gasUnits;
  return gasFee;
};

// ***********Checks if there is a url or not*****************
export const isValidUrl = (urlString: string) => {
  var inputElement = document.createElement("input");
  inputElement.type = "url";
  inputElement.value = urlString;

  if (!inputElement.checkValidity()) {
    return false;
  } else {
    return true;
  }
};
