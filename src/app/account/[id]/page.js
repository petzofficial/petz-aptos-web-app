"use client";

import React from "react";
import { FaRegTimesCircle } from "react-icons/fa";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

import { CiShare1 } from "react-icons/ci";
import GoBackBtn from "@/components/button/GoBackBtn";
import Link from "next/link";
import "@/style/account/transaction.scss";
import { Outfit } from "next/font/google";
import { useParams } from "next/navigation";
const outfit = Outfit({ subsets: ["latin"] });
import { useEffect } from "react";
import {
  selectAccount,
  fetchTransactionsAction,
  selectNewNetwork,
  fetchSpecificTransactionAction,
  fetchTransactionsBlockAction,
  selectTransactions,
  selectSpecificTransaction,
  selectIsSingleTransactionLoading,
} from "@/redux/app/reducers/AccountSlice";
import { useAppSelector, useAppDispatch } from "@/redux/app/hooks";
import { calculateInverseWithDecimals } from "../../../components/common/transaction";
import { formatDateTime3 } from "@/components/common/dateTime";

import { useWallet } from "@aptos-labs/wallet-adapter-react";
import CircularIndeterminate from "@/components/common/loading";
import { convertToOctal } from "@/utils/reUseAbleFunctions/reuseAbleFunctions";
const Page = () => {
  const { network } = useWallet();

  const account = useAppSelector(selectAccount);

  const { id } = useParams();
  const dispatch = useAppDispatch();
  const newNetwork = useAppSelector(selectNewNetwork);

  const specificTransaction = useAppSelector(selectSpecificTransaction);
  const transactions = useAppSelector(selectTransactions);
  const isLoading = useAppSelector(selectIsSingleTransactionLoading);

  useEffect(() => {
    dispatch(fetchSpecificTransactionAction(id));
    if (account && !specificTransaction && id) {
      dispatch(fetchTransactionsAction(account?.address));
    }
    dispatch(fetchTransactionsBlockAction(id));
  }, [account, transactions]);
  console.log(specificTransaction);
  return (
    <div>
      <section className="transaction-details">
        {isLoading ? (
          <CircularIndeterminate />
        ) : (
          <div className="addcontainer 2xl:px-5 lg:px-14 md:px-10 sm:px-6 max-sm:px-3">
            <Link href={"/"} className="text-[30px] font-bold">
              <GoBackBtn />
            </Link>

            <div className="transaction-inner">
              <h3 className={outfit.className}>Transaction</h3>

              <div className="trans-body mb-10">
                <div>
                  <a
                    href={`https://explorer.aptoslabs.com/txn/${specificTransaction?.version}?network=${newNetwork}`}
                    target="_"
                  >
                    <button className="flex items-center gap-2">
                      View on Explorer <CiShare1 />{" "}
                    </button>
                  </a>
                </div>
                <div>
                  <p>Version</p>
                  <span>{specificTransaction?.version}</span>
                </div>

                <div>
                  <p>Timestamp</p>
                  <p>{formatDateTime3(specificTransaction?.timestamp)}</p>
                </div>

                <div>
                  <p>Status</p>
                  <span>
                    {specificTransaction?.success ? (
                      <IoIosCheckmarkCircleOutline color="green" />
                    ) : (
                      <FaRegTimesCircle color="red" />
                    )}
                  </span>
                </div>
                <div>
                  <p>Gas used</p>
                  <span>
                    {convertToOctal(specificTransaction?.gas_used)} APT
                  </span>
                </div>
                <div>
                  <p>Gas Unit Price</p>
                  <span>{specificTransaction?.gas_unit_price}</span>
                </div>
                <div>
                  <p>Function</p>
                  <span>
                    {specificTransaction?.payload?.function?.split("::").pop()}
                  </span>
                </div>
                <div>
                  <p>Balance Changes</p>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Page;
