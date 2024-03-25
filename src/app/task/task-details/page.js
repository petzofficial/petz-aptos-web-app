"use client";
import { useContext } from "react";
import { TaskContext } from "../context/taskContext";
import GoBackBtn from "@/components/button/GoBackBtn";
import Link from "next/link";
import React, { useState } from "react";
import "@/style/tasks/task-details.scss";
import { Outfit } from "next/font/google";
import { FaSquare, FaPlay } from "react-icons/fa";
import { IoIosRefresh } from "react-icons/io";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

import Image from "next/image";
import img1 from "@/assets/home/image 23.png";
import img2 from "@/assets/home/pgt-removebg-preview 2.png";
import img3 from "@/assets/home/pst-removebg-preview 2.png";
import {
  getTaskData,
  removeFromDB,
  updateTask,
  getTaskFromLocalStorage,
} from "@/utils/localDB";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { AptosClient } from "aptos";

import { getFormattedDateTime } from "@/components/common/datetime";
import PriorityComponent from "@/utils/aptostask/aptostask";
const outfit = Outfit({ subsets: ["latin"] });
import StatusComponent from "@/utils/aptostask/taskStatus";
export const NODE_URL = "https://fullnode.testnet.aptoslabs.com";
export const client = new AptosClient(NODE_URL);
// change this to be your module account address
export const moduleAddress =
  "0x8cb5e9980ab5dc8abc45edcfac0e46cdcbead3e7ec9661a4a464fa7091c5f77a";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const itemID = searchParams.get("id");
  const [transactionInProgress, setTransactionInProgress] = useState(false);
  const { account, signAndSubmitTransaction, network } = useWallet();
  const [accountHasList, setAccountHasList] = useState(false);

  console.log("this is item id");
  console.log(itemID);
  const { taskId, setTaskId, filteredTasks, tasks } = useContext(TaskContext);
  const taskStatus = getTaskFromLocalStorage(itemID);
  const task = tasks.find((task) => task?.task_id === itemID);
  console.log(task);
  const settingsLocalData =
    JSON.parse(
      typeof window !== "undefined" ? localStorage.getItem("settings") : null
    ) || false;

  // if (!task) {
  //   router.push("/task", { scroll: true });
  // }

  const handleDelete = (id) => {
    removeFromDB(id);
    router.push("/task", { scroll: true });
    toast.success("Task deleted");
  };

  const handleStatus = (id) => {
    const currentStatus = task.status;
    const newStatus = "Completed";
    updateTask(id, { status: newStatus });
    const updatedTask = { ...task, status: newStatus };
    setTask(updatedTask);
    toast.success("Task Completed");
  };

  const handleButtonClick = () => {
    if (task.status == "Completed") {
      toast.error("Task is Completed");
    }
  };

  // Convert total and average time to HH:mm format
  const convertToHHMMSS = (timeInSeconds) => {
    if (timeInSeconds < 60) {
      // Display seconds
      if (timeInSeconds == 0) {
        return `${timeInSeconds} min`;
      }
      return `${timeInSeconds} sec`;
    } else if (timeInSeconds < 3600) {
      // Display minutes and seconds
      const mins = Math.floor(timeInSeconds / 60);
      const secs = timeInSeconds % 60;
      return `${mins} min ${secs} sec`;
    } else {
      // Display hours, minutes, and seconds
      const hours = Math.floor(timeInSeconds / 3600);
      const remainingSecs = timeInSeconds % 3600;
      const mins = Math.floor(remainingSecs / 60);
      const secs = remainingSecs % 60;
      return `${hours} hr ${mins} min ${secs} sec`;
    }
  };

  const deleteTask = async () => {
    if (!account) return [];
    setTransactionInProgress(true);
    // build a transaction payload to be submited
    const transactionPayload = {
      data: {
        function: `${moduleAddress}::task4::delete_task`,
        functionArguments: [itemID],
      },
    };

    try {
      // sign and submit transaction to chain
      const response = await signAndSubmitTransaction(transactionPayload);
      // wait for transaction
      await client.waitForTransaction(response.hash);
      setAccountHasList(true);
    } catch (error) {
      setAccountHasList(false);
    } finally {
      setTransactionInProgress(false);
      router.push("/task", { scroll: true });
      toast.success("Task deleted");
    }
  };
  const completeTask = async () => {
    console.log("this is item id ");
    console.log(itemID);
    if (!account) return [];
    setTransactionInProgress(true);
    // build a transaction payload to be submited
    const transactionPayload = {
      data: {
        function: `${moduleAddress}::task4::complete_task`,
        functionArguments: [itemID],
      },
    };

    try {
      // sign and submit transaction to chain
      const response = await signAndSubmitTransaction(transactionPayload);
      // wait for transaction
      await client.waitForTransaction(response.hash);
      setAccountHasList(true);
      toast.success("Task mark completed");
      router.push("/task", { scroll: true });
    } catch (error) {
      setAccountHasList(false);

      console.log(error);
      toast.success("error occured");
    } finally {
      setTransactionInProgress(false);
    }
  };
  return (
    <div>
      <section className="task-details">
        <div className="addcontainer 2xl:px-5 lg:px-14 md:px-10 sm:px-6 max-sm:px-3">
          <div className="back-button">
            <Link href={"/task"} className="text-[30px] font-bold">
              <GoBackBtn />
            </Link>
          </div>

          <div className="task-details-inner">
            <h2 className={outfit.className}>Task</h2>
            <div
              style={{ marginBottom: "70px" }}
              className="flex justify-between items-center status-bar"
            >
              <h3>Status</h3>
              <h3 className="text-[#FF6900]">{taskStatus?.status}</h3>
            </div>
            {task?.status === "Completed" ? (
              ""
            ) : (
              <div className="button-bar flex justify-center items-center space-x-4">
                <Link
                  key={task?.taskId}
                  onClick={setTaskId(task?.task_id)}
                  href={
                    task?.status === "Completed" ? "#" : `/?id=${task?.task_id}`
                  }
                >
                  <button onClick={handleButtonClick}>
                    <FaSquare />
                  </button>
                </Link>
                <Link
                  key={task?.taskId}
                  onClick={setTaskId(task?.task_id)}
                  href={
                    task?.status === "Completed" ? "#" : `/?id=${task?.task_id}`
                  }
                >
                  <button
                    onClick={handleButtonClick}
                    className="!text-[#fff] !bg-[#FF6900]"
                  >
                    <FaPlay />
                  </button>
                </Link>
                <Link
                  key={task?.taskId}
                  onClick={setTaskId(task?.taskId)}
                  href={
                    task?.status === "Completed" ? "#" : `/?id=${task?.taskId}`
                  }
                >
                  <button onClick={handleButtonClick}>
                    <IoIosRefresh />
                  </button>
                </Link>
              </div>
            )}

            <div className="info lg:p-8 p-1 shadow-md">
              <div>
                <p>Task name</p>
                <span>{task?.task_name}</span>
              </div>
              <div>
                <p>Task Description</p>
                <span>{task?.description}</span>
              </div>
              <div>
                <p>Create Date </p>
                <span>
                  {getFormattedDateTime(task?.create_date).formattedDate +
                    " " +
                    getFormattedDateTime(task?.create_date).formattedTime}
                </span>
              </div>
              <div>
                <p>Task priority</p>
                {PriorityComponent(task?.priority)}
                {/* <span>{task?.priority}</span> */}
              </div>
              <div>
                <p>Cycle count</p>
                <span>{task?.cycle_count}/4</span>
              </div>
              <div>
                <p>Total time spent</p>
                <span>{convertToHHMMSS(task?.total_time_spent)}</span>
              </div>

              <div>
                <p>Fee (in APT)</p>
                <div>
                  <Image src={img1} width={33} height={33} alt="coin" />
                  <span>0</span>
                </div>
              </div>
              <div>
                <p>Reward (in PGC)</p>
                <div>
                  <Image src={img2} width={33} height={33} alt="coin" />
                  <span>{task?.psc_reward}</span>
                </div>
              </div>
              <div>
                <p>Reward (in PSC)</p>
                <div>
                  <Image src={img3} width={33} height={33} alt="coin" />
                  <span>0</span>
                </div>
              </div>

              {/*   <div>
                <p>Transaction</p>
                <Link href={"/account/transaction-details"}>
                  <span className="text-[#FF6900]">View</span>
                </Link>
              </div> */}
            </div>

            <div className="edit-delete-btn">
              {task?.status === "Completed" ? (
                ""
              ) : (
                <button
                  onClick={() => {
                    console.log("mark as completed is clicked");

                    completeTask();
                    // handleStatus(task._id);
                  }}
                >
                  Mark As{" "}
                  {task?.status === "In Progress" || "Pending"
                    ? "Completed"
                    : "Completed"}
                </button>
              )}
              {task?.status === "Completed" ? (
                ""
              ) : (
                <Link href={`/task/task-edit?id=${task?.task_id}`}>
                  Edit Task
                </Link>
              )}
              <button
                onClick={() => {
                  deleteTask();
                }}
                className="!text-[#B40000]"
              >
                Delete Task
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
