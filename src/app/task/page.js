"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import "../../style/tasks/tasks.scss";
import { MdOutlineSelectAll } from "react-icons/md";
import React, { useEffect, useState } from "react";
import { FaCirclePlay } from "react-icons/fa6";
import { IoMdTime, IoMdDoneAll } from "react-icons/io";
import { CgTimelapse } from "react-icons/cg";
import GoBackBtn from "@/components/button/GoBackBtn";
import Pagination from "@/components/button/Pagination";
import { getTaskData } from "@/utilities/localDB";

const Page = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    const storedTasks = getTaskData();
    setTasks(storedTasks);
    setFilteredTasks(storedTasks);
  }, []);


  const handleFilter = (status) => {
    if (status === 'All') {
      setFilteredTasks(tasks);
    } else {
      const filtered = tasks.filter(task => task.status === status);
      setFilteredTasks(filtered);
    }
  };

  return (
    <div>
      <Navbar method={"tasks"} />

      <section className="tasks">
        <div className="addcontainer 2xl:px-5 lg:px-14 md:px-10 sm:px-6 max-sm:px-3">
          <div className="tasks-inner lg:mb-16 max-lg:mb-8">
            <Link href={"/home"} className="text-[30px] font-bold">
              <GoBackBtn />
            </Link>
            <div className="tasks-left xl:w-[250px] lg:w-[200px] max-lg:m-auto mt-5">
              <div className="tasks-navbar mt-10">
                <div className="flex items-center space-x-4">
                  <MdOutlineSelectAll />
                  <button onClick={() => handleFilter('All')}>All</button>
                </div>
                <div className="flex items-center space-x-4">
                  <IoMdDoneAll />
                  <button onClick={() => handleFilter('Completed')}>Complete</button>
                </div>
                <div className="flex items-center space-x-4">
                  <CgTimelapse className="border rounded-full" />
                  <button onClick={() => handleFilter('In Progress')}>In Progress</button>
                </div>
                <div className="flex items-center space-x-4">
                  <IoMdTime />
                  <button onClick={() => handleFilter('Completed')}>Complete</button>
                </div>
              </div>
            </div>

            <div className="tasks-right flex-1 lg:w-[466px] m-auto lg:mt-[-356px]">
              <h2 className="mb-9 max-md:mt-8 text-center">Today</h2>
              {filteredTasks.map((item) => {
                return (
                  <Link
                    key={item._id}
                    href={`/task/task-details?id=${item._id}`}
                  >
                    <div className="box flex items-center lg:w-[466px] px-2 py-1 justify-between">
                      <div
                        style={{ backgroundColor: item.color }}
                        className={`color`}
                      ></div>
                      <div className="middle flex justify-between">
                        <div>
                          <h1>{item.title}</h1>
                          <p>{item.time}</p>
                        </div>
                        <div className="text-end">
                          <p>0/1</p>
                          <p>5 min</p>
                        </div>
                      </div>
                      <div className="play">
                        <FaCirclePlay />
                      </div>
                    </div>
                  </Link>
                );
              })}

              <Pagination />
              <div className="add-task-btn">
                <Link href={"/task/task-add"}>
                  <button>Add New Task</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Page;
