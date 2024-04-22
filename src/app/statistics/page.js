"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Urbanist, Outfit } from "next/font/google";
import { IoMdEye } from "react-icons/io";
import "../../style/statistics/statistics.scss";
import GoBackBtn from "@/components/button/GoBackBtn";
import { AppContext } from "../../components/aptosIntegrations/AppContext";

import Chart from "chart.js/auto";
import moment from "moment";
import { Bar } from "react-chartjs-2";

const outfit = Outfit({ subsets: ["latin"] });
const urban = Urbanist({ subsets: ["latin"] });

const Page = () => {
  const [timeRange, setTimeRange] = useState("Weekly");
  const [data, setData] = useState(
    JSON.parse(
      typeof window !== "undefined" ? localStorage.getItem("statistics") : null
    ) || {}
  );

  const getFilteredData = () => {
    switch (timeRange) {
      case "Monthly":
        return getMonthlyData(data);
      case "Yearly":
        return getYearlyData(data);
      default:
        return getWeeklyData(data);
    }
  };

  const getMonthlyData = (data) => {
    const monthlyData = Object.entries(data).reduce((acc, [date, userData]) => {
      Object.values(userData).forEach(({ focus, shortBreak, longBreak }) => {
        const [day, month, year] = date.split("/");
        const monthKey = `${year}/${month}`;

        if (!acc[monthKey]) {
          acc[monthKey] = { focus: 0, shortBreak: 0, longBreak: 0 };
        }

        acc[monthKey].focus += focus;
        acc[monthKey].shortBreak += shortBreak;
        acc[monthKey].longBreak += longBreak;
      });

      return acc;
    }, {});

    return monthlyData;
  };

  const getYearlyData = (data) => {
    const yearlyData = Object.entries(data).reduce((acc, [date, userData]) => {
      Object.values(userData).forEach(({ focus, shortBreak, longBreak }) => {
        const year = date.split("/")[2];

        if (!acc[year]) {
          acc[year] = { focus: 0, shortBreak: 0, longBreak: 0 };
        }

        acc[year].focus += focus;
        acc[year].shortBreak += shortBreak;
        acc[year].longBreak += longBreak;
      });

      return acc;
    }, {});

    return yearlyData;
  };

  const getWeeklyData = (data) => {
    const currentDate = moment();
    const lastSevenDaysData = Object.entries(data).reduce(
      (acc, [date, userData]) => {
        Object.values(userData).forEach(({ focus, shortBreak, longBreak }) => {
          const dataDate = moment(date, "DD/MM/YYYY");
          const daysDifference = currentDate.diff(dataDate, "days");

          if (daysDifference >= 0 && daysDifference < 7) {
            if (!acc[date]) {
              acc[date] = {};
            }

            acc[date] = {
              ...acc[date],
              focus: (acc[date].focus || 0) + focus,
              shortBreak: (acc[date].shortBreak || 0) + shortBreak,
              longBreak: (acc[date].longBreak || 0) + longBreak,
            };
          }
        });

        return acc;
      },
      {}
    );

    return lastSevenDaysData;
  };

  const calculateTotalAndAverageTime = (data) => {
    const total = { combined: 0 };
    let count = { combined: 0 };

    // Calculate total time and count for combined time
    Object.values(data).forEach(({ focus, shortBreak, longBreak }) => {
      const combinedTime = focus + shortBreak + longBreak;
      total.combined += combinedTime;

      if (combinedTime > 0) count.combined++;
    });

    // Calculate average time for combined time
    const average = {
      combined:
        count.combined > 0 ? Math.round(total.combined / count.combined) : 0,
    };

    // Convert total and average time to HH:mm format
    const convertToHHMM = (minutes) => {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return `${hours.toString().padStart(2, "0")}:${mins
        .toString()
        .padStart(2, "0")}`;
    };

    return {
      total: {
        combined: convertToHHMM(total.combined),
      },
      average: {
        combined: convertToHHMM(average.combined),
      },
    };
  };

  //   calculate weeklyData
  const totalSummary = calculateTotalAndAverageTime(getFilteredData());

  // chart Data
  const chartData = {
    labels: Object.keys(getFilteredData()),
    datasets: [
      {
        label: "Focus (min)",
        backgroundColor: "#2ad5b9",
        data: Object.values(getFilteredData()).map((item) => item.focus / 60),
      },
      {
        label: "Short Break (min)",
        backgroundColor: "#2596be",
        data: Object.values(getFilteredData()).map(
          (item) => item.shortBreak / 60
        ),
      },
      {
        label: "Long Break (min)",
        backgroundColor: "#ffcc29",
        data: Object.values(getFilteredData()).map(
          (item) => item.longBreak / 60
        ),
      },
    ],
  };

  const options = {
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  return (
    <AppContext>
      <div>
        <section className="statistics">
          <div className="addcontainer 2xl:px-5 lg:px-14 md:px-10 sm:px-6 max-sm:px-3">
            <div className="statistics-title">
              <Link href={"/"}>
                <GoBackBtn />
              </Link>
            </div>
            <div className="statistics-inner">
              <h2 className={`${outfit.className}`}>Statistics</h2>
              <div className={`week-month-year-btn pb-5 ${urban.className}`}>
                <button
                  onClick={() => setTimeRange("Weekly")}
                  className={
                    timeRange === "Weekly" ? "bg-orange-500 text-white" : ""
                  }
                >
                  Week
                </button>
                <button
                  onClick={() => setTimeRange("Monthly")}
                  className={
                    timeRange === "Monthly" ? "bg-orange-500 text-white" : ""
                  }
                >
                  Month
                </button>
                <button
                  onClick={() => setTimeRange("Yearly")}
                  className={
                    timeRange === "Yearly" ? "bg-orange-500 text-white" : ""
                  }
                >
                  Year
                </button>
              </div>
              <div className="weekly-summ p-5 shadow-sm">
                <div className="summ-title flex items-center space-x-3 pb-3">
                  <IoMdEye className="text-[22px]" />
                  <h4 suppressHydrationWarning={true} className="font-semibold">
                    {timeRange} Summary
                  </h4>
                </div>
                <div className="summ-body flex justify-between items-center pt-5">
                  <div className="first">
                    <p
                      suppressHydrationWarning={true}
                      className="font-semibold"
                    >
                      {totalSummary?.total?.combined} min
                    </p>
                    <p className="text-[#969696]">Total</p>
                  </div>
                  <div className="first">
                    <p
                      suppressHydrationWarning={true}
                      className="font-semibold"
                    >
                      {totalSummary?.average?.combined} min
                    </p>
                    <p className="text-[#969696]">Average</p>
                  </div>
                </div>
              </div>
              <div className="statistics-bar shadow-sm">
                <Bar data={chartData} options={options} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </AppContext>
  );
};

export default Page;
