"use client";
import {
  Box,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
  useTheme,
  Grid,
  IconButton,
  Dialog,
  Stack,
} from "@mui/material";
import {
  isRedirectable,
  useWallet,
  Wallet,
  WalletReadyState,
  WalletName,
} from "@aptos-labs/wallet-adapter-react";
import { grey } from "./aptosColorPalette";
import { LanOutlined as LanOutlinedIcon } from "@mui/icons-material";
import { PropsWithChildren } from "react";
import WalletButton from "./WalletButton";

const ConnectWalletRow: React.FC<{
  wallet: Wallet;
  onClick(): void;
}> = ({ wallet, onClick }) => {
  const theme = useTheme();
  return (
    <ListItem disablePadding >
      <ListItemButton
        alignItems="center"
        disableGutters
        onClick={() => onClick()}
        sx={{
          background: "white",
          padding: "1rem 1rem",
          borderRadius: `${theme.shape.borderRadius}px`,
          display: "flex",
          gap: "1rem",
          '&:hover': {
            background: "white",
          },
        }}
      >
        <ListItemAvatar
          sx={{
            display: "flex",
            alignItems: "center",
            width: "2rem",
            height: "2rem",
            minWidth: "0",
            // color: `${theme.palette.text.primary}`,
          }}
        >
          <Box
            component="img"
            src={wallet.icon}
            sx={{ width: "100%", height: "100%" }}
          />
        </ListItemAvatar>
        <ListItemText
          primary={wallet.name}
          primaryTypographyProps={{
            fontSize: 18,
          }}
        />
        <Button
          style={{ backgroundColor: "blue", color: "white" }}
          size="small"
        >
          Connect
        </Button>
      </ListItemButton>
    </ListItem>
  );
};

const InstallWalletRow: React.FC<{ wallet: Wallet }> = ({ wallet }) => {
  const theme = useTheme();

  return (
    <ListItem
      alignItems="center"
      sx={{
        borderRadius: `${theme.shape.borderRadius}px`,
        background: "white",
        padding: "1rem 1rem",
        gap: "1rem",
      }}
    >
      <ListItemAvatar
        sx={{
          display: "flex",
          alignItems: "center",
          width: "2rem",
          height: "2rem",
          minWidth: "0",
          opacity: "0.25",
        }}
      >
        <Box
          component="img"
          src={wallet.icon}
          sx={{ width: "100%", height: "100%" }}
        />
      </ListItemAvatar>
      <ListItemText
        sx={{
          opacity: "0.25",
        }}
        primary={wallet.name}
        primaryTypographyProps={{
          fontSize: 18,
        }}
      />
      <Button
        LinkComponent={"a"}
        href={wallet.url}
        target="_blank"
        size="small"
        className="wallet-connect-install"
      >
        Install
      </Button>
    </ListItem>
  );
};

type WalletsModalProps = {
  handleClose: () => void;
  modalOpen: boolean;
  networkSupport?: string;
  handleNavigate: () => void;
  handleModalOpen: () => void;
};

export default function WalletsModalHome({
  handleClose,
  modalOpen,
  handleNavigate,
  networkSupport,
  handleModalOpen
}: WalletsModalProps): JSX.Element {
  const { wallets, connect } = useWallet();
  const theme = useTheme();
  const onWalletSelect = (walletName: WalletName) => {
    connect(walletName);
  };
  const renderWalletsList = () => {
    return wallets?.map((wallet) => {
      const hasMobileSupport = Boolean(wallet.deeplinkProvider);
      const isWalletReady =
        wallet.readyState === WalletReadyState.Installed ||
        wallet.readyState === WalletReadyState.Loadable;

      const Container: React.FC<PropsWithChildren> = ({ children }) => {
        return (
          <Grid xs={12} paddingY={0.5} item>
            {children}
          </Grid>
        );
      };

      // The user is on a mobile device
      if (!isWalletReady && isRedirectable()) {
        // If the user has a deep linked app, show the wallet
        if (hasMobileSupport) {
          return (
            <Container key={wallet.name}>
              <ConnectWalletRow
                wallet={wallet}
                onClick={() => connect(wallet.name)}
              />
            </Container>
          );
        }

        // Otherwise don't show anything
        return null;
      }

      // The user is on a desktop device
      return (
        <Container key={wallet.name}>
          {isWalletReady ? (
            <ConnectWalletRow
              wallet={wallet}
              onClick={() => onWalletSelect(wallet.name)}
            />
          ) : (
            <InstallWalletRow wallet={wallet} />
          )}
        </Container>
      );
    });
  };

  return (
    <Box sx={{
      mb: 2,
      mt: 8,
      display: "flex",
      flexDirection: "column",
      height: 500,
      overflow: "hidden",
      // overflowY: "scroll",
      // justifyContent="flex-end" # DO NOT USE THIS WITH 'scroll'
    }}>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          top: "50%",
          left: "50%",
          boxShadow: 24,
          p: 3,
        }}
      >
        <WalletButton method="notification" handleModalOpen={() => { }} handleNavigate={handleNavigate} />
        {/* <Typography style={{ color: "white" }} align="center" variant="h5" pt={2}>
          Connect Wallet
        </Typography> */}
        <Box
          sx={{
            display: "flex",
            gap: 0.5,
            alignItems: "center",
            justifyContent: "center",
            mb: 4,
          }}
        >
          {networkSupport && (
            <>
              <LanOutlinedIcon
                sx={{
                  fontSize: "0.9rem",
                  color: grey[400],
                }}
              />
              <Typography
                sx={{
                  display: "inline-flex",
                  fontSize: "0.9rem",
                  color: grey[400],
                }}
                align="center"
              >
                {networkSupport} only
              </Typography>
            </>
          )}
        </Box>
        <Box>{renderWalletsList()}</Box>
      </Box>
    </Box>
  );
}
