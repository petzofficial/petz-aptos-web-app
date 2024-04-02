function StatusColor(status) {
  let statusText;

  if (status === "Pending") {
    statusText = "#FED000";
  } else if (status === "In Progress") {
    statusText = "#8B0000";
  } else if (status === "Completed") {
    statusText = "#14985A";
  }
  return statusText;
}

export default StatusColor;
