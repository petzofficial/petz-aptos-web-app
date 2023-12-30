"use client";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import GoBackBtn from "../../components/button/GoBackBtn";
import React, { useEffect, useState } from "react";
import { Outfit } from "next/font/google";
import Link from "next/link";
import { TbMessage2Check } from "react-icons/tb";
import { FiBox } from "react-icons/fi";
import { LuBadgeInfo } from "react-icons/lu";
import "../../style/notification/notification.scss";
import Pagination from "../../components/button/Pagination";
import { FetchNotifications } from "../../components/notification/getNotifications";
const outfit = Outfit({ subsets: ["latin"] });

const Page = () => {
  const [loading, setLoading] = useState(true);
  const [totalNotifications, setTotalNotifications] = useState(0);
  const [notificationList, setNotificationList] = useState([]);
  useEffect(() => {
    const FetchData = async () => {
      try {
        setLoading(true);
        const response = await FetchNotifications();
        const { total_count, notifications, limit, offset } = response;
        setTotalNotifications(total_count);
        setNotificationList(notifications);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching notifications:", error);
      }
    };
    FetchData();
  }, []);

  const notificationIconStyle = {
    height: "30px",
    width: "30px",
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
                Recent<p>{totalNotifications}</p>
              </div>
            </div>
            <div className="clear-btn">
              <button>Clear All</button>
            </div>
          </div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="notification-inner pt-16">
              {notificationList?.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="message-box flex justify-between items-start py-5"
                  >
                    {item?.global_image ? (
                      <div style={notificationIconStyle} className="icon mt-1">
                        <img src={item?.global_image} alt="" />
                      </div>
                    ) : (
                      ""
                    )}

                    <Link href={`/notification/${item?.id}`}>
                      <div className="message">
                        <h3>{item.name}</h3>
                        <p>Tap to see the message</p>
                      </div>
                    </Link>
                    <span className={outfit.className}>2 m ago</span>
                  </div>
                );
              })}

              <Pagination />
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Page;

const items = [
  {
    id: 1,
    title: "Lorem ipsum dolor sit amet",
    Icon: TbMessage2Check,
  },
  {
    id: 2,
    title: "Lorem ipsum dolor sit amet",
    Icon: FiBox,
  },
  {
    id: 3,
    title: "Lorem ipsum dolor sit amet",
    Icon: TbMessage2Check,
  },
  {
    id: 4,
    title: "Lorem ipsum dolor sit amet",
    Icon: LuBadgeInfo,
  },
  {
    id: 5,
    title: "Lorem ipsum dolor sit amet",
    Icon: TbMessage2Check,
  },
  {
    id: 6,
    title: "Lorem ipsum dolor sit amet",
    Icon: FiBox,
  },
  {
    id: 7,
    title: "Lorem ipsum dolor sit amet",
    Icon: TbMessage2Check,
  },
  {
    id: 8,
    title: "Lorem ipsum dolor sit amet",
    Icon: LuBadgeInfo,
  },
];
