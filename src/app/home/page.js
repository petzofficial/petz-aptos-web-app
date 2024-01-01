import Navbar from "@/components/Navbar";
import React from "react";
import Image from "next/image";
import img1 from "../../assets/home/pgt-removebg-preview 2.png";
import img2 from "../../assets/home/pst-removebg-preview 2.png";
import img3 from "../../assets/home/image 23.png";
import group from "../../assets/home/Group 101.png";
import "../../style/home/home.scss";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Barlow_Condensed } from "next/font/google";
import { FaPlay, FaSquare } from "react-icons/fa";
import ReplayIcon from "@mui/icons-material/Replay";
import Footer from "@/components/Footer";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });
const barlow = Barlow_Condensed({ subsets: ["latin"], weight: "500" });

const Page = () => {
  return (
    <div>
      <Navbar />

      <section className="home-section">
        <div className="addcontainer 2xl:px-5 lg:px-14 md:px-10 sm:px-6 max-sm:px-3">
          <div className="home-inner">
            <div className="first-box flex justify-between items-center">
              <Image src={img1} width={30} height={30} alt="PGT" />
              <p className="max-[322px]:text-[12px]">100 PGT</p>
              <Image src={img2} width={30} height={30} alt="PST" />
              <p className="max-[322px]:text-[12px]">100 PST</p>
              <Image src={img3} width={30} height={30} alt="100 APT" />
              <p className="max-[322px]:text-[12px]">100 APT</p>
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
                <h4 className={`ml-3 -mt-2 font-bold ${jakarta.className}`}>
                  80%
                </h4>
              </div>
            </div>

            <div className="first-box mt-5">
              {/* <Link href={'/task/task-add'}> */}
              <select name="task" id="task" className="w-full outline-none">
                <option className="font-semibold" value="choose">
                  Choose Task
                </option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              {/* </Link> */}
            </div>

            <div className="first-box mt-5">
              <div className="containerr">
                <div className="progress">
                  <div className="overlay"></div>
                  <div className="left"></div>
                  <div className="right"></div>
                </div>
                <div
                  className={`absolute max-sm:text-[33px] sm:text-[40px] md:text-[43px] lg:text-[48px] font-semibold ${barlow.className}`}
                >
                  25:00
                </div>
              </div>
              <div className="flex justify-center space-x-3">
                <span>Time to focus</span>
                <span>1/4</span>
              </div>
              <div className="play-move-btn space-x-2 mt-5">
                <button>
                  <FaSquare />
                </button>
                <button className="mid">
                  <FaPlay />
                </button>
                <button>
                  <ReplayIcon className="font-bold" />
                </button>
              </div>
            </div>

            <div className="home-foot my-12">
              <Image src={group} width={380} height={305} alt="group" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Page;
