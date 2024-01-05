"use client"
import { BloctoWallet } from "@blocto/aptos-wallet-adapter-plugin";
import { MartianWallet } from "@martianwallet/aptos-wallet-adapter";
import { PetraWallet } from "petra-plugin-wallet-adapter";
import { PontemWallet } from "@pontem/wallet-adapter-plugin";
import { TrustWallet } from "@trustwallet/aptos-wallet-adapter";

import {
    AptosWalletAdapterProvider,
    NetworkName,
} from "@aptos-labs/wallet-adapter-react";
import { AutoConnectProvider, useAutoConnect } from "./AutoConnectProvider";
import { FC, ReactNode } from "react";
// import face from "./lib/faceInitialization";
import { AlertProvider, useAlert } from "./AlertProvider";
import { IdentityConnectWallet } from "@identity-connect/wallet-adapter-plugin";

const WalletContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const { autoConnect } = useAutoConnect();
    const { setErrorAlertMessage } = useAlert();

    const wallets = [
        // TODO IdentityConnectWallet and BloctoWallet to use Network enum from @aptos-labs/ts-sdk
        // new IdentityConnectWallet("57fa42a9-29c6-4f1e-939c-4eefa36d9ff5", {
        //     networkName: NetworkName.Testnet,
        // }),
        // Blocto supports Testnet/Mainnet for now.
        new BloctoWallet({
            network: NetworkName.Testnet,
            bloctoAppId: "6d85f56e-5f2e-46cd-b5f2-5cf9695b4d46",
        }),
        // new FaceWallet(face!),

        new MartianWallet(),

        new PetraWallet(),
        new PontemWallet(),

        new TrustWallet(),

    ];
    return (
        <AptosWalletAdapterProvider
            plugins={wallets}
            autoConnect={true}
            onError={(error) => {
                console.log("Custom error handling", error);
                setErrorAlertMessage(error);
            }}
        >
            {children}
        </AptosWalletAdapterProvider>
    );
};

export const AppContext: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <AutoConnectProvider>
            <AlertProvider>
                <WalletContextProvider>
                    {children}
                </WalletContextProvider>
            </AlertProvider>
        </AutoConnectProvider>
    );
};
