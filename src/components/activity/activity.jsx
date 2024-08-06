"use client";

import { Outfit, Urbanist } from "next/font/google";
import "@/style/activity/activity.scss";
import { useContext, useState } from "react";
import { TaskContext } from "@/app/task/context/taskContext";
import { moduleAddress, client } from "@/utils/aptostask/moduleAddress";
import TabSection from "../tabs";
const outfit = Outfit({ subsets: ["latin"] });
const urbanist = Urbanist({ subsets: ["latin"] });

const ActivityComp = () => {
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

      const tableHandle = todoListResource.data.tasks.handle;

      const taskCounter = todoListResource.data.set_task_event.counter;

      let tasks = [];
      let counter = 1;
      while (counter <= taskCounter) {
        const tableItem = {
          key_type: "u64",
          value_type: `${moduleAddress}::task3::Task`,
          key: `${counter}`,
        };
        const task = await client.getTableItem(tableHandle, tableItem);
        tasks.push(task);

        setTasks(tasks);
        setFilteredTasks(tasks);
        counter++;
      }

      setActivityHistory(tasks);
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
          <div className=" m-auto account-profile   min-h-screen mb-8 lg:mt-[-400px]">
            <h2 className={`flex justify-center  ${outfit.className}`}>
              Activity
            </h2>
            <div className="activity lg:ml-8   overscroll-auto mt-8">
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
