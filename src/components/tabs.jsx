import GoBackBtn from "./button/GoBackBtn";
import { useContext } from "react";
import { TaskContext } from "@/app/task/context/taskContext";
import Link from "next/link";
import HistoryIcon from "@mui/icons-material/History";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
const { Avatar } = require("@mui/material");

const { FaArrowRightArrowLeft } = require("react-icons/fa6");
const { TbCircleLetterT } = require("react-icons/tb");

const TabSection = () => {
  const { slug, setSlug } = useContext(TaskContext);
  return (
    <div className="xl:w-[250px] lg:w-[200px] max-md:m-auto">
      <Link href={"/"} className="text-[30px] font-bold">
        <GoBackBtn />
      </Link>

      <div className="token-trans-btn ">
        <button
          style={{ width: "100%" }}
          className={`${slug === "token" ? "bg-[#FEE4D1] text-[#FF6900]" : ""}`}
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
      </div>
    </div>
  );
};
export default TabSection;
