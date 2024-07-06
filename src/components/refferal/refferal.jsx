"use client";

import Image from "next/image";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import HistoryIcon from "@mui/icons-material/History";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import CreateIcon from "@mui/icons-material/Create";
import Welcome from "@/assets/refferal/welcome.png";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import "@/style/refferal/refferal.scss";
import { useContext, useState } from "react";
import Link from "next/link";
import { FaFacebookMessenger, FaTwitch } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Urbanist, Inter } from "next/font/google";
import { FaFacebook } from "react-icons/fa";
import { TaskContext } from "@/app/task/context/taskContext";
const { FaArrowRightArrowLeft } = require("react-icons/fa6");
const { TbCircleLetterT } = require("react-icons/tb");
const { default: GoBackBtn } = require("../button/GoBackBtn");
const { Avatar } = require("@mui/material");
const outfit = Outfit({ subsets: ["latin"] });
const urbanist = Urbanist({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });
const RefferalComp = () => {
  const { slug, setSlug } = useContext(TaskContext);
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
          <div className="  m-auto min-h-screen lg:mt-[-400px]">
            <h2 className={`flex justify-center ${outfit.className}`}>
              Refferal
            </h2>
            <div className="refferal max-width1 mt-6   md:pr-24 items-center justify-center  flex flex-col gap-4">
              <div className="referral-intro flex flex-col items-center justify-center ">
                <span
                  style={{ fontFamily: urbanist }}
                  className="refferal-intro-span"
                >
                  Give your friends 10% off, and earn $8 when they buy.
                </span>
                <span
                  style={{ fontFamily: urbanist }}
                  className="refferal-intro-span"
                >
                  One sharing ,more happy people
                </span>
              </div>
              <div className="referral-intro-welcome">
                <Image height={300} width={300} src={Welcome} alt="" />
              </div>
              <div className="refferal-intro-div flex  items-center justify-center">
                <input
                  type="text"
                  style={{ fontFamily: inter }}
                  className="refferal-intro-input-input p-2  outline-none"
                />
                <button className="refferal-intro-input-button text-white   flex items-center justify-center">
                  <ContentCopyIcon />{" "}
                </button>
              </div>
              <div className="refferal-intro-social flex gap-5 items-center justify-center">
                <FaFacebook
                  className=" cursor-pointer"
                  size={40}
                  color="#3b5998"
                />
                <FaFacebookMessenger
                  className=" cursor-pointer"
                  size={40}
                  color="#00B2FF"
                />
                <FaWhatsapp
                  className=" cursor-pointer"
                  size={40}
                  color="#25D366"
                />
                <FaXTwitter
                  className=" cursor-pointer"
                  size={40}
                  color="black"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RefferalComp;
