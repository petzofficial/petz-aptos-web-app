"use client";
import GoBackBtn from "@/components/button/GoBackBtn";
import Link from "next/link";
import { moduleAddress, client } from "@/utils/aptostask/moduleAddress";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import React, { useContext, useEffect, useState } from "react";
import { TaskContext } from "@/app/task/context/taskContext";
import { addTask, getTaskData, updateTask } from "../../utils/localDB";
import { useRouter, useSearchParams } from "next/navigation";
// import { client } from "@/app/page";
import toast from "react-hot-toast";
import { moduleAddress } from "@/utils/aptostask/moduleAddress";
const EditAddTask = ({ method }) => {
  const [accountHasList, setAccountHasList] = useState(false);
  const [transactionInProgress, setTransactionInProgress] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { tasks } = useContext(TaskContext);

  const existingTaskId = searchParams.get("id");
  const { account, signAndSubmitTransaction, network } = useWallet();
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "",
  });
  const [priority, setPriority] = useState("");
  const editTask = tasks?.find((task) => task?.task_id === existingTaskId);

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
  const addTask = async (e) => {
    e.preventDefault();
    if (!account) return [];
    setTransactionInProgress(true);
    const transactionPayload = {
      data: {
        function: `${moduleAddress}::task3::add_task`,
        functionArguments: [task?.title, task?.description, 0, priority],
      },
    };
    try {
      const response = await signAndSubmitTransaction(transactionPayload);
      await client.waitForTransaction(response.hash);
      setAccountHasList(true);

      toast.success("Task added");
      router.push("/task", { scroll: true });
    } catch (error) {
      setAccountHasList(false);
    } finally {
      setTransactionInProgress(false);
    }
  };
  const fetchTasks = async () => {
    if (!account) return [];
    try {
      const todoListResource = await client.getAccountResource(
        account?.address,
        `${moduleAddress}::task3::TaskManager`
      );
      setAccountHasList(true);
      console.log(todoListResource);
      // tasks table handle
      const tableHandle = todoListResource.data.tasks.handle;
      // tasks table counter
      const taskCounter = todoListResource.data.task_counter;

      let tasks = [];
      let counter = 1;
      while (counter <= taskCounter) {
        console.log(counter);
        const tableItem = {
          key_type: "u64",
          value_type: `${moduleAddress}::task3::Task`,
          key: `${counter}`,
        };

        const task = await client.getTableItem(tableHandle, tableItem);
        tasks.push(task);

        counter++;
      }
    } catch (e) {
      setAccountHasList(false);
    }
  };

  const editingTask = async (e) => {
    e.preventDefault();
    if (!account) return [];
    setTransactionInProgress(true);
    const transactionPayload = {
      data: {
        function: `${moduleAddress}::task3::update_task`,
        functionArguments: [
          existingTaskId,
          task?.title,
          task?.description,
          1,
          priority,
        ],
      },
    };
    try {
      // sign and submit transaction to chain
      const response = await signAndSubmitTransaction(transactionPayload);
      const transaction = await client.waitForTransaction(response.hash);
      setAccountHasList(true);
      toast.success("Task updated");
      router.push("/task", { scroll: true });
    } catch (error) {
      setAccountHasList(false);
    } finally {
      setTransactionInProgress(false);
    }
  };
  useEffect(() => {
    fetchTasks();
  }, []);
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
            className={typeof window !== "undefined"}
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
                  handlePriority(1);
                }}
                className={priority === 1 ? "selected" : ""}
              >
                High
              </button>
              <button
                type="button"
                onClick={() => {
                  handlePriority(2);
                }}
                className={priority === 2 ? "selected" : ""}
              >
                Medium
              </button>
              <button
                type="button"
                onClick={() => {
                  handlePriority(3);
                }}
                className={priority === 3 ? "selected" : ""}
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
