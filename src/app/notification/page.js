"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import GoBackBtn from "@/components/button/GoBackBtn";
import React, { useEffect, useState } from "react";
import { Outfit } from "next/font/google";
import Link from "next/link";
import { TbMessage2Check } from "react-icons/tb";
import { FiBox } from "react-icons/fi";
import { LuBadgeInfo } from "react-icons/lu";
import "../../style/notification/notification.scss";
import { useNotifications } from "../../components/notification/getNotifications";
import Pagination from "@/components/button/Pagination";
import { getFormattedDateTime } from "@/components/common/datetime";
import { truncateString } from "@/components/common/truncate";

const outfit = Outfit({ subsets: ["latin"] });

const Page = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const notificationsPerPage = 9; // Set the number of notifications per page
  const { data: notificationList, isLoading, isError } = useNotifications();
  const { notifications, limit, total_count } = notificationList || {};
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const paginatedNotifications = notifications?.slice(
    (currentPage - 1) * notificationsPerPage,
    currentPage * notificationsPerPage
  );
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
                Recent<p>{total_count ? total_count : 0}</p>
              </div>
            </div>
            <div className="clear-btn">
              <button>Clear All</button>
            </div>
          </div>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <div className="notification-inner pt-16">
              {paginatedNotifications?.map((item, id) => {
                return (
                  <Link key={id} href={`/notification/${item?.id}`}>
                    <div
                      key={id}
                      className="message-box flex   justify-between items-start py-5"
                    >
                      <div className="flex  gap-8 items-start">
                        <div
                          style={notificationIconStyle}
                          className="icon  w mt-1"
                        >
                          <TbMessage2Check />
                        </div>
                        <div className="message">
                          <p>{truncateString(item?.name, 5)}</p>
                          <p>{truncateString(item?.contents?.en, 5)}</p>
                        </div>
                      </div>

                      <span className={outfit.className}>
                        {getFormattedDateTime(item?.completed_at)
                          .formattedDate +
                          " " +
                          getFormattedDateTime(item?.completed_at)
                            .formattedTime}
                      </span>
                    </div>{" "}
                  </Link>
                );
              })}

              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(total_count / notificationsPerPage)}
                onPageChange={handlePageChange}
              />
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
