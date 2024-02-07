"use client";

// Function to get user data from localStorage
const getUserData = () => {
  let userData = {};

  if (typeof window !== "undefined") {
    const storedUserData =
      typeof window !== "undefined" ? localStorage.getItem("userData") : null;

    if (storedUserData) {
      userData = JSON.parse(storedUserData);
    }
  }

  return userData;
};

const saveUserData = (userData) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("userData", JSON.stringify(userData));
  }
};
let userData = getUserData();
const updateUserData = (updates) => {
  if (typeof window !== "undefined") {
    let currentUserData = getUserData();
    currentUserData = { ...currentUserData, ...updates };
    saveUserData(currentUserData);
  }
};

const rechargeEnergy = () => {
  const userData = getUserData();

  if (typeof window !== "undefined") {
    if (userData.energy < 100) {
      userData.energy += 1;
      saveUserData(userData); // Save updated user data
    }
  }
};

// Set interval to recharge energy every 5 minutes
const rechargeInterval = setInterval(rechargeEnergy, 5 * 60 * 1000); // 5 minutes in milliseconds

// Clear the interval if energy reaches maximum
if (userData.energy >= 100) {
  clearInterval(rechargeInterval);
}
// Function to consume energy for a task
const consumeEnergy = () => {
  if (typeof window !== "undefined") {
    if (userData.energy > 0) {
      userData.energy -= 1;
      saveUserData(userData); // Save updated user data
      return true; // Energy consumed successfully
    }
    return false; // Not enough energy
  }
};

// console.log(`Current energy: ${userData.energy}`);
// add task
const addTask = (taskData) => {
  let storedData = getTaskData();
  storedData.push(taskData);
  localStorage.setItem("tasks", JSON.stringify(storedData));
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
  const taskData = getTaskData();
  const updatedTasks = taskData.filter((task) => task._id !== id);
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
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
  updateUserData,
};
