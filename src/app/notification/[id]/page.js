"use client";
import { useParams } from "next/navigation";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import GoBackBtn from "@/components/button/GoBackBtn";
import React, { useEffect, useState } from "react";
import { Outfit } from "next/font/google";
import Link from "next/link";
import "@/style/notification/notification.scss";
import { FetchSingleNotifications } from "@/components/notification/getNotifications";
import { getFormattedDateTime } from "@/components/common/datetime";
const outfit = Outfit({ subsets: ["latin"] });
const Page = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState([]);
  useEffect(() => {
    const FetchData = async () => {
      try {
        setLoading(true);
        const response = await FetchSingleNotifications(id);
        console.log(response);
        setNotification(response);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    FetchData();
  }, []);

  return (
    <div>
      <Navbar method={"notification"} />

      <section className="notification">
        <div className="addcontainer 2xl:px-5 lg:px-14 md:px-10 sm:px-6 max-sm:px-3">
          <div className="notification-title-bar">
            <Link href={"/home"} className="text-[30px] font-bold flex-1">
              <GoBackBtn />
            </Link>
          </div>

          <div className="info-inner">
            <div className="not-box flex-1">
              <h3>Notification</h3>
            </div>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="info mt-12">
                <div className="title">
                  <h4>{notification.name}</h4>
                </div>

                <div className="flex justify-between my-2">
                  <span className={outfit.className}>
                    {getFormattedDateTime(notification?.completed_at)
                      .formattedDate +
                      " " +
                      getFormattedDateTime(notification?.completed_at)
                        .formattedTime}
                    ;
                  </span>
                </div>
                <div className="description">
                  <p>{notification?.contents?.en}</p>
                  <p className="my-10 max-md:mt-4"></p>
                </div>
                {notification?.global_image && (
                  <div>
                    <img src={notification?.global_image} alt="" />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Page;
