"use client";
import { useParams } from "next/navigation";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import GoBackBtn from "@/components/button/GoBackBtn";
import Link from "next/link";
import React from "react";
import image1 from "@/assets/nft/111.png";
import Image from "next/image";
import { IoIosStar } from "react-icons/io";
import "@/style/nft/nft.scss";
import { Outfit } from "next/font/google";
import { useAppSelector } from "@/redux/app/hooks";
import { selectSpecificToken } from "@/redux/app/reducers/AccountSlice";
import { getFormattedDateTime } from "@/components/common/datetime";
const outfit = Outfit({ subsets: ["latin"] });

const Page = () => {
  const { id } = useParams();
  const token = useAppSelector(selectSpecificToken(id));
  console.log("this is id token");
  console.log(token);

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
                  {token?.current_token_data?.token_name}
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
            <div className=" justify-between flex items-center">
              <p>token standard</p>
              <p>{token?.current_token_data?.token_standard}</p>
            </div>
            <div className=" justify-between flex items-center">
              <p>amount</p>
              <p>{token?.amount}</p>
            </div>
            <div className=" justify-between flex items-center">
              <p>is_fungible_v2</p>
              <p>{token?.is_fungible_v2 ? "true" : "false"}</p>
            </div>
            <div className=" justify-between flex items-center">
              <p>is_soulbound_v2</p>
              <p>{token?.is_soulbound_v2 ? "true" : "false"}</p>
            </div>
            <div className=" justify-between flex items-center">
              <p>last_transaction_version</p>
              <p>
                {
                  getFormattedDateTime(token?.last_transaction_version)
                    .formattedDate
                }
              </p>
            </div>
            {/* <div className="opportunities my-9">
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
            </div> */}

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
