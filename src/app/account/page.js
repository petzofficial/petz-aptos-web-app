"use client";
import GoBackBtn from "@/components/button/GoBackBtn";
import Link from "next/link";
import React, { useContext, useMemo, useState } from "react";
import CreateIcon from "@mui/icons-material/Create";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import "@/style/account/account.scss";
import "@/style/profile/profile.scss";

import { TbCircleLetterT } from "react-icons/tb";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import HistoryIcon from "@mui/icons-material/History";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { IoCopy } from "react-icons/io5";
import Token from "@/components/account/Token";
import Transactions from "@/components/account/Transactions";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useEffect } from "react";
import {
  fetchTransactionsAction,
  selectNewNetwork,
  selectTransactions,
  fetchTokensAction,
  selectTokens,
  fetchCoinsAction,
  selectCoins,
  selectIsCoinsLoading,
  selectIsTransactionLoading,
  selectIsTokenLoading,
  fetchNftImgAction,
} from "@/redux/app/reducers/AccountSlice";
import { useAppSelector, useAppDispatch } from "@/redux/app/hooks";
import Coins from "@/components/coins/coin";
import { AppContext } from "@/components/aptosIntegrations/AppContext";
import { Avatar, Tooltip } from "@mui/material";
import { truncateAddress } from "@/components/aptosIntegrations/utils";
import { getUserData } from "../../utils/localDB";
import LinearProgressEnergy from "@/components/common/linearProgress";
import ProfileComp from "@/components/profile/profile";
import SignupComp from "@/components/signup/signup";
import EditProfileComp from "@/components/EditProfile/editProfile";
import ActivityComp from "@/components/activity/activity";
import RefferalComp from "@/components/refferal/refferal";
import { TaskContext } from "../task/context/taskContext";
const outfit = Outfit({ subsets: ["latin"] });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

const Page = () => {
  const { slug, setSlug } = useContext(TaskContext);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const newNetwork = useAppSelector(selectNewNetwork);
  const transactions = useAppSelector(selectTransactions);

  const coins = useAppSelector(selectCoins);
  const coinsLoading = useAppSelector(selectIsCoinsLoading);
  const transactionLoading = useAppSelector(selectIsTransactionLoading);
  const tokenLoading = useAppSelector(selectIsTokenLoading);
  const tokens = useAppSelector(selectTokens);

  const { connected, account, wallet } = useWallet();
  const filteredToken = tokens?.filter(
    (x) =>
      x.current_token_data?.current_collection?.collection_name !==
      "PetZ NFT Collection"
  );

  const userData = getUserData();
  const dispatch = useAppDispatch();
  let energy = 0;
  if (userData) {
    energy = userData.energy;
  }
  const copyAddress = async (e) => {
    await navigator.clipboard.writeText(account?.address);
    setTooltipOpen(true);

    setTimeout(() => {
      setTooltipOpen(false);
    }, 2000);
  };
  useEffect(() => {
    dispatch(fetchTransactionsAction(account?.address));
    dispatch(fetchCoinsAction(account?.address));
  }, [dispatch, account, newNetwork]);

  const tokensNeedImages = useMemo(() => {
    return tokens?.some((token) => !token?.image);
  }, [tokens, filteredToken]);

  useEffect(() => {
    if (tokensNeedImages) {
      tokens.forEach((token) => {
        if (!token?.image) {
          const tokenURI = token?.current_token_data?.token_uri;
          dispatch(
            fetchNftImgAction(tokenURI, token?.last_transaction_version)
          );
        }
      });
    }
  }, [dispatch, tokensNeedImages]);
  if (slug === "profile") {
    // return <EditProfileComp />;
    return <SignupComp />;

    // return <ProfileComp />;
  } else if (slug === "signup") {
  } else if (slug === "activity") {
    return <ActivityComp />;
  } else if (slug === "refferal") {
    return <RefferalComp />;
  }
  console.log(slug);
  return (
    <AppContext>
      <div>
        <section className="account">
          <div className="addcontainer 2xl:px-5 lg:px-14 md:px-10 sm:px-6 max-sm:px-3">
            <div className="account-top">
              <div className="xl:w-[250px] lg:w-[200px] max-md:m-auto">
                <Link href={"/home"} className="text-[30px] font-bold">
                  <GoBackBtn />
                </Link>

                <div className="token-trans-btn ">
                  <button
                    className={`${
                      slug === "token" ? "bg-[#FEE4D1] text-[#FF6900]" : ""
                    }`}
                    onClick={() => setSlug("token")}
                  >
                    <TbCircleLetterT /> <span>Token</span>
                  </button>
                  <button
                    className={`${
                      slug === "transactions"
                        ? "bg-[#FEE4D1] text-[#FF6900]"
                        : ""
                    }`}
                    onClick={() => setSlug("transactions")}
                  >
                    <FaArrowRightArrowLeft /> <span>Transactions</span>
                  </button>
                  <button
                    className={`${
                      slug === "profile" ? "bg-[#FEE4D1] text-[#FF6900]" : ""
                    }`}
                    onClick={() => setSlug("profile")}
                  >
                    <Avatar style={{ height: "25px", width: "25px" }} />{" "}
                    <span>Profile</span>
                  </button>
                  <button
                    className={`${
                      slug === "activity" ? "bg-[#FEE4D1] text-[#FF6900]" : ""
                    }`}
                    onClick={() => setSlug("activity")}
                  >
                    <HistoryIcon />
                    <span>Activity</span>
                  </button>
                  <button
                    className={`${
                      slug === "refferal" ? "bg-[#FEE4D1] text-[#FF6900]" : ""
                    }`}
                    onClick={() => setSlug("refferal")}
                  >
                    <ThumbUpOffAltIcon />
                    <span>Referral</span>
                  </button>
                  {/* <span className="marketPlace flex items-center justify-center  font-bold cursor-pointer">
                    NFT Marketplace
                  </span> */}
                </div>
              </div>
              <div className="max-width m-auto lg:mt-[-400px]">
                <h2 className={`flex justify-center ${outfit.className}`}>
                  Account
                </h2>
                <Coins
                  isLoading={coinsLoading}
                  connected={connected}
                  coins={coins}
                />
                <div className="first-box flex justify-between items-center mt-5 max-sm:!px-[5px]">
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
                <div className="first-box mt-5">
                  <div className="box-inner flex items-center mt-3">
                    <div className="skill flex-1">
                      <p className="">Level</p>
                      <div className="skill-bar skill2 wow slideInLeft animated">
                        <span className="skill-count2"></span>
                      </div>
                    </div>
                    <h4 className={`ml-3 -mt-2 font-bold ${jakarta.className}`}>
                      0
                    </h4>
                  </div>
                  <div className="box-inner flex  justify-center items-center ">
                    <div
                      suppressHydrationWarning={true}
                      className=" mr-1  font-semibold flex-1 items-start gap-0 flex   flex-col"
                    >
                      <p className="">Energy</p>
                      <LinearProgressEnergy jakarta={jakarta} energy={energy} />
                    </div>
                    <h4
                      suppressHydrationWarning={true}
                      className={` mt-4  font-bold ${jakarta.className}`}
                    >
                      {energy ? energy : 0}
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            <div className="account-inner">
              {slug === "token" ? (
                <Token isLoading={tokenLoading} tokens={tokens} />
              ) : (
                ""
              )}
              {slug === "transactions" ? (
                <Transactions
                  transactions={transactions}
                  isLoading={transactionLoading}
                />
              ) : (
                ""
              )}
            </div>
          </div>
        </section>
      </div>{" "}
    </AppContext>
  );
};

export default Page;
