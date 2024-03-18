// Assuming item is a prop passed to a functional component

function PriorityComponent(priority) {
  //   console.log(item);
  let priorityText;
  console.log(priority);

  if (priority === 1) {
    priorityText = "High";
  } else if (priority === 2) {
    priorityText = "Medium";
  } else if (priority === 3) {
    priorityText = "Low";
  } else {
    priorityText = "Unknown"; // Handle any other cases if necessary
  }

  return (
    <div>
      <p>{priorityText}</p>
    </div>
  );
}

export default PriorityComponent;
