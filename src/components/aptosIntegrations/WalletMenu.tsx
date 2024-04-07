"use client"
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Popover,
  Tooltip,
} from "@mui/material";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

type WalletMenuProps = {
  popoverAnchor: HTMLButtonElement | null;
  handlePopoverClose: () => void;
  handleNavigate?: () => void;
};

export default function WalletMenu({
  popoverAnchor,
  handlePopoverClose,
  handleNavigate,
}: WalletMenuProps): JSX.Element {
  const router = useRouter()
  const { account, disconnect } = useWallet();
  const popoverOpen = Boolean(popoverAnchor);
  const id = popoverOpen ? "wallet-popover" : undefined;

  const onAccountOptionClicked = () => {
    router.push("/account")
    handlePopoverClose();
  };

  const handleLogout = () => {
    disconnect();
    handlePopoverClose();
    localStorage.removeItem("account")
    localStorage.removeItem("AptosWalletName")
    window.location.reload();
  };

  const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);

  const copyAddress = async (event: React.MouseEvent<HTMLDivElement>) => {
    await navigator.clipboard.writeText(account?.address!);

    setTooltipOpen(true);

    setTimeout(() => {
      setTooltipOpen(false);
    }, 2000);
  };

  return (
    <Popover
      id={id}
      open={popoverOpen}
      anchorEl={popoverAnchor}
      onClose={handlePopoverClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <List>

        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Popover>
  );
}
