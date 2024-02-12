"use client";

import Link from "next/link";
import "../../style/tasks/tasks.scss";
import { MdOutlineSelectAll } from "react-icons/md";
import React, { useEffect, useState } from "react";
import { FaCirclePlay } from "react-icons/fa6";
import { IoMdTime, IoMdDoneAll } from "react-icons/io";
import { CgTimelapse } from "react-icons/cg";
import GoBackBtn from "@/components/button/GoBackBtn";
import Pagination from "@/components/button/Pagination";
import { getTaskData } from "@/utils/localDB";
import Image from "next/image";
import emptyImage from "@/assets/without/empty.png";

const Page = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [slug, setSlug] = useState("All");
  const settingsLocalData =
    JSON.parse(
      typeof window !== "undefined" ? localStorage.getItem("settings") : null
    ) || false;
  useEffect(() => {
    const storedTasks = getTaskData();
    setTasks(storedTasks);
    setFilteredTasks(storedTasks);
  }, []);

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
                        slug === "Completed"
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
                <Link key={item._id} href={`/task/task-details?id=${item._id}`}>
                  <div className="box flex items-center lg:w-[466px] px-2 py-1 justify-between">
                    <div
                      style={{ backgroundColor: item.statusColor }}
                      className={`color`}
                    ></div>
                    <div className="middle flex justify-between">
                      <div>
                        <h1>{item.title}</h1>
                        <p>{convertToHHMMSS(item.time)}</p>
                      </div>
                      <div className="text-end">
                        <p>
                          {item.currentCycleCount}/
                          {settingsLocalData && settingsLocalData.cycleCount
                            ? settingsLocalData.cycleCount
                            : "4"}
                        </p>
                        <p>
                          {settingsLocalData && settingsLocalData.shortBreak
                            ? settingsLocalData.shortBreak
                            : "5"}{" "}
                          min
                        </p>
                      </div>
                    </div>
                    <div className="play">
                      <FaCirclePlay />
                    </div>
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
