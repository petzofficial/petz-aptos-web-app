"use client";
import Link from "next/link";
import React from "react";
import { FaPercentage } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import Pagination from "../button/Pagination";
import emptyImage from "@/assets/without/empty.png";
import Image from "next/image";
import { useState } from "react";
import { calculateInverseWithDecimals } from "@/components/common/transaction";
import { formatDateTime3 } from "@/components/common/dateTime";
import CircularIndeterminate from "@/components/common/loading";

const Transactions = ({ transactions, isLoading }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Change this value based on your requirement

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
  console.log(currentTransactions.length);
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
                <FaPercentage />
              </div>
              <div className="net-fee  pl-8 flex-1 items-center justify-center gap-4">
                <p className="!text-[#191D31] ">Network fee</p>
                <span>
                  {item?.success === true ? "Confirmed." : " Not confirmed."}{" "}
                  {formatDateTime2(item.timestamp)}
                </span>{" "}
              </div>

              <div className="flex flex-1 items-end font-bold justify-end">
                <span className="!text-[#191D31] ">
                  {calculateInverseWithDecimals(item.gas_used, 8)} APT
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
const items = [
  {
    id: 1,
    title: "Network Fee",
  },
  {
    id: 2,
    title: "Network Fee",
  },
  {
    id: 3,
    title: "Network Fee",
  },
  {
    id: 4,
    title: "Network Fee",
  },
  {
    id: 5,
    title: "Network Fee",
  },
];
