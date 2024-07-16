"use client";

const { FaArrowRightArrowLeft } = require("react-icons/fa6");
const { TbCircleLetterT } = require("react-icons/tb");
const { default: GoBackBtn } = require("../button/GoBackBtn");
const { Avatar } = require("@mui/material");
import HistoryIcon from "@mui/icons-material/History";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import CreateIcon from "@mui/icons-material/Create";
import { Plus_Jakarta_Sans, Outfit, Urbanist } from "next/font/google";
import { useContext, useEffect } from "react";
import "@/style/signup/signup.scss";
const outfit = Outfit({ subsets: ["latin"] });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });
import { useState } from "react";
import Link from "next/link";
import { TaskContext } from "../../app/task/context/taskContext";
import { AptosClient } from "aptos";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import TabSection from "../tabs";
const urbanist = Urbanist({ subsets: ["latin"] });

const SignupComp = () => {
  const { slug, setSlug } = useContext(TaskContext);
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
  const [transactionInProgress, setTransactionInProgress] = useState(false);
  const [accountHasProfile, setAccountHasProfile] = useState(false);
  const { account, signAndSubmitTransaction } = useWallet();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlesignUp = async (e) => {
    e.preventDefault();
    if (!account) return;
    setTransactionInProgress(true);
    const payload = {
      data: {
        type: "entry_function_payload",
        function: `${moduleAddress}::user3::create_profile`,
        functionArguments: [
          data.name,
          data.email,
          data.username,
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
        ],
      },
    };
    try {
      const response = await signAndSubmitTransaction(payload);
      await client.waitForTransaction(response.hash);
      console.log("respnse ");
      console.log(response);
      setAccountHasProfile(true);
    } catch (error) {
      console.log("error");
      console.log(error);
      setAccountHasProfile(false);
    } finally {
      setTransactionInProgress(false);
    }
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
      <div className="addcontainer 2xl:px-5 lg:px-14 md:px-10 sm:px-6 max-sm:px-3">
        <div className="account-top">
          <TabSection />
          <div className="max-width1   m-auto min-h-screen lg:mt-[-400px]">
            <h2
              className={`flex   lg:mr-36 justify-center ${outfit.className}`}
            >
              Sign Up
            </h2>
            <div className="signup  md:justify-center  flex flex-col items-start mt-8 gap-6">
              <div className="flex w-full flex-col justify-start items-start gap-4 ">
                <label
                  className={`${urbanist.className} signup-label`}
                  htmlFor=""
                >
                  Username
                </label>
                <input
                  className={`${urbanist.className} signup-input border p-2 rounded-lg outline-none`}
                  type="text"
                  name="username"
                  value={data.username}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="flex w-full flex-col justify-start items-start gap-4 ">
                <label
                  className={`${urbanist.className} signup-label`}
                  htmlFor=""
                >
                  Email Address
                </label>
                <input
                  className={`${urbanist.className} signup-input border p-2 rounded-lg outline-none`}
                  type="text"
                  name="email"
                  value={data.email}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="flex w-full flex-col justify-start items-start gap-4 ">
                <label
                  className={`${urbanist.className} signup-label`}
                  htmlFor=""
                >
                  Full Name
                </label>
                <input
                  className={`${urbanist.className} signup-input border p-2 rounded-lg outline-none`}
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <button
                onClick={(e) => handlesignUp(e)}
                className={`${urbanist.className} signup-submit p-2 mb-14  rounded-lg text-white`}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignupComp;
