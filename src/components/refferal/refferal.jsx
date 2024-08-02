import React from "react";
import Image from "next/image";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import Welcome from "@/assets/refferal/welcome.png";
import { Outfit } from "next/font/google";
import "@/style/refferal/refferal.scss";
import { FaFacebookMessenger } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import TabSection from "../tabs";

const outfit = Outfit({ subsets: ["latin"] });

const RefferalComp = () => {
  return (
    <div className="account">
      <div className="addcontainer 2xl:px-5 lg:px-14 md:px-10 sm:px-6 max-sm:px-3">
        <div className="account-top">
          <TabSection />
          <div className="m-auto max-width   min-h-screen lg:mt-[-400px]">
            <h2 className={`flex justify-center ${outfit.className}`}>
              Refferal
            </h2>
            <div className="refferal  mt-6  items-center justify-center flex flex-col gap-4">
              <div className="referral-intro flex flex-col items-center justify-center">
                <span className={`refferal-intro-span`}>
                  Give your friends 10% off, and earn $8 when they buy.
                </span>
                <span className="refferal-intro-span">
                  One sharing, more happy people
                </span>
              </div>
              <div className="referral-intro-welcome">
                <Image height={300} width={300} src={Welcome} alt="" />
              </div>
              <div className="refferal-intro-div flex items-center justify-center">
                <input
                  type="text"
                  value="http://localhost:3000/account?referral="
                  className="refferal-intro-input-input p-2 outline-none"
                />
                <button className="refferal-intro-input-button text-white flex items-center justify-center">
                  <ContentCopyIcon />
                </button>
              </div>
              <div className="refferal-intro-social flex gap-5 items-center justify-center">
                <FaFacebook
                  className="cursor-pointer"
                  size={40}
                  color="#3b5998"
                />
                <FaFacebookMessenger
                  className="cursor-pointer"
                  size={40}
                  color="#00B2FF"
                />
                <FaWhatsapp
                  className="cursor-pointer"
                  size={40}
                  color="#25D366"
                />
                <FaXTwitter
                  className="cursor-pointer"
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
