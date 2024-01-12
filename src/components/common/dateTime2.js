export function formatDateTime(timestamp) {
  const timestampInMillis = parseInt(timestamp, 10);
  const dateObject = new Date(timestampInMillis);

  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  };

  return dateObject.toLocaleString("en-US", options);
}
