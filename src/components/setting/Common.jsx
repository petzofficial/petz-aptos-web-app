"use client";
import Link from "next/link";
import React from "react";
import GoBackBtn from "../button/GoBackBtn";
import { TbChecklist } from "react-icons/tb";
import { RiLockPasswordLine } from "react-icons/ri";
import { FiHeadphones } from "react-icons/fi";
import { FaUserPen } from "react-icons/fa6";
import { Outfit } from "next/font/google";
import { IoIosArrowForward } from "react-icons/io";
import { LuBadgeInfo } from "react-icons/lu";
import SettingMain from "./SettingMain";
import SettingAbout from "./SettingAbout";
import Terms from "./Terms";
import Privacy from "./Privacy";
import Support from "./Support";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
const outfit = Outfit({ subsets: ["latin"] });

const items = [
  {
    id: 1,
    name: "About",
    slug: "about",
    Icon: LuBadgeInfo,
  },
  {
    id: 2,
    name: "Terms & Conditions",
    slug: "terms-conditions",
    Icon: TbChecklist,
  },
  {
    id: 3,
    name: "Privacy Policy",
    slug: "privacy-policy",
    Icon: RiLockPasswordLine,
  },
  {
    id: 4,
    name: "Help & Support",
    slug: "help-support",
    Icon: FiHeadphones,
  },
  {
    id: 5,
    name: "Disconnect wallet",
    slug: "account",
    Icon: FaUserPen,
  },
];

const Common = ({ method }) => {
  const { account, disconnect } = useWallet();
  const handleLogout = () => {
    disconnect();

    localStorage.removeItem("AptosWalletName");
    window.location.reload();
  };
  return (
    // <AppContext>
    <div className="setting-inner lg:mb-16 max-lg:mb-8">
      <Link href={"/"} className="text-[30px] font-bold">
        <GoBackBtn />
      </Link>
      <div className="setting-left">
        <div
          className={`setting-left-navbar flex flex-col lg:space-y-10 space-y-7 ${outfit.className}`}
        >
          {items.map((item) => {
            return (
              <div key={item.id} className="nav-item flex items-center">
                <div className="s-icon text-[20px]">
                  <item.Icon />
                </div>
                <div className="flex items-center flex-1">
                  {item.slug === "account" ? (
                    <h4
                      onClick={handleLogout}
                      className={`ml-3 cursor-pointer xl:w-[200px] ${
                        item.slug === method ? "text-[#FF6900]" : ""
                      }`}
                    >
                      {item.name}
                    </h4>
                  ) : (
                    <Link href={`/setting/${item.slug}`}>
                      <h4
                        className={`ml-3 cursor-pointer xl:w-[200px] ${
                          item.slug === method ? "text-[#FF6900]" : ""
                        }`}
                      >
                        {item.name}
                      </h4>
                    </Link>
                  )}
                  <IoIosArrowForward />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="setting-right max-lg:pt-10 m-auto lg:mt-[-374px]">
        {method === "main" ? <SettingMain /> : ""}
        {method === "about" ? <SettingAbout /> : ""}
        {method === "terms-conditions" ? <Terms /> : ""}
        {method === "privacy-policy" ? <Privacy /> : ""}
        {method === "help-support" ? <Support /> : ""}
      </div>
    </div>
    // </AppContext>
  );
};

export default Common;
