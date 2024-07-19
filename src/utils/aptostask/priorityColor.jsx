function StatusColor(status) {
  let statusText;

  if (status === 0) {
    // 0 make it pending
    statusText = " #8B0000";
  } else if (status === 1) {
    // make it In Progress
    statusText = "#FED000";
  } else if (status === 2) {
    // make this completed
    statusText = "#14985A";
  }
  return statusText;
}

export default StatusColor;
