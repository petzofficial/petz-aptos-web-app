"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Pagination from "../button/Pagination";
import CircularIndeterminate from "@/components/common/loading";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import {
  fetchTokensAction,
  selectNewNetwork,
} from "@/redux/app/reducers/AccountSlice";
import emptyImage from "@/assets/without/empty.png";
import { useAppSelector, useAppDispatch } from "@/redux/app/hooks";
import "@/style/account/token.scss";
const Token = ({ tokens, isLoading }) => {
  const itemsPerPage = 8; // Change this to the number of items you want to display per page
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useAppDispatch();
  const { account } = useWallet();
  const newNetwork = useAppSelector(selectNewNetwork);
  const router = useRouter();

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTokens = tokens?.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    dispatch(fetchTokensAction(account?.address));
  }, [dispatch, account, newNetwork]);

  if (isLoading) {
    return (
      <div className="account-transactions py-12">
        <CircularIndeterminate />
      </div>
    );
  } else if (!isLoading && tokens?.length === 0) {
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
      <div className="account-token  max-md:pt-5 md:pt-10">
        <div className="pick-cards grid max-lg:grid-cols-2 lg:grid-cols-4 justify-between items-center">
          {currentTokens?.map((item, id) => {
            return (
              <div
                key={id}
                className="box shadow-md m-auto my-[10px]"
                onClick={() =>
                  router.push(`/nft/${item.last_transaction_version}`)
                }
              >
                <div className="image flex justify-center items-center">
                  <Image src={item.image} width={86} height={117} alt="petz" />
                </div>
                <div className="pitbull-footer">
                  <p>#{item?.current_token_data?.token_name}</p>
                  <p>{item.pick}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="marketplace_button  mt-8 mb-8 flex items-center justify-center">
          <span className="marketPlace flex items-center justify-center  font-bold cursor-pointer">
            NFT Marketplace
          </span>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(tokens?.length / itemsPerPage)}
          onPageChange={handlePageChange}
        />
      </div>
    );
  }
};

export default Token;
