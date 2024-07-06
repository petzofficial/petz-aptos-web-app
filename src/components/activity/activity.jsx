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
const outfit = Outfit({ subsets: ["latin"] });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });
const urbanist = Urbanist({ subsets: ["latin"] });
const ActivityComp = () => {
  const { slug, setSlug } = useContext(TaskContext);
  console.log(slug);
  return (
    <div className="account">
      <div className="addcontainer 2xl:px-5 lg:px-14 md:px-10 sm:px-6 max-sm:px-3">
        <div className="account-top">
          <div className="xl:w-[250px] lg:w-[200px] max-md:m-auto">
            <Link href={"/home"} className="text-[30px] font-bold">
              <GoBackBtn />
            </Link>

            <div className="token-trans-btn ">
              <button
                className={`${
                  slug === "token" ? "bg-[#FEE4D1] text-[#FF6900]" : ""
                }`}
                onClick={() => setSlug("token")}
              >
                <TbCircleLetterT /> <span>Token</span>
              </button>
              <button
                className={`${
                  slug === "transactions" ? "bg-[#FEE4D1] text-[#FF6900]" : ""
                }`}
                onClick={() => setSlug("transactions")}
              >
                <FaArrowRightArrowLeft /> <span>Transactions</span>
              </button>
              <button
                className={`${
                  slug === "profile" ? "bg-[#FEE4D1] text-[#FF6900]" : ""
                }`}
                onClick={() => setSlug("profile")}
              >
                <Avatar style={{ height: "25px", width: "25px" }} />{" "}
                <span>Profile</span>
              </button>
              <button
                className={`${
                  slug === "activity" ? "bg-[#FEE4D1] text-[#FF6900]" : ""
                }`}
                onClick={() => setSlug("activity")}
              >
                <HistoryIcon />
                <span>Activity</span>
              </button>
              <button
                className={`${
                  slug === "refferal" ? "bg-[#FEE4D1] text-[#FF6900]" : ""
                }`}
                onClick={() => setSlug("refferal")}
              >
                <ThumbUpOffAltIcon />
                <span>Referral</span>
              </button>
              {/* <span className="marketPlace flex items-center justify-center  font-bold cursor-pointer">
                                NFT Marketplace
                            </span> */}
            </div>
          </div>
          <div className="max-width1  m-auto min-h-screen mb-8 lg:mt-[-400px]">
            <h2 className={`flex justify-center ${outfit.className}`}>
              Activity
            </h2>
            <div className="activity overscroll-auto mt-8">
              <div className="activity-header flex items-center  justify-around">
                <span className="timestamp">Timestamp</span>
                <span className="timestamp">Action</span>
                <span className="timestamp">IP Address</span>
              </div>
              <div className="activity-body flex items-start justify-around p-3">
                <span
                  style={{ fontFamily: urbanist }}
                  className="activity-body-span "
                >
                  3 min ago
                </span>
                <span
                  style={{ fontFamily: urbanist }}
                  className="activity-body-span "
                >
                  Changed Profile
                </span>
                <span
                  style={{ fontFamily: urbanist }}
                  className="activity-body-span "
                >
                  123.22.4312
                </span>
              </div>
              <div className="activity-line"></div>
              <div className="activity-body flex items-start justify-around p-3">
                <span className="activity-body-span ">3 min ago</span>
                <span className="activity-body-span ">Changed Profile</span>
                <span className="activity-body-span ">123.22.4312</span>
              </div>
              <div className="activity-line"></div>
              <div className="activity-body flex items-start justify-around p-3">
                <span className="activity-body-span ">3 min ago</span>
                <span className="activity-body-span ">Changed Profile</span>
                <span className="activity-body-span ">123.22.4312</span>
              </div>
              <div className="activity-line"></div>{" "}
              <div className="activity-body flex items-start justify-around p-3">
                <span className="activity-body-span ">3 min ago</span>
                <span className="activity-body-span ">Changed Profile</span>
                <span className="activity-body-span ">123.22.4312</span>
              </div>
              <div className="activity-line"></div>{" "}
              <div className="activity-body flex items-start justify-around p-3">
                <span className="activity-body-span ">3 min ago</span>
                <span className="activity-body-span ">Changed Profile</span>
                <span className="activity-body-span ">123.22.4312</span>
              </div>
              <div className="activity-line"></div>
              <div className="activity-body flex items-start justify-around p-3">
                <span className="activity-body-span ">3 min ago</span>
                <span className="activity-body-span ">Changed Profile</span>
                <span className="activity-body-span ">123.22.4312</span>
              </div>
              <div className="activity-line"></div>
              <div className="activity-body flex items-start justify-around p-3">
                <span className="activity-body-span ">3 min ago</span>
                <span className="activity-body-span ">Changed Profile</span>
                <span className="activity-body-span ">123.22.4312</span>
              </div>
              <div className="activity-line"></div>{" "}
              <div className="activity-body flex items-start justify-around p-3">
                <span className="activity-body-span ">3 min ago</span>
                <span className="activity-body-span ">Changed Profile</span>
                <span className="activity-body-span ">123.22.4312</span>
              </div>
              <div className="activity-line"></div>{" "}
              <div className="activity-body flex items-start justify-around p-3">
                <span className="activity-body-span ">3 min ago</span>
                <span className="activity-body-span ">Changed Profile</span>
                <span className="activity-body-span ">123.22.4312</span>
              </div>
              <div className="activity-line"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ActivityComp;
