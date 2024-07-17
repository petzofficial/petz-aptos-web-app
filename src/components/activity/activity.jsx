"use client";

const { FaArrowRightArrowLeft } = require("react-icons/fa6");
const { TbCircleLetterT } = require("react-icons/tb");
const { default: GoBackBtn } = require("../button/GoBackBtn");
const { Avatar } = require("@mui/material");
import HistoryIcon from "@mui/icons-material/History";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import CreateIcon from "@mui/icons-material/Create";
import { Plus_Jakarta_Sans, Outfit, Urbanist } from "next/font/google";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import "@/style/activity/activity.scss";
import { useContext, useState } from "react";
import Link from "next/link";
import { TaskContext } from "@/app/task/context/taskContext";
import { AptosClient } from "aptos";
import TabSection from "../tabs";
const outfit = Outfit({ subsets: ["latin"] });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });
const urbanist = Urbanist({ subsets: ["latin"] });
const NODE_URL = "https://fullnode.testnet.aptoslabs.com";
const client = new AptosClient(NODE_URL);
// change this to be your module account address
const moduleAddress =
  "0x3562227119a7a6190402c7cc0b987d2ff5432445a8bfa90c3a51be9ff29dcbe3";

const ActivityComp = () => {
  const { slug, setSlug } = useContext(TaskContext);
  const [activityHistory, setActivityHistory] = useState([]);
  const fetchTasks = async () => {
    if (!account) return [];
    try {
      setIsLoading(true);
      const todoListResource = await client.getAccountResource(
        account?.address,
        `${moduleAddress}::task3::TaskManager`
      );
      setAccountHasList(true);
      console.log(todoListResource);

      const tableHandle = todoListResource.data.tasks.handle;
      console.log("this is table handle");
      console.log(tableHandle);
      const taskCounter = todoListResource.data.set_task_event.counter;
      console.log("this is task counter");
      console.log(taskCounter);

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
        console.log("these are tasks");
        console.log(tasks);
        setTasks(tasks);
        setFilteredTasks(tasks);
        counter++;
      }

      setActivityHistory(tasks);
      console.log("Tasks after setting:", tasks);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setAccountHasList(false);
      setIsLoading(false);
    }
  };

  return (
    <div className="account">
      <div className="addcontainer 2xl:px-5 lg:px-14 md:px-10 sm:px-6 max-sm:px-3">
        <div className="account-top">
          <TabSection />
          <div className=" m-auto max-width min-h-screen mb-8 lg:mt-[-400px]">
            <h2 className={`flex justify-center  ${outfit.className}`}>
              Activity
            </h2>
            <div className="activity  overscroll-auto mt-8">
              <div className="activity-header flex items-center  justify-around">
                <span className={`${urbanist.className} timestamp`}>
                  Timestamp
                </span>
                <span className={`${urbanist.className} timestamp`}>
                  Action
                </span>
                <span className={`${urbanist.className} timestamp`}>
                  IP Address
                </span>
              </div>
              <div className="activity-body flex items-start justify-around p-3">
                <span className={`${urbanist.className} activity-body-span `}>
                  3 min ago
                </span>
                <span
                  style={{ fontFamily: urbanist }}
                  className={`${urbanist.className} activity-body-span `}
                >
                  Changed Profile
                </span>
                <span
                  style={{ fontFamily: urbanist }}
                  className={`${urbanist.className} activity-body-span `}
                >
                  123.22.4312
                </span>
              </div>
              <div className="activity-body flex items-start justify-around ">
                <span className={`${urbanist.className} activity-body-span `}>
                  3 min ago
                </span>
                <span
                  style={{ fontFamily: urbanist }}
                  className={`${urbanist.className} activity-body-span `}
                >
                  Changed Profile
                </span>
                <span
                  style={{ fontFamily: urbanist }}
                  className={`${urbanist.className} activity-body-span `}
                >
                  123.22.4312
                </span>
              </div>
              <div className="activity-body flex items-start justify-around ">
                <span className={`${urbanist.className} activity-body-span `}>
                  3 min ago
                </span>
                <span
                  style={{ fontFamily: urbanist }}
                  className={`${urbanist.className} activity-body-span `}
                >
                  Changed Profile
                </span>
                <span
                  style={{ fontFamily: urbanist }}
                  className={`${urbanist.className} activity-body-span `}
                >
                  123.22.4312
                </span>
              </div>
              <div className="activity-body flex items-start justify-around">
                <span className={`${urbanist.className} activity-body-span `}>
                  3 min ago
                </span>
                <span
                  style={{ fontFamily: urbanist }}
                  className={`${urbanist.className} activity-body-span `}
                >
                  Changed Profile
                </span>
                <span
                  style={{ fontFamily: urbanist }}
                  className={`${urbanist.className} activity-body-span `}
                >
                  123.22.4312
                </span>
              </div>
              <div className="activity-body flex items-start justify-around ">
                <span className={`${urbanist.className} activity-body-span `}>
                  3 min ago
                </span>
                <span
                  style={{ fontFamily: urbanist }}
                  className={`${urbanist.className} activity-body-span `}
                >
                  Changed Profile
                </span>
                <span
                  style={{ fontFamily: urbanist }}
                  className={`${urbanist.className} activity-body-span `}
                >
                  123.22.4312
                </span>
              </div>

              <div className="activity-body flex items-start justify-around ">
                <span className={`${urbanist.className} activity-body-span `}>
                  3 min ago
                </span>
                <span
                  style={{ fontFamily: urbanist }}
                  className={`${urbanist.className} activity-body-span `}
                >
                  Changed Profile
                </span>
                <span
                  style={{ fontFamily: urbanist }}
                  className={`${urbanist.className} activity-body-span `}
                >
                  123.22.4312
                </span>
              </div>
              <div className="activity-body flex items-start justify-around ">
                <span className={`${urbanist.className} activity-body-span `}>
                  3 min ago
                </span>
                <span
                  style={{ fontFamily: urbanist }}
                  className={`${urbanist.className} activity-body-span `}
                >
                  Changed Profile
                </span>
                <span
                  style={{ fontFamily: urbanist }}
                  className={`${urbanist.className} activity-body-span `}
                >
                  123.22.4312
                </span>
              </div>
              <div className="activity-body flex items-start justify-around">
                <span className={`${urbanist.className} activity-body-span `}>
                  3 min ago
                </span>
                <span
                  style={{ fontFamily: urbanist }}
                  className={`${urbanist.className} activity-body-span `}
                >
                  Changed Profile
                </span>
                <span
                  style={{ fontFamily: urbanist }}
                  className={`${urbanist.className} activity-body-span `}
                >
                  123.22.4312
                </span>
              </div>
              <div className="activity-body flex items-start justify-around ">
                <span className={`${urbanist.className} activity-body-span `}>
                  3 min ago
                </span>
                <span
                  style={{ fontFamily: urbanist }}
                  className={`${urbanist.className} activity-body-span `}
                >
                  Changed Profile
                </span>
                <span
                  style={{ fontFamily: urbanist }}
                  className={`${urbanist.className} activity-body-span `}
                >
                  123.22.4312
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ActivityComp;
