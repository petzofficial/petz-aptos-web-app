"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import GoBackBtn from "@/components/button/GoBackBtn";
import React from "react";
import { Outfit } from "next/font/google";
import Link from "next/link";
import { TbMessage2Check } from "react-icons/tb";
import { FiBox } from "react-icons/fi";
import { LuBadgeInfo } from "react-icons/lu";
import "../../style/notification/notification.scss";
import Pagination from "@/components/button/Pagination";
import { useState, useEffect } from "react";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";

const outfit = Outfit({ subsets: ["latin"] });

const Page = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Replace with your OneSignal App ID and REST API Key
    const appId = "1d687e3b-eae1-4d68-b7c5-eebf24226a9e";
    const apiKey = "MmNlMzEwZjUtZTZmMi00ZmI5LWE0ZDEtZDdlNzliNWVkODk5";
    // Replace with the subscriber's player ID
    const notificationUserId = (typeof window !== 'undefined' ? localStorage.getItem("notificationUserId") : null);
    const playerId = notificationUserId;

    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          `https://onesignal.com/api/v1/notifications?app_id=${appId}&player_id=${playerId}`,
          {
            headers: {
              Authorization: `Basic ${apiKey}`,
            },
          }
        );
        setNotifications(response.data.notifications);
        localStorage.setItem('all-notifications', JSON.stringify(response.data.notifications))
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  const convertTimestampToTimeAgo = (timestamp) => {
    const timestampInMilliseconds = timestamp * 1000;
    const currentDate = new Date();
    const diffInMilliseconds = currentDate - timestampInMilliseconds;
    const seconds = Math.floor(diffInMilliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    if (hours >= 24) {
      const days = Math.floor(hours / 24);
      return `${days} day ago`;
    } else if (hours >= 1) {
      return `${hours} hour ago`;
    } else if (minutes >= 1) {
      return `${minutes} min ago`;
    } else {
      return `${seconds} sec ago`;
    }
  };

  return (
    <div>
      <Navbar method={"notification"} />

      <section className="notification">
        <div className="addcontainer 2xl:px-5 lg:px-14 md:px-10 sm:px-6 max-sm:px-3">
          <div className="notification-title-bar flex justify-between items-start">
            <Link href={"/home"} className="text-[30px] font-bold ">
              <GoBackBtn />
            </Link>
            <div className="not-box">
              <h3>Notification</h3>
              <div
                className={`font-semibold text-center flex justify-center items-center ${outfit.className}`}
              >
                Recent<p>4</p>
              </div>
            </div>
            <div className="clear-btn">
              <button>Clear All</button>
            </div>
          </div>

          <div className="notification-inner pt-16">
            {notifications.map((item) => {
              return (
                <div
                  key={item.id}
                  className="message-box flex justify-between items-start py-5"
                >
                  <div className="icon mt-1">
                    <TbMessage2Check />
                  </div>
                  <Link href={`/notification/information?id=${item.id}`}>
                    <div className="message">
                      <h3>{item.headings.en}</h3>
                      <p>Tap to see the message</p>
                    </div>
                  </Link>
                  <span className={outfit.className}>
                    {convertTimestampToTimeAgo(item.send_after)}
                  </span>
                </div>
              );
            })}

            <Pagination />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Page;
