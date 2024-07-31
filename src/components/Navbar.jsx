"use client";
import useSound from "use-sound";
import toast from "react-hot-toast";

import React, { useState, useEffect, useRef } from "react";
import "../style/nav.scss";
import {
  getTaskData,
  getUserData,
  saveUserData,
  updateTask,
  updateTaskStatusInLocalStorage,
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
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useSearchParams } from "next/navigation";
import { moduleAddress, client } from "@/utils/aptostask/moduleAddress.jsx";
const outfit = Outfit({ subsets: ["latin"] });

const Navbar = ({ method }) => {
  const intervalRef = useRef(null);

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
    userEnergy,
    setUserEnergy,
  } = useContext(TaskContext);
  console.log(isRunning);
  const userData = getUserData();
  const [clickSound] = useSound(click_sound);
  const [finishSound] = useSound(finish_sound);
  const { account, signAndSubmitTransaction } = useWallet();

  const searchParams = useSearchParams();
  const existingTaskId = searchParams.get("id");

  console.log(process.env);
  const getEnergy = async () => {
    if (!account) return [];
    try {
      const payload = {
        function: `${moduleAddress}::user::get_energy`,
        type_arguments: [],
        arguments: [account.address],
      };
      const response = await client.view(payload);

      setUserEnergy(response[0]);
    } catch (error) {}
  };

  const claimEnergy = async () => {
    if (!account) return [];

    const payload = {
      data: {
        type: "entry_function_payload",
        function: `${moduleAddress}::user3::claim_energy`,
        type_arguments: [],
        functionArguments: [],
      },
    };
    try {
      const response = await signAndSubmitTransaction(payload);
      console.log(response);
      await client.waitForTransaction(response.hash);
      // setAccountHasList(true);
    } catch (error) {
    } finally {
    }
  };
  const reduceEnergyByTime = async () => {
    if (!account) return [];
    const payload = {
      data: {
        type: "entry_function_payload",
        function: `${moduleAddress}::user3::reduce_energy_by_time`,
        type_arguments: [],
        functionArguments: [60], //duration in seconds
      },
    };
    try {
      // sign and submit transaction to chain
      const response = await signAndSubmitTransaction(payload);
      console.log(response);
      await client.waitForTransaction(response.hash);
      getEnergy();
    } catch (error) {
    } finally {
    }
  };

  const completeCycle = async (cycleCount) => {
    if (!account) return [];
    const payload = {
      data: {
        type: "entry_function_payload",
        function: `${moduleAddress}::task3::complete_cycle`,
        type_arguments: [],
        functionArguments: [existingTaskId, cycleCount],
      },
    };

    try {
      const response = await signAndSubmitTransaction(payload);
      await client.waitForTransaction(response.hash);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

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
      const filtered = tasks?.find((task) => task._id === id);
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
    const filtered = tasks?.filter((task) => task.status != status);
    console.log(taskId);
    // setFilteredTasks(filtered);
    if (taskId) {
      setSelectedTaskId(taskId);
      handleSelectDataFunc(taskId);
    }
  }, []);
  useEffect(() => {
    getEnergy();
  }, [account?.address]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTime = new Date();
      const currentMinutes = currentTime.getMinutes();
      setMinutes(currentMinutes);
      const userData = getUserData();
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
            const findData = tasks?.find((task) => task._id === selectedTaskId);
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
              reduceEnergyByTime();
            }

            updateUserData({ energy: energy });
          } else if (currentState === "shortBreak") {
            const tasks = getTaskData();
            const findData = tasks?.find((task) => task._id === selectedTaskId);
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
              energy = userData?.energy - 1;
              reduceEnergyByTime();
            }

            updateUserData({ energy: energy });
          } else if (currentState === "longBreak") {
            const tasks = getTaskData();
            const findData = tasks?.find((task) => task._id === selectedTaskId);
            let energy = 0;
            if (userData.energy) {
              energy = userData?.energy;
            }

            if (
              ((seconds - 1) % 60 === 0 && (seconds - 1) % 300 !== 0) ||
              seconds - 1 === 0
            ) {
              energy = userData?.energy - 1;
              reduceEnergyByTime();
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
      completeCycle(settings.focusDuration);
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
      const updatedFilteredTasks = updatedTasks?.filter(
        (task) => task.status !== "Completed"
      );

      updateTaskStatusInLocalStorage(selectedTaskId, "Completed");
      completeCycle(settings.focusDuration);
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
  useEffect(() => {
    // getEnergy();
  }, [account]);
  setInterval(() => {
    const userData = getUserData();
    const currentTime = new Date();
    const minutes = currentTime.getMinutes();

    // Check if it's a multiple of 5 minutes and energy is less than 100
    if (minutes % 5 === 0 && userData?.energy < 100) {
      userData.energy += 1;
      saveUserData(userData);
      // claimEnergy();
    }
  }, 100000);
  useEffect(() => {
    const updateEnergy = () => {
      const userData = getUserData();
      const currentTime = new Date();
      const minutes = currentTime.getMinutes();
      console.log(minutes);
      // Check if it's a multiple of 5 minutes and energy is less than 100
      if (minutes % 5 === 0 && userData?.energy < 100) {
        userData.energy += 1;
        saveUserData(userData);
        // claimEnergy();
      }
    };

    intervalRef.current = setInterval(updateEnergy, 100000); //100000

    return () => clearInterval(intervalRef.current);
  }, []);
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
