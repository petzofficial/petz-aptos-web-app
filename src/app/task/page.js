"use client";
import Link from "next/link";
import "@/style/tasks/tasks.scss";
import { MdOutlineSelectAll } from "react-icons/md";
import React, { useContext, useEffect, useState } from "react";
import { IoMdTime, IoMdDoneAll } from "react-icons/io";
import { CgTimelapse } from "react-icons/cg";
import GoBackBtn from "@/components/button/GoBackBtn";
import Pagination from "@/components/button/Pagination";
// import { getTaskData } from "@/utils/localDB";
import PriorityComponent from "@/utils/aptostask/aptostask";
import Image from "next/image";
import emptyImage from "@/assets/without/empty.png";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { AptosClient } from "aptos";
import { TaskContext } from "./context/taskContext";
import { setTasksAndStoreStatus } from "@/utils/localDB.js";
export const NODE_URL = "https://fullnode.testnet.aptoslabs.com";
export const client = new AptosClient(NODE_URL);
// change this to be your module account address
export const moduleAddress =
  "0x8cb5e9980ab5dc8abc45edcfac0e46cdcbead3e7ec9661a4a464fa7091c5f77a";

const Page = () => {
  const { filteredTasks, setFilteredTasks, tasks, setTasks } =
    useContext(TaskContext);
  const [slug, setSlug] = useState("All");
  const [transactionInProgress, setTransactionInProgress] = useState(false);
  const { account, signAndSubmitTransaction, network } = useWallet();
  const [accountHasList, setAccountHasList] = useState(false);

  const fetchTasks = async () => {
    if (!account) return [];
    try {
      setTransactionInProgress(true);

      const todoListResource = await client.getAccountResource(
        account?.address,
        `${moduleAddress}::task4::TaskManager`
      );
      setAccountHasList(true);
      console.log(todoListResource);
      // tasks table handle
      const tableHandle = todoListResource.data.tasks.handle;
      // tasks table counter
      console.log("this is table handle");
      console.log(tableHandle);
      const taskCounter = todoListResource.data.set_task_event.counter;

      //const eventResource = await client.getEventsByEventHandle(tableHandle);
      console.log("this is task counter");
      console.log(taskCounter);
      /*   const tableItem = {
                key_type: "u64",
                value_type: `${moduleAddress}::todolist::Task`,
                key: "0x49d2b46aeb9d79937334cbd5c8c3847c1aa0a11a7a4d74a82a12b94661dc2a4c",
              };
              const taskResource = await client.getTableItem(tableHandle, tableItem);
              console.log(taskResource) */

      let tasks = [];
      let counter = 1;
      while (counter <= taskCounter) {
        console.log(counter);
        const tableItem = {
          key_type: "u64",
          value_type: `${moduleAddress}::task3::Task`,
          key: `${counter}`,
        };
        console.log("this is table item");
        console.log(tableItem);
        // console.log(tableHandle,"task tableHandle")
        // console.log(tableItem,"task item")
        const task = await client.getTableItem(tableHandle, tableItem);
        console.log("this is task ero");
        console.log(task, "task");
        tasks.push(task);

        console.log("these are tasks");
        console.log(tasks);
        counter++;
      }
      setFilteredTasks(tasks);
      setTransactionInProgress(false);
      setTasks(tasks);
      setTasksAndStoreStatus(tasks, "Pending");
    } catch (e) {
      console.log(e);
      setAccountHasList(false);
      setTransactionInProgress(false);
    }
  };
  const settingsLocalData =
    JSON.parse(
      typeof window !== "undefined" ? localStorage.getItem("settings") : null
    ) || false;

  useEffect(() => {
    console.log("use effect is called");
    fetchTasks();
  }, [account?.address]);
  const handleFilter = (status) => {
    if (status === "All") {
      setSlug("All");
      setFilteredTasks(tasks);
    } else {
      const filtered = tasks.filter((task) => task?.status === status);
      setFilteredTasks(filtered);
      setSlug(status);
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
  const tasksPerPage = 10;

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
  const [pageNum, setPageNum] = useState(1);
  // Calculate the starting and ending index for the current page
  const startIndex = (pageNum - 1) * tasksPerPage;
  const endIndex = startIndex + tasksPerPage;

  // Get the tasks to display on the current page
  const tasksToDisplay = filteredTasks.slice(startIndex, endIndex);

  if (tasksToDisplay.length === 0) {
    return (
      <div>
        <section className="tasks">
          <div className="addcontainer 2xl:px-5 lg:px-14 md:px-10 sm:px-6 max-sm:px-3">
            <div className="tasks-inner lg:mb-16 max-lg:mb-8">
              <Link href={"/"} className="text-[30px] font-bold">
                <GoBackBtn />
              </Link>
              <div className="tasks-left xl:w-[250px] lg:w-[200px] max-lg:m-auto mt-5">
                <div className="tasks-navbar mt-10">
                  <div
                    onClick={() => handleFilter("All")}
                    className={`flex  cursor-pointer items-center space-x-4 ${
                      slug === "All" ? "bg-[#FEE4D1] text-[#FF6900]" : ""
                    }`}
                  >
                    <MdOutlineSelectAll />
                    <button>All</button>
                  </div>
                  <div
                    onClick={() => handleFilter("Pending")}
                    className={`flex cursor-pointer items-center space-x-4 ${
                      slug === "Pending" ? "bg-[#FEE4D1] text-[#FF6900]" : ""
                    }`}
                  >
                    <IoMdTime />
                    <button>Pending</button>
                  </div>
                  <div
                    onClick={() => handleFilter("In Progress")}
                    className={`flex cursor-pointer items-center space-x-4 ${
                      slug === "In Progress"
                        ? "bg-[#FEE4D1] text-[#FF6900]"
                        : ""
                    }`}
                  >
                    <CgTimelapse className="border rounded-full" />
                    <button>In Progress</button>
                  </div>
                  <div
                    onClick={() => handleFilter("Completed")}
                    className={`flex cursor-pointer items-center space-x-4 ${
                      slug === "Completed" ? "bg-[#FEE4D1] text-[#FF6900]" : ""
                    }`}
                  >
                    <IoMdDoneAll />
                    <button
                      className={`${
                        slug === 2
                          ? "bg-[#FEE4D1] text-[#FF6900] cursor-pointer"
                          : ""
                      }`}
                    >
                      Completed
                    </button>
                  </div>
                </div>
              </div>

              <div className="tasks-right flex-1 lg:w-[466px] m-auto lg:mt-[-356px]">
                <h2 className="mb-9 max-md:mt-8 text-center">Today</h2>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    // marginTop: "10px",
                  }}
                >
                  <Image height={240} src={emptyImage} alt="empty" />
                </div>
                <Pagination
                  currentPage={pageNum}
                  totalPages={totalPages}
                  onPageChange={setPageNum}
                />
                <div className="add-task-btn">
                  <Link href={"/task/task-add"}>
                    <button>Add New Task</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <section className="tasks">
        <div className="addcontainer 2xl:px-5 lg:px-14 md:px-10 sm:px-6 max-sm:px-3">
          <div className="tasks-inner lg:mb-16 max-lg:mb-8">
            <Link href={"/"} className="text-[30px] font-bold">
              <GoBackBtn />
            </Link>
            <div className="tasks-left xl:w-[250px] lg:w-[200px] max-lg:m-auto mt-5">
              <div className="tasks-navbar mt-10">
                <div
                  onClick={() => handleFilter("All")}
                  className={`flex items-center space-x-4 ${
                    slug === "All" ? "bg-[#FEE4D1] text-[#FF6900]" : ""
                  }`}
                >
                  <MdOutlineSelectAll />
                  <button>All</button>
                </div>
                <div
                  onClick={() => handleFilter("Pending")}
                  className={`flex items-center space-x-4 ${
                    slug === "Pending" ? "bg-[#FEE4D1] text-[#FF6900]" : ""
                  }`}
                >
                  <IoMdTime />
                  <button>Pending</button>
                </div>
                <div
                  onClick={() => handleFilter("In Progress")}
                  className={`flex items-center space-x-4 ${
                    slug === "In Progress" ? "bg-[#FEE4D1] text-[#FF6900]" : ""
                  }`}
                >
                  <CgTimelapse className="border rounded-full" />
                  <button>In Progress</button>
                </div>
                <div
                  onClick={() => handleFilter("Completed")}
                  className={`flex items-center space-x-4 ${
                    slug === "Completed" ? "bg-[#FEE4D1] text-[#FF6900]" : ""
                  }`}
                >
                  <IoMdDoneAll />
                  <button>Completed</button>
                </div>
              </div>
            </div>

            <div className="tasks-right flex-1 lg:w-[466px] m-auto lg:mt-[-356px]">
              <h2 className="mb-9 max-md:mt-8 text-center">Today</h2>

              {tasksToDisplay.map((item) => (
                <Link
                  key={item.task_id}
                  href={`/task/task-details?id=${item.task_id}`}
                >
                  <div className="box flex items-center lg:w-[466px] px-2 py-1 justify-between">
                    <div
                      style={{ backgroundColor: item.statusColor }}
                      className={`color`}
                    ></div>
                    <div className="middle flex justify-between">
                      <div>
                        <h1>{item.task_name}</h1>
                        <p>{convertToHHMMSS(item.total_time_spent)}</p>
                      </div>
                      <div className="text-end">
                        <p>
                          {item.cycle_count}/
                          {settingsLocalData && settingsLocalData.cycleCount
                            ? settingsLocalData.cycleCount
                            : "4"}
                        </p>
                        <p>{PriorityComponent(item.priority)}</p>
                      </div>
                    </div>
                    <div className="flex mt-7"></div>
                  </div>
                </Link>
              ))}

              <Pagination
                currentPage={pageNum}
                totalPages={totalPages}
                onPageChange={setPageNum}
              />
              <div className="add-task-btn">
                <Link href={"/task/task-add"}>
                  <button>Add New Task</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
