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
import { useContext, useEffect, useState, useRef } from "react";
import { TaskContext } from "@/app/task/context/taskContext";
import { AptosClient } from "aptos";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import TabSection from "../tabs";
const outfit = Outfit({ subsets: ["latin"] });
const urbanist = Urbanist({ subsets: ["latin"] });

const EditProfileComp = () => {
  const {
    slug,
    setSlug,
    isProfileEditing,
    setIsProfileEditing,
    isHavingAccount,
    setIsHavingAccount,
  } = useContext(TaskContext);
  const { account, signAndSubmitTransaction } = useWallet();
  const [selectedFile, setSelectedFile] = useState(null);

  const [accountHasProfile, setAccountHasProfile] = useState(false);
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
  const [transactionInProgress, setTransactionInProgress] = useState(false);
  const NODE_URL = "https://fullnode.testnet.aptoslabs.com";
  const client = new AptosClient(NODE_URL);
  const moduleAddress =
    "0x3562227119a7a6190402c7cc0b987d2ff5432445a8bfa90c3a51be9ff29dcbe3";
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setSelectedFile(base64String);
        localStorage.setItem("profileImage", base64String);
      };
      reader.readAsDataURL(file);
    }
  };
  const updateProfile = async (e) => {
    e.preventDefault();
    if (!account) return;
    setTransactionInProgress(true);
    const payload = {
      data: {
        type: "entry_function_payload",
        function: `${moduleAddress}::user3::update_profile`,
        functionArguments: [
          data.name,
          data.email,
          data.username,
          data.phone,
          data.birthday,
          data.gender,
          data.bio,
          data.user_addr,
          data.social,
          data.location,
          data.profile_image_url,
        ],
        type_arguments: [],
      },
    };
    try {
      const response = await signAndSubmitTransaction(payload);
      await client.waitForTransaction(response.hash);
      setAccountHasProfile(true);
      setIsProfileEditing(false);
    } catch (error) {
      setAccountHasProfile(false);
      setIsProfileEditing(false);

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
    getProfile();
  }, []);
  useEffect(() => {
    const storedImage = localStorage.getItem("profileImage");
    if (storedImage) {
      setSelectedFile(storedImage);
    }
  }, []);
  return (
    <div className="account">
      <div className="addcontainer   2xl:px-5 lg:px-14 md:px-10 sm:px-6 max-sm:px-3">
        <div className="account-top">
          <TabSection />
          <div className="max-width  m-auto min-h-screen mb-8 lg:mt-[-400px]">
            <h2 className={`flex justify-center ${outfit.className}`}>
              Profile
            </h2>
            <div className="profile md:mb-16 mb-5 flex flex-col items-start mt-8 gap-12">
              <div className="avatar  rounded-full flex-col items-center flex gap-4">
                <img
                  src={selectedFile}
                  alt="image"
                  className="profile-img md:h-32 object-cover h-16 w-16 md:w-32 rounded-full"
                />
                <button
                  className="rounded-lg pl-4 pr-4 flex items-center justify-center gap-3 text-white p-2 profile-edit-upload-button"
                  onClick={handleClick}
                >
                  Upload
                  <input
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    type="file"
                    className="hidden"
                  />
                  <FileUploadOutlinedIcon />
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
                    value={data.bio}
                    onChange={(e) => handleChange(e)}
                    style={{ fontFamily: urbanist }}
                    className="profile-edit-input p-2  rounded-lg outline-none"
                    type="text"
                    name="bio"
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
                    name="gender"
                    onChange={(e) => handleChange(e)}
                    value={data.gender}
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
                    onChange={(e) => handleChange(e)}
                    value={data.phone}
                    name="phone"
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
                    name="birthday"
                    onChange={(e) => handleChange(e)}
                    value={data.birthday}
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
                    name="location"
                    onChange={(e) => handleChange(e)}
                    value={data.location}
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
