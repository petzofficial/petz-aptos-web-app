"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import GoBackBtn from "@/components/button/GoBackBtn";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import "../../../style/tasks/task-details.scss";
import { Outfit } from "next/font/google";
import { FaSquare, FaPlay } from "react-icons/fa";
import { IoIosRefresh } from "react-icons/io";
import Image from "next/image";
import img1 from "../../../assets/home/image 23.png";
import img2 from "../../../assets/home/pgt-removebg-preview 2.png";
import img3 from "../../../assets/home/pst-removebg-preview 2.png";
import { getTaskData, removeFromDB, updateTask } from "@/utilities/localDB";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const outfit = Outfit({ subsets: ["latin"] });

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const itemID = searchParams.get("id");
  const [task, setTask] = useState(
    getTaskData()?.find((item) => item._id == itemID)
  );
  const settingsLocalData =
    JSON.parse(
      typeof window !== "undefined" ? localStorage.getItem("settings") : null
    ) || false;

  if (!task) {
    router.push("/task", { scroll: true });
  }

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

  return (
    <div>
      <Navbar method={"tasks"} />

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
              <h3 className="text-[#FF6900]">{task.status}</h3>
            </div>
            {task.status === "Completed" ? (
              ""
            ) : (
              <div className="button-bar flex justify-center items-center space-x-4">
                <Link
                  key={task._id}
                  href={
                    task.status === "Completed" ? "#" : `/home?id=${task._id}`
                  }
                >
                  <button onClick={handleButtonClick}>
                    <FaSquare />
                  </button>
                </Link>
                <Link
                  key={task._id}
                  href={
                    task.status === "Completed" ? "#" : `/home?id=${task._id}`
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
                  key={task._id}
                  href={
                    task.status === "Completed" ? "#" : `/home?id=${task._id}`
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
                <span>{task.title}</span>
              </div>
              <div>
                <p>Task Description</p>
                <span>{task.addDescription}</span>
              </div>
              <div>
                <p>Date</p>
                <span>{task.date}</span>
              </div>
              <div>
                <p>Task priority</p>
                <span>{task.priority}</span>
              </div>
              <div>
                <p>Cycle count</p>
                <span>
                  {task.cycleCount}/
                  {settingsLocalData && settingsLocalData.cycleCount
                    ? settingsLocalData.cycleCount
                    : "4"}
                </span>
              </div>
              <div>
                <p>Total time spent</p>
                <span>{convertToHHMMSS(task.time)}</span>
              </div>

              <div>
                <p>Fee (in APT)</p>
                <div>
                  <Image src={img1} width={33} height={33} alt="coin" />
                  <span>100 APT</span>
                </div>
              </div>
              <div>
                <p>PGT Reward</p>
                <div>
                  <Image src={img2} width={33} height={33} alt="coin" />
                  <span>100 PGT</span>
                </div>
              </div>
              <div>
                <p>PST Reward</p>
                <div>
                  <Image src={img3} width={33} height={33} alt="coin" />
                  <span>100 PST</span>
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
              {task.status === "Completed" ? (
                ""
              ) : (
                <button
                  onClick={() => {
                    handleStatus(task._id);
                  }}
                >
                  Mark As{" "}
                  {task?.status === "In Progress" || "Pending" ? "Completed" : "Completed"}
                </button>
              )}
              {task.status === "Completed" ? (
                ""
              ) : (
                <Link href={`/task/task-edit?id=${task._id}`}>Edit Task</Link>
              )}
              <button
                onClick={() => {
                  handleDelete(task._id);
                }}
                className="!text-[#B40000]"
              >
                Delete Task
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Page;
