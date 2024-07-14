function StatusColor(status) {
  let statusText;

  if (status === 0) {
    statusText = " #8B0000";
  } else if (status === 1) {
    statusText = "#FED000";
  } else if (status === 2) {
    statusText = "#14985A";
  }
  return statusText;
}

export default StatusColor;
