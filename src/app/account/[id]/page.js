"use client";

import React from "react";
import { CiShare1 } from "react-icons/ci";
import GoBackBtn from "@/components/button/GoBackBtn";
import Link from "next/link";
import "@/style/account/transaction.scss";
import { Outfit } from "next/font/google";
import { useParams } from "next/navigation";
const outfit = Outfit({ subsets: ["latin"] });
import { useEffect, useState } from "react";
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
import { truncateAddress2 } from "@/components/aptosIntegrations/utils";
import { Tooltip } from "@mui/material";
import { IoCopy } from "react-icons/io5";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import CircularIndeterminate from "@/components/common/loading";
const Page = () => {
  const { connected } = useWallet();
  const account = useAppSelector(selectAccount);
  console.log("this is account from select account");
  console.log(account);
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const specificTransaction = useAppSelector(selectSpecificTransaction);
  const transactions = useAppSelector(selectTransactions);
  const isLoading = useAppSelector(selectIsSingleTransactionLoading);
  console.log(specificTransaction);
  const copyAddress = async (e) => {
    await navigator.clipboard.writeText(account?.address);
    setTooltipOpen(true);

    setTimeout(() => {
      setTooltipOpen(false);
    }, 2000);
  };
  useEffect(() => {
    dispatch(fetchSpecificTransactionAction(id));
    if (account && !specificTransaction && id) {
      dispatch(fetchTransactionsAction(account?.address));
    }
    dispatch(fetchTransactionsBlockAction(id));
  }, [account, transactions]);

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
                  <button className="flex items-center gap-2">
                    View on Explorer <CiShare1 />{" "}
                  </button>
                </div>
                <div>
                  <p>Version</p>
                  <span>{specificTransaction?.version}</span>
                </div>

                <div>
                  <p>Date</p>
                  <p>{formatDateTime3(specificTransaction?.timestamp)}</p>
                </div>
                <div>
                  <p>Function</p>
                  <span>
                    {specificTransaction?.payload?.function?.split("::").pop()}
                  </span>
                </div>
                <div>
                  <p>Status</p>
                  <span>
                    {specificTransaction?.status
                      ? "Confirmed"
                      : " Not confirmed"}
                  </span>
                </div>
                <div>
                  <p>Max Gas Amount</p>
                  <span>
                    {calculateInverseWithDecimals(
                      specificTransaction?.max_gas_amount,
                      8
                    )}{" "}
                    APT
                  </span>
                </div>
                <div>
                  <p>Gas Unit Price</p>
                  <span>
                    {calculateInverseWithDecimals(
                      specificTransaction?.gas_unit_price,
                      8
                    )}{" "}
                    APT
                  </span>
                </div>
                <div>
                  <p>Balance Changes</p>
                  <span>
                    {`+  ${specificTransaction?.changes?.length} APT`}{" "}
                  </span>
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
