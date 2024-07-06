"use client";

const { FaArrowRightArrowLeft } = require("react-icons/fa6");
const { TbCircleLetterT } = require("react-icons/tb");
const { default: GoBackBtn } = require("../button/GoBackBtn");
const { Avatar } = require("@mui/material");
import HistoryIcon from "@mui/icons-material/History";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import CreateIcon from "@mui/icons-material/Create";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import { useContext } from "react";
import "@/style/signup/signup.scss";
const outfit = Outfit({ subsets: ["latin"] });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });
import { useState } from "react";
import Link from "next/link";
import { TaskContext } from "../../app/task/context/taskContext";
const SignupComp = () => {
  const { slug, setSlug } = useContext(TaskContext);
  const [data, setData] = useState({
    username: "",
    name: "",
    email: "",
  });
  const NODE_URL = "https://fullnode.testnet.aptoslabs.com";
  const client = new AptosClient(NODE_URL);
  const moduleAddress =
    "0x82afe3de6e9acaf4f2de72ae50c3851a65bb86576198ef969937d59190873dfd";
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
        function: `${moduleAddress}::user::signup`,
        type_arguments: [],
        functionArguments: [data.username, data.email, data.name],
      },
    };
    try {
      const response = await signAndSubmitTransaction(payload);
      await client.waitForTransaction(response.hash);
      setAccountHasProfile(true);
    } catch (error) {
      console.log(error);
      setAccountHasProfile(false);
    } finally {
      setTransactionInProgress(false);
    }
  };

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
              Sign Up
            </h2>
            <div className="signup max-width1   flex flex-col items-start mt-8 gap-6">
              <div className="flex flex-col justify-start items-start gap-4 ">
                <label className="signup-label" htmlFor="">
                  Username
                </label>
                <input
                  className="signup-input border p-2 rounded-lg outline-none"
                  type="text"
                  name="username"
                  value={data.username}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="flex flex-col justify-start items-start gap-4 ">
                <label className="signup-label" htmlFor="">
                  Email Address
                </label>
                <input
                  className="signup-input border p-2 rounded-lg outline-none"
                  type="text"
                  name="email"
                  value={data.email}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="flex flex-col justify-start items-start gap-4 ">
                <label className="signup-label" htmlFor="">
                  Full Name
                </label>
                <input
                  className="signup-input border p-2 rounded-lg outline-none"
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <button
                onClick={(e) => handlesignUp(e)}
                className="signup-submit p-2  rounded-lg text-white"
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
