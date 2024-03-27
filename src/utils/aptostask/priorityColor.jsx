// Assuming item is a prop passed to a functional component

function PriorityColor(priority) {
  //   console.log(item);
  let priorityText;
  console.log(priority);

  if (priority === 1) {
    priorityText = "#FED000";
  } else if (priority === 2) {
    priorityText = "#8B0000";
  } else if (priority === 3) {
    priorityText = "#8B0000";
  }
  console.log("this is from priority text");
  console.log(priorityText);
  return priorityText;
}

export default PriorityColor;
