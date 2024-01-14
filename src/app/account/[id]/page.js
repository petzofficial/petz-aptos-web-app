"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import GoBackBtn from "@/components/button/GoBackBtn";
import Link from "next/link";
import React from "react";
import "../../../style/account/transaction.scss";
import { Outfit } from "next/font/google";
import { useParams } from "next/navigation";
import { getFormattedDateTime } from "@/components/common/datetime";
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
import { formatTimestamp } from "@/utils/reUseAbleFunctions/reuseAbleFunctions";

const Page = () => {
  const newNetwork = useAppSelector(selectNewNetwork);
  const account = useAppSelector(selectAccount);
  console.log("this is account from select account");
  console.log(account);
  const { id } = useParams();
  const dispatch = useAppDispatch();
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
                  <p>Version</p>
                  <span>{specificTransaction?.version}</span>
                </div>
                <div>
                  <p>Timestamp</p>
                  <p>{formatTimestamp(specificTransaction?.timestamp)}</p>
                </div>
                <div>
                  <p>Status</p>
                  <span>Confirmed</span>
                </div>
                <div>
                  <p>Gas Used</p>
                  <span>{specificTransaction?.gas_used}</span>
                </div>
                <div>
                  <p>Gast Unit Price</p>
                  <span>{specificTransaction?.gas_unit_price}</span>
                </div>
                <div>
                  <p>type</p>
                  <span>{specificTransaction?.type}</span>
                </div>
                <div>
                  <p>vm_status</p>
                  <span>{specificTransaction?.vm_status}</span>
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
