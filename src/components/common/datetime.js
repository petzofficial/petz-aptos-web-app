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
