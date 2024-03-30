function PriorityColor(priority) {
  let priorityText;

  if (priority === 1) {
    priorityText = "#FED000";
  } else if (priority === 2) {
    priorityText = "#8B0000";
  } else if (priority === 3) {
    priorityText = "#8B0000";
  }
  return priorityText;
}

export default PriorityColor;
