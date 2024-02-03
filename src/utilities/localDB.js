"use client";

// Function to get user data from localStorage
const getUserData = () => {
  // Check if localStorage is available
  if (typeof window !== "undefined" && window.localStorage) {
    const storedUserData = localStorage.getItem("userData");
    return storedUserData ? JSON.parse(storedUserData) : {};
  } else {
    // Handle the case when localStorage is not available (e.g., server-side rendering)
    console.warn("localStorage is not available.");
    // You might want to implement an alternative mechanism or return default data
    return {};
  }
};

// Function to save user data to localStorage
const saveUserData = (userData) => {
  if (typeof window !== "undefined" && window.localStorage) {
    localStorage.setItem("userData", JSON.stringify(userData));
  } else {
    console.warn("localStorage is not available.");
  }
};

// User data (assuming it's stored somewhere)
let userData = getUserData();

// Function to handle energy recharge
const rechargeEnergy = () => {
  if (userData.energy < 100) {
    userData.energy += 1;
    saveUserData(userData); // Save updated user data
  }
};

// Function to consume energy for a task
const consumeEnergy = () => {
  if (userData.energy > 0) {
    userData.energy -= 1;
    saveUserData(userData); // Save updated user data
    return true; // Energy consumed successfully
  }
  return false; // Not enough energy
};

console.log(`Current energy: ${userData.energy}`);
// add task
const addTask = (taskData) => {
  if (typeof window !== "undefined" && window.localStorage) {
    let storedData = getTaskData();
    storedData.push(taskData);
    localStorage.setItem("tasks", JSON.stringify(storedData));
  } else {
    console.warn("localStorage is not available.");
  }
};

// update task
const updateTask = (id, updatedTask) => {
  const storedTasks =
    JSON.parse(
      typeof window !== "undefined" ? localStorage.getItem("tasks") : null
    ) || [];

  const taskIndex = storedTasks.findIndex((task) => task._id === id);

  if (taskIndex !== -1) {
    storedTasks[taskIndex] = { ...storedTasks[taskIndex], ...updatedTask };
    localStorage.setItem("tasks", JSON.stringify(storedTasks));
  }
};

// single remove
const removeFromDB = (id) => {
  if (typeof window !== "undefined" && window.localStorage) {
    const taskData = getTaskData();
    const updatedTasks = taskData.filter((task) => task._id !== id);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  } else {
    console.warn("localStorage is not available.");
  }
};

// get all task
const getTaskData = () => {
  let taskData = [];

  if (typeof window !== "undefined") {
    const storedTaskData =
      typeof window !== "undefined" ? localStorage.getItem("tasks") : null;

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

export {
  addTask,
  removeFromDB,
  getTaskData,
  deleteTaskData,
  updateTask,
  getUserData,
  saveUserData,
  rechargeEnergy,
  consumeEnergy,
};
