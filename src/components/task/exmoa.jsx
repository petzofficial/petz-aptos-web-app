"use client";
import GoBackBtn from "@/components/button/GoBackBtn";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Urbanist } from "next/font/google";
import { v4 as uuid } from "uuid";
import { addTask, getTaskData, updateTask } from "../../utilities/localDB";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

const urban = Urbanist({ subsets: ["latin"] });

const EditAddTask = ({ method }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const existingTaskId = searchParams.get("id");
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "",
    time: 0, // Added for time tracking
    status: "Pending", // Added for task status
  });
  const [priority, setPriority] = useState("");

  // Added energy management constants and function
  const MAX_ENERGY = 100;
  const ENERGY_RECHARGE_INTERVAL = 5 * 60 * 1000; // 5 minutes in milliseconds
  const ENERGY_CONSUMPTION_INTERVAL = 1 * 60 * 1000; // 1 minute in milliseconds

  const manageEnergy = () => {
    const userData = JSON.parse(localStorage.getItem("userData")) || {
      energy: MAX_ENERGY,
      lastRechargeTime: new Date(),
    };

    // Recharge energy every 5 minutes
    const currentTime = new Date();
    const timeSinceLastRecharge =
      currentTime - new Date(userData.lastRechargeTime);
    const energyRechargeCount = Math.floor(
      timeSinceLastRecharge / ENERGY_RECHARGE_INTERVAL
    );

    if (energyRechargeCount > 0) {
      userData.energy = Math.min(
        MAX_ENERGY,
        userData.energy + energyRechargeCount
      );
      userData.lastRechargeTime = currentTime;
      localStorage.setItem("userData", JSON.stringify(userData));
    }

    // Consume energy every 1 minute
    if (userData.energy > 0) {
      userData.energy -= 1;
      localStorage.setItem("userData", JSON.stringify(userData));
    } else {
      toast.warning("Out of energy! Please wait for a recharge.");
    }
  };

  useEffect(() => {
    const task = getTaskData().find((item) => item._id === existingTaskId);
    if (method === "edit") {
      setPriority(task.priority);
    }
    setTask(task);
  }, []);

  // Added function to distribute reward for completed tasks
  const distributeReward = (task) => {
    const completedTasks = getTaskData().filter(
      (item) => item.status === "Completed"
    );

    if (completedTasks.includes(task)) {
      const coinsEarned = task.time >= 1 ? 60 : 0; // Earn 60 coins for 1 minute or more
      // Perform the logic to distribute the coins (e.g., update user's coin balance)
      // Example: updateUserData({ coins: getUserData().coins + coinsEarned });
      toast.success(`Earned ${coinsEarned} coins for completing the task!`);
    } else {
      toast.error("Only completed tasks can claim the reward.");
    }
  };

  const handlePriority = (v) => {
    setPriority(v);
  };

  const handleAddData = async (e) => {
    try {
      e.preventDefault();
      const form = e.target;
      const workOut = form.workOut.value;
      const description = form.description.value;
      const settings = JSON.parse(localStorage.getItem("settings"));

      const unique_id = method === "edit" ? existingTaskId : uuid();

      const currentDate = new Date();
      const options = { day: "numeric", month: "short", year: "numeric" };
      const formattedDate = currentDate.toLocaleDateString("en-GB", options);

      const addObj = {
        title: workOut,
        time: task.time || 0, // Initialize time for new tasks
        color: "#8B0000",
        description: description,
        priority: priority,
        date: formattedDate,
        status: "Pending",
        _id: unique_id,
        check: settings?.check,
        focusTime: settings?.focusTime || 25,
        shortBreak: settings?.shortBreak || 5,
        longBreak: settings?.longBreak || 15,
        currentCycleCount: settings?.currentCycleCount || 1,
      };

      if (!addObj || !addObj.title || !addObj.description || !addObj.priority) {
        return false;
      }

      if (method === "edit") {
        if (task) {
          await updateTask(existingTaskId, addObj);
          distributeReward(addObj);
          router.push("/task", { scroll: true });
          toast.success("Task Updated");
        }
      } else {
        await addTask(addObj);
        distributeReward(addObj);
        router.push("/task", { scroll: true });
        toast.success("Task Added");
      }

      form.workOut.value = "";
      form.description.value = "";
      setPriority("");
    } catch (error) {
      console.error("An error occurred:", error);
      console.error("Error stack trace:", error.stack);
      // Display a user-friendly error message or handle the error appropriately
      alert("An error occurred while processing the task. Please try again.");
    }
  };
  return (
    <section className="task-edit">
      <div className="addconatiner 2xl:px-5 lg:px-14 md:px-10 sm:px-6 max-sm:px-3">
        <div className="back-button">
          <Link href={"/"} className="text-[30px] font-bold">
            <GoBackBtn />
          </Link>
        </div>
        <div className="task-edit-inner mt-[-40px]">
          <h2>
            {method === "edit" ? "Edit Task" : ""}
            {method === "add" ? "New Task" : ""}
          </h2>
          <form
            onSubmit={handleAddData}
            className={typeof window !== "undefined" && urban.className}
            action="#"
            method="post"
          >
            <h4>Task Name</h4>
            <input
              type="text"
              name="workOut"
              placeholder="WorkOut"
              defaultValue={task ? task.title : ""}
            />
            <p>Task Priority</p>
            <div className="task-lvl-btn">
              <button
                type="button"
                onClick={() => {
                  handlePriority("High");
                }}
                className={priority === "High" ? "selected" : ""}
              >
                High
              </button>
              <button
                type="button"
                onClick={() => {
                  handlePriority("Medium");
                }}
                className={priority === "Medium" ? "selected" : ""}
              >
                Medium
              </button>
              <button
                type="button"
                onClick={() => {
                  handlePriority("Low");
                }}
                className={priority === "Low" ? "selected" : ""}
              >
                Low
              </button>
            </div>
            <h4>Task Description</h4>
            <textarea
              className="h-[152px]"
              name="description"
              rows="10"
              placeholder="Add Task Description"
              defaultValue={task ? task.description : ""}
            ></textarea>

            <button type="submit" id="submitBtn" className="submit-btn">
              {method === "edit" ? "Update Task" : ""}
              {method === "add" ? "Add New Task" : ""}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditAddTask;
