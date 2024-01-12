"use client";
import { Network, Provider } from "aptos";

const TESTNET_CLIENT = new Provider(Network.TESTNET);
const MAINNET_CLIENT = new Provider(Network.MAINNET);
const DEVNET_CLIENT = new Provider(Network.DEVNET);

export const getWalletNetwork = (switchedNetWork: string): Provider => {
  if (switchedNetWork === "Mainnet") {
    return MAINNET_CLIENT;
  } else if (switchedNetWork === "Testnet") {
    return TESTNET_CLIENT;
  } else {
    return DEVNET_CLIENT;
  }
};
