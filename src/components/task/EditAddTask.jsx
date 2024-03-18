"use client";
import GoBackBtn from "@/components/button/GoBackBtn";
import Link from "next/link";
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";

import { useWallet } from "@aptos-labs/wallet-adapter-react";
import React, { useContext, useEffect, useState } from "react";
import { Urbanist } from "next/font/google";
import { v4 as uuid } from "uuid";
import { TaskContext } from "@/app/task/context/taskContext";
import { addTask, getTaskData, updateTask } from "../../utils/localDB";
import { useRouter, useSearchParams } from "next/navigation";
import { client } from "@/app/page";
import toast from "react-hot-toast";
import { moduleAddress } from "@/app/page";
const urban = Urbanist({ subsets: ["latin"] });

const EditAddTask = ({ method }) => {
  const [newTask, setNewTask] = useState("");
  const [accountHasList, setAccountHasList] = useState(false);
  const [transactionInProgress, setTransactionInProgress] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { taskId, setTaskId, filteredTasks, tasks } = useContext(TaskContext);

  const existingTaskId = searchParams.get("id");
  const { account, signAndSubmitTransaction, network } = useWallet();
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "",
  });
  const [priority, setPriority] = useState("");
  const editTask = tasks.find((task) => task?.task_id === existingTaskId);

  useEffect(() => {
    if (method === "edit" && editTask) {
      setTask({
        title: editTask.task_name,
        description: editTask.description,
        priority: editTask.priority,
      });
      setPriority(editTask.priority);
    }
  }, [editTask]);

  const handleTaskChange = (event) => {
    const { name, value } = event.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };
  const handlePriority = (v) => {
    setPriority(v);
  };
  // add task apos integration
  const addTask = async (e) => {
    e.preventDefault();
    if (!account) return [];
    setTransactionInProgress(true);
    const transactionPayload = {
      data: {
        function: `${moduleAddress}::task4::add_task`,
        functionArguments: [task?.title, task?.description, 1, 1],
      },
    };
    try {
      const response = await signAndSubmitTransaction(transactionPayload);
      await client.waitForTransaction(response.hash);

      setAccountHasList(true);
      toast.success("Task added");
    } catch (error) {
      toast.success("error occurred");
      setAccountHasList(false);
    } finally {
      setTransactionInProgress(false);
      router.push("/task", { scroll: true });
    }
  };
  // edit task
  const editingTask = async (e) => {
    e.preventDefault();
    if (!account) return [];
    setTransactionInProgress(true);
    // build a transaction payload to be submited

    const transactionPayload = {
      data: {
        function: `${moduleAddress}::task4::update_task`,
        functionArguments: [
          existingTaskId,
          task?.title,
          task?.description,
          task.priority,
          1,
        ],
      },
    };
    try {
      // sign and submit transaction to chain
      const response = await signAndSubmitTransaction(transactionPayload);
      // wait for transaction
      await client.waitForTransaction(response.hash);
      setAccountHasList(true);
      toast.success("Task updated");
      router.push("/task", { scroll: true });
    } catch (error) {
      setAccountHasList(false);
    } finally {
      setTransactionInProgress(false);
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
            className={typeof window !== "undefined" && urban.className}
            action="#"
            method="post"
          >
            <h4>Task Name</h4>
            <input
              type="text"
              name="title"
              value={task?.title}
              onChange={(e) => handleTaskChange(e)}
              placeholder="write task here"
              // defaultValue={task ? task.title : ""}
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
              value={task?.description}
              onChange={(e) => handleTaskChange(e)}
              placeholder="Add Task Description"
              // defaultValue={task ? task.description : ""}
            ></textarea>

            <button
              onClick={
                method === "edit" ? (e) => editingTask(e) : (e) => addTask(e)
              }
              type="submit"
              id="submitBtn"
              className="submit-btn"
            >
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
