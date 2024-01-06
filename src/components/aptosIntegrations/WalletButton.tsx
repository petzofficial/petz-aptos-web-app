"use client"
import { Avatar, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import WalletMenu from "./WalletMenu";
import { AccountAddress } from "@aptos-labs/ts-sdk";

import React from "react";
import { AccountBalanceWalletOutlined as AccountBalanceWalletOutlinedIcon } from "@mui/icons-material";
type WalletButtonProps = {
  handleModalOpen: () => void;
  handleNavigate?: () => void;
  method: string,
};

export default function WalletButton({
  handleModalOpen,
  handleNavigate,
}: WalletButtonProps): JSX.Element {
  const { connected, account, wallet } = useWallet();
  const [popoverAnchor, setPopoverAnchor] = useState<HTMLButtonElement | null>(
    null
  );
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setPopoverAnchor(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setPopoverAnchor(null);
  };

  const onConnectWalletClick = () => {
    handlePopoverClose();
    handleModalOpen();
  };


  return (
    <>
      <button
        onClick={connected ? handleClick : onConnectWalletClick}
        className="user-icon font-bold"
      >
        {connected ? (

          "connected"
        ) : (

          "Connect"

        )}
      </button>
      <WalletMenu
        popoverAnchor={popoverAnchor}
        handlePopoverClose={handlePopoverClose}
        handleNavigate={handleNavigate}
      />
    </>
  );
}
