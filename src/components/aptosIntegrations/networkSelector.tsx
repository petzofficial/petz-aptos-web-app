import React, { FC, useEffect, useState } from "react";

import {
    selectNewNetwork,
    setNewNetwork,
} from "@/redux/app/reducers/AccountSlice";
import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { setAccount } from "@/redux/app/reducers/AccountSlice";
import { Box, ListItemText, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Networks = [
    {
        name: "Mainnet",
        chainId: 1,
    },
    {
        name: "Testnet",
        chainId: 2,
    },
    {
        name: "Devnet",
        chainId: 80,
    },
];

export const NetworkSelector: FC = () => {
    // *********
    const [openPopper, setOpenPopper] = React.useState(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);
    const prevOpen = React.useRef(openPopper);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current!.focus();
        }

        prevOpen.current = open;
    }, [openPopper]);
    // *******
    const dispatch = useAppDispatch();
    const newNetwork = useAppSelector(selectNewNetwork);
    const { account, network, connected, connect, disconnect, wallet } =
        useWallet();

    useEffect(() => {
        network && dispatch(setNewNetwork(network.name));
    }, [network]);

    useEffect(() => {
        dispatch(setAccount(account || null!));
    }, [account?.address]);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleNetworkChange = (network: string) => {
        dispatch(setNewNetwork(network));
    };
    return (
        <Box
            sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                // typography: "body1",
            }}
        >
            <>
                <div className="navBtn">
                    <Button
                        id="fade-button"
                        aria-controls={open ? "fade-menu3" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : "false"}
                        onClick={handleClick}
                        sx={{
                            color: "#000",
                            textTransform: "capitalize",
                            fontWeight: "500",
                            fontSize: "18px",
                        }}
                        endIcon={<KeyboardArrowDownIcon />}
                    >
                        {newNetwork ? newNetwork : "Networks"}
                    </Button>
                </div>
                <Menu
                    id="fade-menu"
                    MenuListProps={{
                        "aria-labelledby": "fade-button",
                    }}
                    anchorEl={anchorEl}
                    className="walletWrapper"
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Fade}
                    sx={{
                        width: "250px",
                        "&:hover": { borderRadius: "15px" },
                    }}
                >
                    {Networks.map(({ name, chainId }) => (
                        <MenuItem
                            key={chainId}
                            onClick={() => handleNetworkChange(name)}
                            sx={{
                                width: "200px",
                                "&:hover": {
                                    borderRadius: "15px",
                                    backgroundColor: "#e4e4e7",
                                },
                                margin: "0px 10px",
                                color: "#121615",
                                ...(newNetwork === name
                                    ? {
                                        borderRadius: "15px",
                                        backgroundColor: "#f6efef",
                                    }
                                    : {}),
                            }}
                        >
                            <ListItemText>{name}</ListItemText>
                            <Typography variant="body2" color="text.secondary">
                                {chainId}
                            </Typography>
                        </MenuItem>
                    ))}
                </Menu>
            </>
        </Box>

    );
};


