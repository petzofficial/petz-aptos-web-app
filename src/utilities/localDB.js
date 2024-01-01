"use client";
// add task
const addTask = (taskData) => {
  let storedData = getTaskData();
  storedData.push(taskData);
  localStorage.setItem("tasks", JSON.stringify(storedData));
};

// update task
const updateTask = (id, updatedTask) => {
  const storedTasks = JSON.parse((typeof window !== 'undefined' ? localStorage.getItem("tasks") : null)) || [];

  const taskIndex = storedTasks.findIndex((task) => task._id === id);

  if (taskIndex !== -1) {
    storedTasks[taskIndex] = { ...storedTasks[taskIndex], ...updatedTask };
    localStorage.setItem("tasks", JSON.stringify(storedTasks));
  }
};

// single remove
const removeFromDB = (id) => {
    const taskData = getTaskData();
    const updatedTasks = taskData.filter(task => task._id !== id);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
};

// get all task
const getTaskData = () => {
  let taskData = [];

  if (typeof window !== "undefined") {
    const storedTaskData = (typeof window !== 'undefined' ? localStorage.getItem("tasks") : null);

    if (storedTaskData) {
      taskData = JSON.parse(storedTaskData);
    }
  }

  return taskData;
};

// delete task data
const deleteTaskData = () => {
  localStorage.removeItem("tasks");
};

export { addTask, removeFromDB, getTaskData, deleteTaskData, updateTask };
