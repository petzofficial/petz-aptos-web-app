"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import GoBackBtn from "@/components/button/GoBackBtn";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import img1 from "@/assets/home/pgt-removebg-preview 2.png";
import img2 from "@/assets/home/pst-removebg-preview 2.png";
import img3 from "@/assets/home/image 23.png";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import "../../style/account/account.scss";
import { TbCircleLetterT } from "react-icons/tb";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { IoCopy } from "react-icons/io5";
import Token from "../../components/account/Token";
import Transactions from "../../components/account/Transactions";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

const outfit = Outfit({ subsets: ["latin"] });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

import { CopyToClipboard } from "react-copy-to-clipboard";
import { AppContext } from "@/components/aptosIntegrations/AppContext";
import { Tooltip } from "@mui/material";

const Page = () => {
  const [slug, setSlug] = useState("token");
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const { connected, account, wallet } = useWallet();
  console.log("these are from account info");
  console.log(connected, account);
  const copyAddress = async (e) => {
    await navigator.clipboard.writeText(account?.address);
    setTooltipOpen(true);

    setTimeout(() => {
      setTooltipOpen(false);
    }, 2000);
  };

  return (
    <AppContext>
      <div>
        <Navbar method={"account"} />

        <section className="account">
          <div className="addcontainer 2xl:px-5 lg:px-14 md:px-10 sm:px-6 max-sm:px-3">
            <div className="account-top">
              <div className="xl:w-[250px] lg:w-[200px] max-md:m-auto">
                <Link href={"/home"} className="text-[30px] font-bold">
                  <GoBackBtn />
                </Link>

                <div className="token-trans-btn">
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
                      slug === "transactions"
                        ? "bg-[#FEE4D1] text-[#FF6900]"
                        : ""
                    }`}
                    onClick={() => setSlug("transactions")}
                  >
                    <FaArrowRightArrowLeft /> <span>Transactions</span>
                  </button>
                </div>
              </div>
              <div className="max-width m-auto lg:mt-[-214px]">
                <h2 className={`flex justify-center ${outfit.className}`}>
                  Account
                </h2>
                <div className="first-box flex justify-between items-center mt-8">
                  <div className="flex items-center space-x-1">
                    <Image src={img1} width={30} height={30} alt="PGT" />
                    <p>100 PGT</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Image src={img2} width={30} height={30} alt="PST" />
                    <p>100 PST</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Image src={img3} width={30} height={30} alt="100 APT" />
                    <p>100 APT</p>
                  </div>
                </div>

                <div
                  style={{ width: "max-content" }}
                  className="first-box flex justify-between items-center mt-5 max-sm:!px-[5px]"
                >
                  <p className="max-sm:text-[12px]">
                    {connected ? <>{account?.address}</> : <>not connected</>}
                  </p>

                  <Tooltip
                    title="Copied"
                    placement="bottom-end"
                    open={tooltipOpen}
                    disableFocusListener
                    disableHoverListener
                    disableTouchListener
                  >
                    <button
                      onClick={() => copyAddress()}
                      className="text-[#FF6900]"
                    >
                      <IoCopy />
                    </button>
                  </Tooltip>
                </div>
                <div className="first-box mt-5">
                  <div className="box-inner flex items-center mt-3">
                    <div className="skill flex-1">
                      <p className="">Level</p>
                      <div className="skill-bar skill2 wow slideInLeft animated">
                        <span className="skill-count2"></span>
                      </div>
                    </div>
                    <h4 className={`ml-3 -mt-2 font-bold ${jakarta.className}`}>
                      60%
                    </h4>
                  </div>
                  <div className="box-inner flex items-center">
                    <div className="skill flex-1">
                      <p className="">Energy</p>
                      <div className="skill-bar skill3 wow slideInLeft animated">
                        <span className="skill-count2"></span>
                      </div>
                    </div>
                    <h4 className="ml-3 -mt-2 font-bold">80%</h4>
                  </div>
                </div>
              </div>
            </div>

            <div className="account-inner">
              {slug === "token" ? <Token /> : ""}
              {slug === "transactions" ? <Transactions /> : ""}
            </div>
          </div>
        </section>

        <Footer />
      </div>{" "}
    </AppContext>
  );
};

export default Page;
