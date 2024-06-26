"use client";
import useSound from "use-sound";

import React, { useState, useEffect } from "react";
import "../style/nav.scss";
import {
  getTaskData,
  getUserData,
  updateTask,
  updateUserData,
} from "@/utils/localDB";
import click_sound from "@/assets/audioClock/click_sound.mp3";
import finish_sound from "@/assets/audioClock/finish_sound.mp3";
import { WalletConnector } from "../components/aptosIntegrations/WalletConnector";
import Image from "next/image";
import logo from "../../public/logo.png";
import Link from "next/link";
import { IoMdSettings } from "react-icons/io";
import { IoNotifications } from "react-icons/io5";
import { Outfit } from "next/font/google";
import { IoMdMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { AppContext } from "./aptosIntegrations/AppContext";
import { NetworkSelector } from "./aptosIntegrations/networkSelector";
import { useContext } from "react";
import { TaskContext } from "@/app/task/context/taskContext";
import toast from "react-hot-toast";
const outfit = Outfit({ subsets: ["latin"] });

const Navbar = ({ method }) => {
  const [responsive, setResponsive] = useState(false);
  const {
    taskId,
    setTaskId,
    seconds,
    setSeconds,
    totalSeconds,
    isRunning,
    setIsRunning,
    energy,
    setEnergy,
    selectedTaskId,
    setSelectedTaskId,
    settings,
    setSettings,
    isEnergyRunning,
    setIsEnergyRunning,
    filteredTasks,
    setFilteredTasks,
    secondsRef,
    setCurrentCycle,
    currentCycle,
    setMinutes,
    minutes,
    currentState,
    setCurrentState,
    setTotalSeconds,
  } = useContext(TaskContext);
  console.log(isRunning);
  const userData = getUserData();
  const [clickSound] = useSound(click_sound);
  const [finishSound] = useSound(finish_sound);

  useEffect(() => {
    const settingsLocalData = JSON.parse(
      typeof window !== "undefined" ? localStorage.getItem("settings") : null
    );

    if (settingsLocalData) {
      setTotalSeconds(parseInt(settingsLocalData.focusTime) * 60);
      setSeconds(parseInt(settingsLocalData.focusTime) * 60);
      setSettings({
        focusDuration: parseInt(settingsLocalData.focusTime) * 60,
        shortBreakDuration: parseInt(settingsLocalData.shortBreak) * 60,
        longBreakDuration: parseInt(settingsLocalData.longBreak) * 60,
        cycleCount: parseInt(settingsLocalData.cycleCount),
        autoStart: settingsLocalData.check,
      });
    }
    const handleSelectDataFunc = (id) => {
      let tmpCycle = 1;
      const tasks = getTaskData();
      const filtered = tasks.find((task) => task._id === id);
      console.log(filtered);
      if (
        filtered &&
        filtered.currentCycleCount &&
        filtered.currentCycleCount > 0
      ) {
        tmpCycle = filtered.currentCycleCount;
      }
      setSelectedTaskId(id);
      setCurrentCycle(tmpCycle);
    };

    const tasks = getTaskData();
    const status = "Completed";
    const filtered = tasks.filter((task) => task.status != status);
    console.log(taskId);
    setFilteredTasks(filtered);
    if (taskId) {
      setSelectedTaskId(taskId);
      handleSelectDataFunc(taskId);
    }
  }, []);
  console.log("task id from navbar");
  console.log(taskId);
  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTime = new Date();
      const currentMinutes = currentTime.getMinutes();
      setMinutes(currentMinutes);
      const userData = getUserData();
      setEnergy(userData.energy);
    }, 60000); // 1 minute in milliseconds

    return () => clearInterval(intervalId);
  }, [isEnergyRunning]);
  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          return prevSeconds - 1;
        });

        const currentDate = new Date();
        const options = { day: "numeric", month: "numeric", year: "numeric" };
        const formattedDate = currentDate.toLocaleDateString("en-GB", options);

        let statisticsData = JSON.parse(
          typeof window !== "undefined"
            ? localStorage.getItem("statistics")
            : null
        );

        if (!statisticsData) {
          statisticsData = {};
        }

        if (
          statisticsData[formattedDate] &&
          statisticsData[formattedDate][selectedTaskId]
        ) {
          if (currentState === "focus") {
            statisticsData[formattedDate][selectedTaskId].focus++;
            const tasks = getTaskData();
            const findData = tasks.find((task) => task._id === selectedTaskId);
            let tempTotalTime = 0;
            if (findData && findData.time) {
              tempTotalTime = findData.time;
            }

            updateTask(selectedTaskId, {
              time: tempTotalTime + 1,
              reward_PGC: tempTotalTime + 1,
            });
            let energy = 0;
            if (userData.energy) {
              energy = userData?.energy;
            }

            if (
              ((seconds - 1) % 60 === 0 && (seconds - 1) % 300 !== 0) ||
              seconds - 1 === 0
            ) {
              setEnergy((prev) => prev - 1);
              energy = userData?.energy - 1;
            }

            updateUserData({ energy: energy });
          } else if (currentState === "shortBreak") {
            const tasks = getTaskData();
            const findData = tasks.find((task) => task._id === selectedTaskId);
            setTotalSeconds(settings.shortBreakDuration);
            statisticsData[formattedDate][selectedTaskId].shortBreak++;
            let tempTotalTime = 0;
            if (findData && findData.time) {
              tempTotalTime = findData.time;
            }

            updateTask(selectedTaskId, {
              time: tempTotalTime + 1,
            });
            let energy = 0;
            if (userData.energy) {
              energy = userData?.energy;
            }

            if (
              ((seconds - 1) % 60 === 0 && (seconds - 1) % 300 !== 0) ||
              seconds - 1 === 0
            ) {
              setEnergy((prev) => prev - 1);
              energy = userData?.energy - 1;
            }

            updateUserData({ energy: energy });
          } else if (currentState === "longBreak") {
            const tasks = getTaskData();
            const findData = tasks.find((task) => task._id === selectedTaskId);
            let energy = 0;
            if (userData.energy) {
              energy = userData?.energy;
            }

            if (
              ((seconds - 1) % 60 === 0 && (seconds - 1) % 300 !== 0) ||
              seconds - 1 === 0
            ) {
              setEnergy((prev) => prev - 1);
              energy = userData?.energy - 1;
            }
            let tempTotalTime = 0;
            if (findData && findData.time) {
              tempTotalTime = findData.time;
            }

            updateTask(selectedTaskId, {
              time: tempTotalTime + 1,
            });
            updateUserData({ energy: energy });
            setTotalSeconds(settings.longBreakDuration);

            statisticsData[formattedDate][selectedTaskId].longBreak++;
          }
        } else {
          statisticsData[formattedDate] = {
            ...statisticsData[formattedDate],
            [selectedTaskId]: {
              focus: 0,
              shortBreak: 0,
              longBreak: 0,
            },
          };
        }

        localStorage.setItem("statistics", JSON.stringify(statisticsData));
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isRunning, seconds]);

  const handleTimerEnd = () => {
    setIsRunning(false);

    if (currentState === "focus") {
      if (currentCycle < settings.cycleCount) {
        setCurrentState("shortBreak");
        setTotalSeconds(settings.shortBreakDuration);
        setSeconds(settings.shortBreakDuration);
      } else {
        setCurrentState("longBreak");
        setTotalSeconds(settings.longBreakDuration);
        setSeconds(settings.longBreakDuration);
      }
    } else if (currentState === "shortBreak") {
      // cycle update
      updateTask(selectedTaskId, { currentCycleCount: currentCycle + 1 });
      setCurrentCycle((prevCycle) => prevCycle + 1);
      setCurrentState("focus");
      setSeconds(settings.focusDuration);
      setTotalSeconds(settings.focusDuration);
    } else if (currentState === "longBreak") {
      // cycle update
      //updateTask(selectedTaskId, { currentCycleCount: 1 });
      setSelectedTaskId("choose");
      setCurrentCycle(1);
      setCurrentState("focus");
      setSeconds(settings.focusDuration);
      setTotalSeconds(settings.focusDuration);
      updateTask(selectedTaskId, {
        status: "Completed",
        statusColor: "#14985A",
      });
      // Update filteredTasks after task completion
      const updatedTasks = getTaskData();
      const updatedFilteredTasks = updatedTasks.filter(
        (task) => task.status !== "Completed"
      );
      setFilteredTasks(updatedFilteredTasks);
      // Show success toast
      // const reward = 60 * Math.floor(filtered?.time / 60);
      toast.success(`Task is Completed`);
      /*  updateTask(selectedTaskId, {
        reward_PGC: 25 * 60,
      }); */
    }
  };
  useEffect(() => {
    if (seconds === 0) {
      handleTimerEnd();
      finishSound();
    }
  }, [seconds]);

  useEffect(() => {
    if (settings?.autoStart && !isRunning) {
      startTimer();
    }
  }, [settings?.autoStart, isRunning, selectedTaskId]);

  return (
    <AppContext>
      <nav
        suppressHydrationWarning={true}
        className="w-full bg-white fixed z-20 shadow-md py-1"
      >
        <div className="navbar 2xl:px-5 lg:px-14 md:px-10 sm:px-6 max-sm:px-3">
          <Link href={"/"}>
            <div className="logo flex items-center">
              <Image src={logo} width={60} height={60} alt="Logo" />
              <p>PetZ</p>
            </div>
          </Link>
          <div className={`pages max-md:hidden lg:flex ${outfit.className}`}>
            <Link href={"/task"}>
              <button
                className={`${method === "tasks" ? " text-[#FF6900]" : ""}`}
              >
                Tasks
              </button>
            </Link>
            <Link href={"/statistics"}>
              <button
                className={`${
                  method === "statistics" ? " text-[#FF6900]" : ""
                }`}
              >
                Statistics
              </button>
            </Link>
            <Link href={"/account"}>
              <button
                className={`${method === "account" ? " text-[#FF6900]" : ""}`}
              >
                Account
              </button>
            </Link>
          </div>

          <div className="profile-setting">
            <Link href={"/setting"}>
              <button
                className={`${method === "setting" ? " text-[#FF6900]" : ""}`}
              >
                <IoMdSettings />
              </button>
            </Link>
            <Link href={"/notification"}>
              <button
                className={`${
                  method === "notification" ? " text-[#FF6900]" : ""
                }`}
              >
                <IoNotifications />
              </button>
            </Link>
            <div className="max-md:hidden lg:flex items-center justify-center gap-4">
              <NetworkSelector />
              <WalletConnector />
            </div>

            <button
              onClick={() => setResponsive(!responsive)}
              className="text-[25px] text-[#2f2f2f] md:hidden"
            >
              {responsive ? <RxCross2 /> : <IoMdMenu />}
            </button>
          </div>
        </div>

        <div
          className={`mobile-navbar flex p-8 flex-col w-full transition-all duration-100 md:hidden overflow-hidden ${
            outfit.className
          } ${responsive ? "h-full" : "h-[0px] py-0"}`}
        >
          <Link href={"/statistics"}>
            <button
              className={`${method === "statistics" ? " text-[#FF6900]" : ""}`}
            >
              Statistics
            </button>
          </Link>
          <Link href={"/task"}>
            <button
              className={`${method === "tasks" ? " text-[#FF6900]" : ""}`}
            >
              Tasks
            </button>
          </Link>
          <Link href={"/account"}>
            <button
              className={`${method === "account" ? " text-[#FF6900]" : ""}`}
            >
              Account
            </button>
          </Link>
          <div className="flex items-center justify-center gap-4">
            <NetworkSelector />
            <WalletConnector />
          </div>
        </div>
      </nav>{" "}
    </AppContext>
  );
};

export default Navbar;
