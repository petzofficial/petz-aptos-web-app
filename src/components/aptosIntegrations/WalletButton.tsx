"use client"
import { Avatar, Button, Typography } from "@mui/material";
import { useState } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import WalletMenu from "./WalletMenu";
import React from "react";
import { truncateAddress } from "./utils";
import { AccountBalanceWalletOutlined as AccountBalanceWalletOutlinedIcon } from "@mui/icons-material";
import { storeAccountInLocalStorage } from "../utils/account";
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
  console.log(account)
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

  if (connected) {
    storeAccountInLocalStorage(account, connected);
  }
  return (
    <>
      <Button
        size="large"
        variant="contained"
        onClick={connected ? handleClick : onConnectWalletClick}
        className="user-icon font-bold"
        sx={{
          borderRadius: "10px",
          "&:hover": {
            backgroundColor: "#FF6900",
          },
          backgroundColor: "#FF6900"
        }}
      >
        {connected ? (
          <>

            <Typography noWrap ml={2}>
              connected
            </Typography>
          </>
        ) : (
          <>
            <Typography noWrap>Connect </Typography>
          </>
        )}
      </Button>
      <WalletMenu
        popoverAnchor={popoverAnchor}
        handlePopoverClose={handlePopoverClose}
        handleNavigate={handleNavigate}
      />
    </>
  );
}
