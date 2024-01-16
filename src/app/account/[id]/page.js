"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import GoBackBtn from "@/components/button/GoBackBtn";
import Link from "next/link";
import React from "react";
import "../../../style/account/transaction.scss";
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
import { formatTimestamp } from "@/utils/reUseAbleFunctions/reuseAbleFunctions";
import { calculateInverseWithDecimals } from "../../../components/common/transaction";
import { formatDateTime2 } from "@/components/common/dateTime2";
import { truncateAddress } from "@/components/aptosIntegrations/utils";
import { Tooltip } from "@mui/material";
import { IoCopy } from "react-icons/io5";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
const Page = () => {
  const { connected } = useWallet();
  const newNetwork = useAppSelector(selectNewNetwork);
  const account = useAppSelector(selectAccount);
  console.log("this is account from select account");
  console.log(account);
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const specificTransaction = useAppSelector(selectSpecificTransaction);
  const transactions = useAppSelector(selectTransactions);
  const isLoading = useAppSelector(selectIsSingleTransactionLoading);
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

  console.log("specific transactions");
  console.log(specificTransaction);

  return (
    <div>
      <Navbar method={"account"} />

      <section className="transaction-details">
        {isLoading ? (
          <CircularIndeterminate />
        ) : (
          <div className="addcontainer 2xl:px-5 lg:px-14 md:px-10 sm:px-6 max-sm:px-3">
            <Link href={"/home"} className="text-[30px] font-bold">
              <GoBackBtn />
            </Link>

            <div className="transaction-inner">
              <h3 className={outfit.className}>Transaction</h3>
              <div className="trans-body mb-10">
                <div>
                  <p>Network fee</p>
                  <span className="flex  items-start justify-start">
                    {" "}
                    {calculateInverseWithDecimals(
                      specificTransaction?.gas_used,
                      8
                    )}
                    APT
                  </span>
                </div>
                <div>
                  <p>version</p>
                  <span className="flex items-start justify-start">
                    {specificTransaction?.version}
                  </span>
                </div>
                <div>
                  <p>sequence number</p>
                  <span className="flex items-start justify-start">
                    {specificTransaction?.sequence_number}
                  </span>
                </div>
                <div>
                  <p>Date</p>
                  <p className="flex items-start justify-start">
                    {formatDateTime2(specificTransaction?.timestamp)}
                  </p>
                </div>
                <div>
                  <p>Gas used</p>
                  <p className="flex items-start justify-start">
                    {" "}
                    {calculateInverseWithDecimals(
                      specificTransaction?.gas_used,
                      8
                    )}
                    APT
                  </p>
                </div>
                <div>
                  <p>Max gas amount</p>
                  <p className="flex items-start justify-start">
                    {" "}
                    {calculateInverseWithDecimals(
                      specificTransaction?.max_gas_amount,
                      8
                    )}
                    APT
                  </p>
                </div>
                <div>
                  <p>sender</p>
                  <div className="flex items-start justify-start">
                    <p className="max-sm:text-[12px]">
                      {connected ? (
                        <>{truncateAddress(account?.address)}</>
                      ) : (
                        <>not connected</>
                      )}
                    </p>
                    <Tooltip
                      title="Copied"
                      placement="bottom-end"
                      open={tooltipOpen}
                      disableFocusListener
                      disableHoverListener
                      disableTouchListener
                    >
                      <button
                        onClick={() => copyAddress()}
                        className="text-[#FF6900]"
                      >
                        <IoCopy />
                      </button>
                    </Tooltip>
                  </div>
                </div>

                <div>
                  <p>Status</p>
                  <span className="flex items-start justify-start">
                    {specificTransaction?.status
                      ? "Confirmed"
                      : " Not confirmed"}
                  </span>
                </div>
                <div>
                  <p>Gast Unit Price</p>
                  <p className="flex items-start justify-start">
                    {" "}
                    {calculateInverseWithDecimals(
                      specificTransaction?.gas_unit_price,
                      8
                    )}
                    APT{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Page;
