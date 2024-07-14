"use client";

import HistoryIcon from "@mui/icons-material/History";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import CreateIcon from "@mui/icons-material/Create";
import { Outfit, Urbanist } from "next/font/google";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { TaskContext } from "@/app/task/context/taskContext";
import { AptosClient } from "aptos";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
const { FaArrowRightArrowLeft } = require("react-icons/fa6");
const { TbCircleLetterT } = require("react-icons/tb");
const { default: GoBackBtn } = require("../button/GoBackBtn");
const { Avatar } = require("@mui/material");
const outfit = Outfit({ subsets: ["latin"] });
const urbanist = Urbanist({ subsets: ["latin"] });

const ProfileComp = () => {
  const {
    slug,
    setSlug,
    isProfileEditing,
    setIsProfileEditing,
    isHavingAccount,
    setIsHavingAccount,
  } = useContext(TaskContext);
  const [accountHasProfile, setAccountHasProfile] = useState(false);
  const { account, signAndSubmitTransaction } = useWallet();
  const [selectedProfile, setSelectedProfile] = useState("");
  const [data, setData] = useState({
    username: "",
    name: "",
    email: "",
    phone: "",
    birthday: "",
    gender: "",
    bio: "",
    user_addr: "",
    social: "",
    location: "",
    profile_image_url: "",
    social: "",
  });
  const NODE_URL = "https://fullnode.testnet.aptoslabs.com";
  const client = new AptosClient(NODE_URL);
  const moduleAddress =
    "0x3562227119a7a6190402c7cc0b987d2ff5432445a8bfa90c3a51be9ff29dcbe3";
  const getProfile = async () => {
    if (!account) return;
    try {
      const payload = {
        function: `${moduleAddress}::user3::get_profile`,
        type_arguments: [],
        arguments: [account.address],
      };

      const response = await client.view(payload);
      console.log("this is response");
      console.log(response);
      if (response.length > 0) {
        setData({
          email: response[0].email,
          username: response[0].username,
          name: response[0].name,
          email: response[0].email,

          phone: response[0].phone,
          birthday: response[0].birthday,
          gender: response[0].gender,
          bio: response[0].bio,
          user_addr: response[0].user_addr,
          social: response[0].social,
          location: response[0].location,
          profile_image_url: response[0].profile_image_url,
        });
        setAccountHasProfile(true);
      } else {
        setAccountHasProfile(false);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    const storedImage = localStorage.getItem("profileImage");
    if (storedImage) {
      setSelectedProfile(storedImage);
    }
  }, []);
  useEffect(() => {
    getProfile();
  }, []);
  console.log(slug);
  return (
    <div className="account">
      <div className="addcontainer 2xl:px-5 lg:px-14 md:px-10 sm:px-6 max-sm:px-3">
        <div className="account-top">
          <div className="xl:w-[250px] lg:w-[200px] max-md:m-auto">
            <Link href={"/"} className="text-[30px] font-bold">
              <GoBackBtn />
            </Link>

            <div className="token-trans-btn ">
              <button
                style={{ width: "100%" }}
                className={`${
                  slug === "token" ? "bg-[#FEE4D1] text-[#FF6900]" : ""
                }`}
                onClick={() => setSlug("token")}
              >
                <TbCircleLetterT /> <span>Token</span>
              </button>
              <button
                style={{ width: "100%" }}
                className={`${
                  slug === "transactions" ? "bg-[#FEE4D1] text-[#FF6900]" : ""
                }`}
                onClick={() => setSlug("transactions")}
              >
                <FaArrowRightArrowLeft /> <span>Transactions</span>
              </button>
              <button
                style={{ width: "100%" }}
                className={`${
                  slug === "profile" ? "bg-[#FEE4D1] text-[#FF6900]" : ""
                }`}
                onClick={() => setSlug("profile")}
              >
                <Avatar style={{ height: "25px", width: "25px" }} />{" "}
                <span>Profile</span>
              </button>
              <button
                style={{ width: "100%" }}
                className={`${
                  slug === "activity" ? "bg-[#FEE4D1] text-[#FF6900]" : ""
                }`}
                onClick={() => setSlug("activity")}
              >
                <HistoryIcon />
                <span>Activity</span>
              </button>
              <button
                style={{ width: "100%" }}
                onClick={() => setSlug("refferal")}
                className={`${
                  slug === "refferal" ? "bg-[#FEE4D1] text-[#FF6900]" : ""
                }`}
              >
                <ThumbUpOffAltIcon />
                <span>Referral</span>
              </button>
              {/* <span className="marketPlace flex items-center justify-center  font-bold cursor-pointer">
                                NFT Marketplace
                            </span> */}
            </div>
          </div>
          <div className="max-width1  m-auto min-h-screen lg:mt-[-400px]">
            <h2 className={`flex justify-center ${outfit.className}`}>
              Profile
            </h2>

            <div className="profile flex flex-col items-start mt-8 gap-8">
              <div className="avatar rounded-full flex-col items-center flex gap-[10px]">
                <img
                  src={selectedProfile}
                  alt="image"
                  className="profile-img h-32 object-cover w-32 rounded-full"
                />

                <span className={`profile-username ${urbanist.className}`}>
                  {data.username}
                </span>
                <span className={` ${urbanist.className} profile-about`}>
                  UI Designer
                </span>
              </div>
              <div className="profile-account-details flex h-full w-full flex-col gap-8">
                <div className="profile-account-detail-header p-2 pl-3 pr-3 items-center  flex justify-between">
                  <div
                    className={` ${urbanist.className} profile-account-detail-header-text`}
                  >
                    <button className="profile-account-detail-button">
                      Account Details
                    </button>
                  </div>
                  <button
                    onClick={() => setIsProfileEditing(true)}
                    className={`profile-edit-button rounded-lg flex items-center justify-center gap-1 ${urbanist.className}`}
                  >
                    <CreateIcon />
                    Edit
                  </button>
                </div>
                <div className="flex  md:mb-16 mb-5 flex-col profile-items-detail  md:gap-7 gap-3  ">
                  <div className="profile-account-details-item gap-1 md:gap-2 flex flex-col ">
                    <span
                      className={`${urbanist.className} profile-item-label`}
                    >
                      Username
                    </span>
                    <span
                      className={`profile-item-value ${urbanist.className}`}
                    >
                      {data.username}
                    </span>
                  </div>
                  <div className="profile-account-details-item gap-1 md:gap-2 flex flex-col ">
                    <span
                      className={`${urbanist.className} profile-item-label`}
                    >
                      Name
                    </span>
                    <span
                      className={`profile-item-value ${urbanist.className}`}
                    >
                      {/* {data.username} */}
                      {data.name}
                    </span>
                  </div>
                  <div className="profile-account-details-item gap-1 md:gap-2 flex flex-col">
                    <span
                      className={`profile-item-label ${urbanist.className}`}
                    >
                      {/* {data.email} */}
                      Email
                    </span>
                    <span
                      className={`profile-item-value ${urbanist.className}`}
                    >
                      {data.email}
                    </span>
                  </div>
                  <div className="profile-account-details-item gap-1 md:gap-2 flex flex-col">
                    <span
                      className={`${urbanist.className} profile-item-label`}
                    >
                      Gender
                    </span>
                    <span
                      className={`profile-item-value ${urbanist.className}`}
                    >
                      {data.gender}
                    </span>
                  </div>
                  <div className="profile-account-details-item gap-1 md:gap-2 flex flex-col">
                    <span
                      className={`profile-item-label ${urbanist.className}`}
                    >
                      Phone
                    </span>
                    <span
                      className={`profile-item-value ${urbanist.className}`}
                    >
                      {data.phone}
                    </span>
                  </div>
                  <div className="profile-account-details-item gap-1 md:gap-2 flex flex-col ">
                    <span
                      className={`${urbanist.className} profile-item-label`}
                    >
                      Birthday
                    </span>
                    <span
                      className={`${urbanist.className} profile-item-value`}
                    >
                      {data.birthday}
                    </span>
                  </div>
                  <div className="profile-account-details-item gap-1 md:gap-2 flex flex-col">
                    <span
                      className={`profile-item-label ${urbanist.className}`}
                    >
                      Location
                    </span>
                    <span
                      className={`${urbanist.className} profile-item-value`}
                    >
                      {data.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfileComp;
