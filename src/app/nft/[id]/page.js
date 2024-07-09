"use client";
import Footer from "@/components/Footer";
import { CiShare1 } from "react-icons/ci";
import Navbar from "@/components/Navbar";
import GoBackBtn from "@/components/button/GoBackBtn";
import { useRouter } from "next/navigation";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { shortenString, showFirstTenWords } from "@/components/common/truncate";
import Image from "next/image";
import { IoIosStar } from "react-icons/io";
import "@/style/nft/nft.scss";
import { AptosClient } from "aptos";

import { Outfit } from "next/font/google";
import "./nft.css";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useParams } from "next/navigation";
import { useQuery } from "react-query";
import { useAppSelector } from "@/redux/app/hooks";
import {
  selectSpecificToken,
  selectIsTokenLoading,
  fetchNftImgAction,
} from "@/redux/app/reducers/AccountSlice";
import CircularIndeterminate from "@/components/common/loading";
import { TaskContext } from "../../task/context/taskContext";
const outfit = Outfit({ subsets: ["latin"] });

const Page = () => {
  const { id } = useParams();
  const router = useRouter();
  const [showMore, setShowMore] = useState(false);
  const { isLoadingToken } = useAppSelector(selectIsTokenLoading);
  const token = useAppSelector(selectSpecificToken(id));
  const { account, signAndSubmitTransaction } = useWallet();
  const [transactionInProgress, setTransactionInProgress] = useState(false);
  const { selectedToken, setSelectedToken } = useContext(TaskContext);
  const NODE_URL = "https://fullnode.testnet.aptoslabs.com";
  const client = new AptosClient(NODE_URL);
  const moduleAddress =
    "0x82afe3de6e9acaf4f2de72ae50c3851a65bb86576198ef969937d59190873dfd";
  // const {
  //   data: image,
  //   isLoading,
  //   isError,
  // } = useQuery(["nft", id], () =>
  //   fetchNftImgAction(
  //     token?.current_token_data?.token_uri,
  //     token?.token_data_id
  //   )
  // );
  const handleSelectToken = () => {
    setSelectedToken(token);
    router.push("/");
  };
  console.log(selectedToken);
  console.log(token);
  const selectNFT = async (collection_id, token_id) => {
    if (!account) return [];
    setTransactionInProgress(true);
    // build a transaction payload to be submited
    // const payload = {
    //   type: "entry_function_payload",
    //   function: `${moduleAddress}::user::select_nft`,
    //   type_arguments: [],
    //   arguments: [collection_id, token_id], //collection_id, token_id
    // };

    try {
      const transactionPayload = {
        data: {
          type: "entry_function_payload",
          function: `${moduleAddress}::user::select_nft`,
          type_arguments: [],
          functionArguments: [collection_id, token_id], //collection_id, token_id
        },
      };
      // sign and submit transaction to chain
      const response = await signAndSubmitTransaction(transactionPayload);
      const resp = await client.waitForTransaction(response.hash);
      console.log(response);
      console.log(resp);
      router.push("/");
      console.log(resp);
    } catch (error) {
      console.log(error);
    } finally {
      setTransactionInProgress(false);
    }
  };
  return (
    <div>
      {isLoadingToken ? (
        <CircularIndeterminate />
      ) : (
        <section className="nft">
          <div className="addcontainer 2xl:px-5 lg:px-14 md:px-10 sm:px-6 max-sm:px-3">
            <div className="back-button">
              <Link href={"/"} className="text-[30px] font-bold">
                <GoBackBtn />
              </Link>
            </div>

            <div className="nft-inner">
              <h2 className={outfit.className}>NFT</h2>
              <div className="image-box">
                <div className="box m-auto my-[10px] shadow-md">
                  <div className="image flex justify-center items-center p-5">
                    <Image
                      src={token?.image}
                      width={116}
                      height={160}
                      alt="petz"
                    />
                  </div>
                  <div className="pitbull-footer">
                    <p>{token?.current_token_data?.token_name}</p>
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
                  <h5>0</h5>
                </div>
                <div className="flex items-center my-2">
                  <p>Concentrative </p>
                  <div className="skill w-[150px]">
                    <div className="skill-bar skill4 wow slideInLeft animated">
                      <span className="skill-count2"></span>
                    </div>
                  </div>
                  <h5>0</h5>
                </div>
                <div className="flex items-center my-2">
                  <p>Fortune</p>
                  <div className="skill w-[150px]">
                    <div className="skill-bar skill5 wow slideInLeft animated">
                      <span className="skill-count2"></span>
                    </div>
                  </div>
                  <h5>0</h5>
                </div>
                <div className="flex items-center my-2">
                  <p>Longevity</p>
                  <div className="skill w-[150px]">
                    <div className="skill-bar skill6 wow slideInLeft animated">
                      <span className="skill-count2"></span>
                    </div>
                  </div>
                  <h5>0</h5>
                </div>
              </div>
              <div className="nft_description flex flex-col">
                <div className="nft_description_wrapper flex flex-col gap-1">
                  <span className="ntf_description_span mt-5  !text-[#191D31]   font-bold text-xl">
                    Description
                  </span>
                  <span>
                    {" "}
                    {showMore
                      ? token?.current_token_data?.description
                      : showFirstTenWords(
                          token?.current_token_data?.description
                        ) + "..."}
                  </span>
                  <span
                    onClick={() => {
                      setShowMore(!showMore);
                    }}
                    className=" underline cursor-pointer"
                  >
                    {showMore ? "Show less" : "Show More"}
                  </span>
                  <div className="nft_detail_line"></div>
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-4">
                <span className=" !text-[#191D31]   font-bold text-xl">
                  Details
                </span>
                <div className="flex left_nft_detail items-center justify-between gap-4">
                  <div className="left_nft_detail  h-12 w-12 rounded-lg bg-slate-100"></div>
                  <div className="right_neft_detail flex flex-col">
                    <span className="collection_nft_detail font-light">
                      Collection
                    </span>
                    <span className="collection_nft_detail_petz  !text-[#191D31]  font-bold">
                      {
                        token?.current_token_data?.current_collection
                          ?.collection_name
                      }
                    </span>
                  </div>
                </div>
                <div className="flex left_nft_detail  gap-10">
                  <div className="left_nft_detail_rounded_div h-12 w-12 rounded-full"></div>
                  <div className="right_neft_detail flex flex-col">
                    <span className="collection_nft_detail font-light">
                      Created by
                    </span>
                    <span className="collection_nft_detail_petz  !text-[#191D31]  font-bold">
                      {shortenString(
                        token?.current_token_data?.current_collection
                          ?.creator_address
                      )}
                    </span>
                  </div>
                </div>
                <div className="flex left_nft_detail items-center justify-between gap-4">
                  <div className="left_nft_detail">
                    <FaCloudUploadAlt className="h-12 w-12" />
                  </div>
                  <div className="right_neft_detail flex flex-col">
                    <span className="collection_nft_detail font-light">
                      Metadata storage
                    </span>
                    <a target="_" href={token?.current_token_data?.token_uri}>
                      <span className="collection_nft_detail_petz cursor-pointer flex  items-center gap-2  ">
                        view on storage provider <CiShare1 />
                      </span>{" "}
                    </a>
                  </div>
                </div>
              </div>
              <div className="attributes flex flex-col gap-4">
                <span className="mt-5  !text-[#191D31]   font-bold text-xl">
                  Attributes
                </span>
                <div className="flex gap-4 flex-wrap">
                  {token?.attributes?.map((x) => (
                    <div className="bg-[#F09B68] flex p-2 rounded-lg  flex-col">
                      <span>{x.trait_type}</span>
                      <span className="!text-[#191D31]  font-bold">
                        {x.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="sell-select-btn">
                <button>Sell</button>
                <button
                  onClick={() => {
                    selectNFT(
                      token?.current_token_data?.collection_id,
                      token?.token_data_id
                    );
                    setSelectedToken(token);
                    router.push("/");
                  }}
                >
                  Select
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Page;
