"use client";
import Link from "next/link";
import React from "react";
import { FaPercentage } from "react-icons/fa";
import { AiOutlinePercentage } from "react-icons/ai";

import { IoIosArrowForward } from "react-icons/io";
import Pagination from "../button/Pagination";
import emptyImage from "@/assets/without/empty.png";
import Image from "next/image";
import { useState } from "react";
import { calculateInverseWithDecimals } from "@/components/common/transaction";
import CircularIndeterminate from "@/components/common/loading";
import {
  TransactionAmount,
  TransactionAmountRow,
  getTransactionAmount,
} from "./utils";
import { getCoinBalanceChangeForAccount } from "./utils";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
const Transactions = ({ transactions, isLoading }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { account } = useWallet();

  const itemsPerPage = 8; // Change this value based on your requirement
  function formatDateTime2(timestamp) {
    const timestampInMillis = timestamp / 1000;
    const dateObject = new Date(timestampInMillis);

    const options = {
      month: "short",
      day: "numeric",
    };

    return dateObject.toLocaleString("en-US", options);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // Assuming transactions is an array of objects with a 'timestamp' property
  let sorted = transactions
    ? [...transactions].sort((a, b) => b.timestamp - a.timestamp)
    : [];

  const currentTransactions = sorted?.slice(indexOfFirstItem, indexOfLastItem);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  if (isLoading) {
    return (
      <div className="account-transactions py-12">
        <CircularIndeterminate />
      </div>
    );
  } else if (!isLoading && currentTransactions.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "10px",
        }}
      >
        <Image height={240} src={emptyImage} alt="empty" />
      </div>
    );
  } else {
    console.log(currentTransactions);
    return (
      <div className="account-transactions py-12">
        {currentTransactions?.map((item, x) => {
          return (
            <Link
              key={x}
              href={`/account/${item.version}`}
              className="sm:px-5 flex items-center justify-between md:px-10 max-sm:px-1 py-3 my-5"
            >
              <div className="icon">
                <AiOutlinePercentage />
              </div>
              <div className="net-fee  pl-8 flex-1 items-center justify-center gap-4">
                <p className="!text-[#191D31] ">
                  {item.payload?.function?.split("::").pop()}
                </p>
                <span>
                  {item?.success === true ? (
                    <span style={{ color: "green" }}> Confirmed </span>
                  ) : (
                    <span className=" text-red-600">Failed. </span>
                  )}{" "}
                  {formatDateTime2(item.timestamp)}
                </span>{" "}
              </div>

              <div className="flex flex-1 items-end font-bold justify-end">
                <span className="!text-[#191D31] ">
                  <TransactionAmount
                    transaction={item}
                    address={account?.address}
                  />
                </span>
                <div className="icon-last text-[#FF6900]">
                  <IoIosArrowForward />
                </div>{" "}
              </div>
            </Link>
          );
        })}

        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(transactions.length / itemsPerPage)}
          onPageChange={handlePageChange}
        />
      </div>
    );
  }
};

export default Transactions;
