import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Pagination from "../button/Pagination";
import CircularIndeterminate from "@/components/common/loading";

const Token = ({ tokens, isLoading }) => {
  const itemsPerPage = 8; // Change this to the number of items you want to display per page
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTokens = tokens?.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="account-token max-md:pt-5 md:pt-10">
      {isLoading ? (
        <CircularIndeterminate />
      ) : (
        <>
          <div className="pick-cards grid max-lg:grid-cols-2 lg:grid-cols-4 justify-between items-center">
            {currentTokens.map((item, id) => {
              return (
                <Link key={id} href={`/nft/${item.last_transaction_version}`}>
                  <div className="box shadow-md m-auto my-[10px]">
                    <div className="image flex justify-center items-center">
                      <Image
                        src={item.image}
                        width={86}
                        height={117}
                        alt="petz"
                      />
                    </div>
                    <div className="pitbull-footer">
                      <p>#{item?.current_token_data?.token_name}</p>
                      <p>{item.pick}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(tokens.length / itemsPerPage)}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default Token;
