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
