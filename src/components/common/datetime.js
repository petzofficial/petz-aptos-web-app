export const getFormattedDateTime = (timestamp) => {
  const date = new Date(timestamp * 1000);

  const optionsDate = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  const formattedDate = date.toLocaleDateString(undefined, optionsDate);

  const optionsTime = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };
  const formattedTime = date.toLocaleTimeString([], optionsTime);

  return { formattedDate, formattedTime };
};

export const formatTimestamp = (timestamp) => {
  const microsecondsPerMillisecond = BigInt(1000);
  const timestampAsBigInt = BigInt(timestamp);
  const milliseconds = timestampAsBigInt / microsecondsPerMillisecond;

  const date = new Date(Number(milliseconds));
  const formattedDate = `${date.getFullYear()}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} 
    ${String(date.getHours()).padStart(2, "0")}:${String(
    date.getMinutes()
  ).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;

  return formattedDate;
};
export function formatDateTime2(timestamp) {
  const timestampInMillis = timestamp / 1000;
  const dateObject = new Date(timestampInMillis);

  const options = {
    month: "short",
    day: "numeric",
  };

  return dateObject.toLocaleString("en-US", options);
}

export function formatDateTime3(timestamp) {
  const timestampInMillis = timestamp / 1000;
  const dateObject = new Date(timestampInMillis);

  const options = {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  return dateObject.toLocaleString("en-US", options);
}
