"use client";
import Link from "next/link";
import React from "react";
import { FaPercentage } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import Pagination from "../button/Pagination";
import { useState } from "react";
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

const Transactions = ({ transactions }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Change this value based on your requirement

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = transactions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className="account-transactions py-12">
      {currentTransactions?.map((item) => {
        return (
          <Link
            key={item.id}
            href={`/account/${item.version}`}
            className="sm:px-5 md:px-10 max-sm:px-1 py-3 my-5"
          >
            <div className="icon">
              <FaPercentage />
            </div>
            <div className="net-fee">
              <h4>{item.type}</h4>
              <p>Confirmed. 2d</p>
            </div>
            <p>gas_unit_price</p>
            <p className="!text-[#191D31] font-medium">{item.gas_unit_price}</p>
            <div className="icon-last text-[#FF6900]">
              <IoIosArrowForward />
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
};

export default Transactions;
