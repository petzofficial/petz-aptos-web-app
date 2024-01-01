"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import GoBackBtn from "@/components/button/GoBackBtn";
import React, { useState } from "react";
import { Outfit } from "next/font/google";
import Link from "next/link";
import "../../../style/notification/notification.scss";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const outfit = Outfit({ subsets: ["latin"] });

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const itemID = searchParams.get("id");
  const [notification, setNotification] = useState(
    JSON.parse((typeof window !== 'undefined' ? localStorage.getItem("all-notifications") : null))?.find(
      (item) => item.id == itemID
    )
  );

  if (!notification) {
    router.push("/home", { scroll: true });
  }

  const convertTimestampToDate = (timestamp) => {
    const timestampInMilliseconds = timestamp * 1000;
    const date = new Date(timestampInMilliseconds);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);

    return formattedDate;
  };

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
            <div className="info mt-12">
              <div className="title">
                <p>{notification.headings.en}</p>
              </div>
              <div className="flex justify-between my-2">
                <p>Lorem Ipsum</p>
                <p className="font-semibold">2.54 ETH</p>
              </div>
              <div className="flex justify-between my-2">
                <p>Paid On</p>
                <p className="font-semibold">{convertTimestampToDate(notification.queued_at)}</p>
              </div>

              <div className="description">
                <h4>Description</h4>
                <p>{notification.contents.en}</p>
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
