import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import GoBackBtn from "@/components/button/GoBackBtn";
import Link from "next/link";
import React from "react";
import image1 from "../../assets/nft/111.png";
import Image from "next/image";
import { IoIosStar } from "react-icons/io";
import "../../style/nft/nft.scss";
import { Outfit } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"] });

const Page = () => {
  return (
    <div>
      <Navbar />

      <section className="nft">
        <div className="addcontainer 2xl:px-5 lg:px-14 md:px-10 sm:px-6 max-sm:px-3">
          <div className="back-button">
            <Link href={"/home"} className="text-[30px] font-bold">
              <GoBackBtn />
            </Link>
          </div>

          <div className="nft-inner">
            <h2 className={outfit.className}>NFT</h2>
            <div className="image-box">
              <div className="box m-auto my-[10px] shadow-md">
                <div className="image flex justify-center items-center p-5">
                  <Image src={image1} width={116} height={160} alt="petz" />
                </div>
                <div className="pitbull-footer">
                  <p>#1273</p>
                  <p>Pitbull</p>
                </div>
              </div>
            </div>
            <div className="star-icon space-x-1">
              <IoIosStar />
              <IoIosStar />
              <IoIosStar />
              <IoIosStar />
              <IoIosStar />
            </div>

            <div className="progress-bar flex items-center">
              <div className="skill flex-1">
                <div className="skill-bar skill3 wow slideInLeft animated">
                  <span className="skill-count2"></span>
                </div>
              </div>
              <p>HP</p>
            </div>

            <div className="opportunities my-9">
              <div className="flex items-center my-2">
                <p>Productivity</p>
                <div className="skill w-[150px]">
                  <div className="skill-bar skill2 wow slideInLeft animated">
                    <span className="skill-count2"></span>
                  </div>
                </div>
                <h5>42.6</h5>
              </div>
              <div className="flex items-center my-2">
                <p>Concentrative </p>
                <div className="skill w-[150px]">
                  <div className="skill-bar skill4 wow slideInLeft animated">
                    <span className="skill-count2"></span>
                  </div>
                </div>
                <h5>11.5</h5>
              </div>
              <div className="flex items-center my-2">
                <p>Fortune</p>
                <div className="skill w-[150px]">
                  <div className="skill-bar skill5 wow slideInLeft animated">
                    <span className="skill-count2"></span>
                  </div>
                </div>
                <h5>5.9</h5>
              </div>
              <div className="flex items-center my-2">
                <p>Longevity</p>
                <div className="skill w-[150px]">
                  <div className="skill-bar skill6 wow slideInLeft animated">
                    <span className="skill-count2"></span>
                  </div>
                </div>
                <h5>4.5</h5>
              </div>
            </div>

            <div className="sell-select-btn">
              <button>Sell</button>
              <button>Select</button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Page;
