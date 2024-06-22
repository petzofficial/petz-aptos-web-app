// Assuming item is a prop passed to a functional component

function StatusComponent(status) {
  //   console.log(item);
  let statusText;
  console.log(status);

  if (status === 0) {
    statusText = "Pending";
  } else if (status === 1) {
    statusText = "In Progress";
  } else if (status === 2) {
    statusText = "Completed";
  } else {
    statusText = "Unknown"; // Handle any other cases if necessary
  }

  return (
    <div>
      <p>{statusText}</p>
    </div>
  );
}

export default StatusComponent;
