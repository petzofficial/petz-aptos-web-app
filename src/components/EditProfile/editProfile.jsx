"use client";

const { FaArrowRightArrowLeft } = require("react-icons/fa6");
const { TbCircleLetterT } = require("react-icons/tb");
const { default: GoBackBtn } = require("../button/GoBackBtn");
const { Avatar } = require("@mui/material");
import HistoryIcon from "@mui/icons-material/History";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { Outfit, Urbanist } from "next/font/google";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import "@/style/editProfile/editProfile.scss";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { TaskContext } from "@/app/task/context/taskContext";
import { AptosClient } from "aptos";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
const outfit = Outfit({ subsets: ["latin"] });
const urbanist = Urbanist({ subsets: ["latin"] });

const EditProfileComp = () => {
  const { slug, setSlug } = useContext(TaskContext);
  const { account, signAndSubmitTransaction } = useWallet();
  const [accountHasProfile, setAccountHasProfile] = useState(false);
  const [data, setData] = useState({
    username: "",
    email: "",
    name: "",
  });
  const [transactionInProgress, setTransactionInProgress] = useState(false);
  const NODE_URL = "https://fullnode.testnet.aptoslabs.com";
  const client = new AptosClient(NODE_URL);
  const moduleAddress =
    "0x82afe3de6e9acaf4f2de72ae50c3851a65bb86576198ef969937d59190873dfd";

  const updateProfile = async (e) => {
    e.preventDefault();
    if (!account) return;
    setTransactionInProgress(true);
    const payload = {
      data: {
        type: "entry_function_payload",
        function: `${moduleAddress}::user::update_profile`,
        functionArguments: [data.username, data.email, data.name],
        type_arguments: [],
      },
    };
    try {
      const response = await signAndSubmitTransaction(payload);
      await client.waitForTransaction(response.hash);
      setAccountHasProfile(true);
    } catch (error) {
      setAccountHasProfile(false);
      console.log(error);
    } finally {
      setTransactionInProgress(false);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const getProfile = async () => {
    if (!account) return;
    try {
      const payload = {
        function: `${moduleAddress}::user::get_profile`,
        type_arguments: [],
        arguments: [account.address],
      };

      const response = await client.view(payload);
      if (response.length > 0) {
        setData({
          username: response[0].username,
          name: response[0].name,
          email: response[0].email,
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
    getProfile();
  }, []);
  return (
    <div className="account">
      <div className="addcontainer   2xl:px-5 lg:px-14 md:px-10 sm:px-6 max-sm:px-3">
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
              Profile
            </h2>
            <div className="profile flex flex-col items-start mt-8 gap-12">
              <div className="avatar  rounded-full flex-col items-center flex gap-4">
                <img
                  src="/profile.jpg"
                  alt="image"
                  className="profile-img  h-32 object-cover w-32 rounded-full"
                />
                <button className="rounded-lg pl-4 pr-4 flex items-center justify-center gap-3 text-white p-2 profile-edit-upload-button">
                  Upload
                  <FileUploadOutlinedIcon />{" "}
                </button>
              </div>
              <div className="profile-edit-section flex flex-col gap-6">
                <div className="flex flex-col items-start gap-3">
                  <label
                    style={{ fontFamily: urbanist }}
                    className="profile-edit-lable"
                    htmlFor=""
                  >
                    Username
                  </label>
                  <input
                    className="profile-edit-input p-2  rounded-lg outline-none"
                    type="text"
                    name="username"
                    value={data.username}
                    onChange={(e) => handleChange(e)}
                    style={{ fontFamily: urbanist }}
                  />
                </div>
                <div className="flex flex-col items-start gap-3">
                  <label
                    style={{ fontFamily: urbanist }}
                    className="profile-edit-lable"
                    htmlFor=""
                  >
                    Email Address
                  </label>
                  <input
                    className="profile-edit-input p-2  rounded-lg outline-none"
                    type="text"
                    name="email"
                    onChange={(e) => handleChange(e)}
                    value={data.email}
                    style={{ fontFamily: urbanist }}
                  />
                </div>
                <div className="flex flex-col items-start gap-3">
                  <label
                    style={{ fontFamily: urbanist }}
                    className="profile-edit-lable"
                    htmlFor=""
                  >
                    Name
                  </label>
                  <input
                    className="profile-edit-input p-2  rounded-lg outline-none"
                    type="text"
                    value={data.name}
                    name="name"
                    onChange={(e) => handleChange(e)}
                    style={{ fontFamily: urbanist }}
                  />
                </div>
                <div className="flex flex-col items-start gap-3">
                  <label
                    style={{ fontFamily: urbanist }}
                    className="profile-edit-lable"
                    htmlFor=""
                  >
                    Bio
                  </label>
                  <input
                    style={{ fontFamily: urbanist }}
                    className="profile-edit-input p-2  rounded-lg outline-none"
                    type="text"
                  />
                </div>
                <div className="flex flex-col items-start gap-3">
                  <label
                    style={{ fontFamily: urbanist }}
                    className="profile-edit-lable"
                    htmlFor=""
                  >
                    Gender
                  </label>
                  <input
                    style={{ fontFamily: urbanist }}
                    className="profile-edit-input p-2  rounded-lg outline-none"
                    type="text"
                  />
                </div>
                <div className="flex flex-col items-start gap-3">
                  <label
                    style={{ fontFamily: urbanist }}
                    className="profile-edit-lable"
                    htmlFor=""
                  >
                    Phone
                  </label>
                  <input
                    style={{ fontFamily: urbanist }}
                    className="profile-edit-input p-2  rounded-lg outline-none"
                    type="text"
                  />
                </div>
                <div className="flex flex-col items-start gap-3">
                  <label
                    style={{ fontFamily: urbanist }}
                    className="profile-edit-lable"
                    htmlFor=""
                  >
                    Birthday
                  </label>
                  <input
                    style={{ fontFamily: urbanist }}
                    className="profile-edit-input p-2  rounded-lg outline-none"
                    type="text"
                  />
                </div>
                <div className="flex flex-col items-start gap-3">
                  <label
                    style={{ fontFamily: urbanist }}
                    className="profile-edit-lable"
                    htmlFor=""
                  >
                    Location
                  </label>
                  <input
                    style={{ fontFamily: urbanist }}
                    className="profile-edit-input p-2  rounded-lg outline-none"
                    type="text"
                  />
                </div>
                <div>
                  <button
                    style={{ fontFamily: urbanist }}
                    onClick={(e) => updateProfile(e)}
                    className="profile-edit-button-submit p-3 rounded-lg text-white"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditProfileComp;
