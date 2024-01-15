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
  const timestampInMillis = parseInt(timestamp, 10);
  const dateObject = new Date(timestampInMillis);

  const options = {
    month: "short",
    day: "numeric",
  };

  return dateObject.toLocaleString("en-US", options);
}
