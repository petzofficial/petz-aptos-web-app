"use client";
import { createSlice, createSelector } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Network, Provider } from "aptos";
import axios from "axios";
import { getWalletNetwork } from "@/utils/aptosNetWorks/AptosNetworks";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isValidUrl } from "@/utils/reUseAbleFunctions/reuseAbleFunctions";
import {
  CoinsTypes,
  // CurrentFungibleAssetBalance,
  // Data,
} from "@/utils/types/coinsTypes";
const provider = new Provider(Network.TESTNET);

export interface AccountState {
  account: any;
  transactions: Array<any>;
  coins: Array<CoinsTypes>;
  tokens: Array<any>;
  balanceDetails: Array<any>;
  specificTransaction: object;
  specificToken: object;
  specificTokenNftImg: object;
  transactionBlock: object;
  network: string;
  isLoadingTransactions: boolean;
  isLoadingSingleTransaction: boolean;
  isLoadingTokens: boolean;
  isLoadingSingleToken: boolean;
  isLoadingCoins: boolean;
  isLoadingSingleCoin: boolean;
}

const initialState: AccountState = {
  account: null!,
  transactions: [],
  coins: [],
  tokens: [],
  balanceDetails: [],
  specificTransaction: {},
  specificToken: {},
  specificTokenNftImg: {},
  transactionBlock: {},
  network: "",
  isLoadingTransactions: false,
  isLoadingSingleTransaction: false,
  isLoadingTokens: false,
  isLoadingSingleToken: false,
  isLoadingCoins: false,
  isLoadingSingleCoin: false,
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setTransactions: (state, action: PayloadAction<any>) => {
      state.isLoadingTransactions = action.payload.isLoading;
      state.transactions = action.payload.data;
      state.isLoadingTransactions = action.payload.isLoading;
    },
    setAccount: (state, action: PayloadAction<any>) => {
      state.account = action.payload;
    },
    setCoins: (state, action: PayloadAction<any>) => {
      state.isLoadingCoins = action.payload.isLoading;
      state.coins = action.payload.data?.current_fungible_asset_balances;
      state.isLoadingCoins = action.payload.isLoading;
    },
    setTokens: (state, action: PayloadAction<any>) => {
      state.isLoadingTokens = action.payload?.isLoading;
      state.tokens = action.payload.data?.current_token_ownerships_v2;
      state.isLoadingTokens = action.payload?.isLoading;
    },
    setBalanceDetails: (state, action: PayloadAction<any>) => {
      state.balanceDetails = action.payload;
    },
    setSpecificTransaction: (state, action: PayloadAction<any>) => {
      state.specificTransaction = action.payload;
    },
    setSpecificToken: (state, action: PayloadAction<any>) => {
      state.specificToken = action.payload;
    },
    setTransactionBlock: (state, action: PayloadAction<any>) => {
      state.transactionBlock = action.payload;
    },
    setNewNetwork: (state, action: PayloadAction<any>) => {
      state.network = action.payload;
    },
    setSpecificTokenNftImg: (state, action: PayloadAction<any>) => {
      const { tokenId, image, attributes } = action.payload;
      state.tokens = state.tokens.map((token) => {
        if (token.last_transaction_version === +tokenId) {
          return { ...token, image, attributes };
        }
        return { ...token };
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setBalanceDetails,
  setTransactions,
  setAccount,
  setCoins,
  setTokens,
  setSpecificTransaction,
  setSpecificToken,
  setSpecificTokenNftImg,
  setTransactionBlock,
  setNewNetwork,
} = accountSlice.actions;

export const selectTransactions = (state: RootState) =>
  state?.account?.transactions;

export const selectAccount = (state: RootState) => state.account.account;
export const selectCoins = (state: RootState) => state.account.coins;
export const selectTokens = (state: RootState) => state.account.tokens;
export const selectBalanceDetails = (state: RootState) =>
  state.account.balanceDetails;

export default accountSlice.reducer;

export const selectSpecificTransaction = (state: RootState) =>
  state.account.specificTransaction;

export const selectSpecificTokenNftImg = (state: RootState) =>
  state.account.specificTokenNftImg;
export const selectTransactionBlock = (state: RootState) =>
  state.account.transactionBlock;
export const selectNewNetwork = (state: RootState) => state.account.network;

export const selectSpecificToken = (tokenId: string) =>
  createSelector([selectTokens], (tokens) => {
    const specificTokenResponse = tokens.find(
      (token: any) => token?.last_transaction_version === +tokenId
    );

    return specificTokenResponse;
  });

export const selectIsCoinsLoading = (state: RootState) =>
  state.account.isLoadingCoins;
export const selectIsTransactionLoading = (state: RootState) =>
  state.account.isLoadingTransactions;
export const selectIsTokenLoading = (state: RootState) =>
  state.account.isLoadingTokens;
// export const fetchSpecificTokenAction =
//   (tokenVersion: any) => (dispatch: any, getState: () => RootState) => {
//     const tokens = getState().account.tokens;

//     const imgUrl = specificTokenResponse?.current_token_data?.token_uri;
//     console.log("specificTokenResponseFromSlice", imgUrl);
//     dispatch(setSpecificToken(specificTokenResponse));
//     dispatch(setImgUrl(imgUrl));
//   };

// const fetchList = async () => {
//   if (!account) return [];
//   try {
//     const coinResource = await provider.getAccountResource(
//       account?.address,
//       `${moduleAddress}::coin::CoinStore<${moduleAddress}::aptos_coin::AptosCoin>`
//     );

//     const nftResource = await provider.getOwnedTokens(account?.address);

//     const faResource = await provider.getAccountCoinsData(account?.address);

//     const resource = await provider.getAccountResources(account?.address);
//   } catch (e: any) {}
// };

//     const coinResource = await provider.getAccountResource(
//       account?.address,
//
//     );

export const fetchTransactionsAction =
  (address: string) => async (dispatch: any, getState: () => RootState) => {
    if (!address) {
      return;
    }
    const provider = getWalletNetwork(getState().account.network);
    try {
      dispatch(setTransactions({ isLoading: true }));
      const transactionResource = await provider.getAccountTransactions(
        address
      );
      dispatch(
        setTransactions({ data: transactionResource, isLoading: false })
      );
    } catch (e: any) {
      toast.error(e?.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      dispatch(setTransactions([]));
    }
  };
export const fetchCoinsAction =
  (address: string) => async (dispatch: any, getState: () => RootState) => {
    if (!address) {
      return;
    }
    const provider = getWalletNetwork(getState().account.network);
    try {
      dispatch(setCoins({ isLoading: true }));
      const faResource: any = await provider.getAccountCoinsData(address);
      dispatch(setCoins({ data: faResource, isLoading: false }));
    } catch (e: any) {
      toast.error(e?.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      dispatch(setCoins([]));
    }
  };

export const fetchTokensAction =
  () => async (dispatch: any, getState: () => RootState) => {
    const { account } = getState().account;

    if (!account || !account.address) {
      console.log("Address Not Found.");
      return;
    }

    const provider = getWalletNetwork(getState().account.network);
    try {
      dispatch(setTokens({ isLoading: true }));
      const nftResource: any = await provider.getOwnedTokens(account.address);
      dispatch(setTokens({ isLoading: false, data: nftResource }));
    } catch (e: any) {
      dispatch(setTokens([]));
      toast.error(e?.message);
      dispatch(setTokens({ isLoading: false }));
    }
  };

export const fetchBalanceDetailsAction =
  (address: string) => async (dispatch: any, getState: () => RootState) => {
    if (!address) {
      return;
    }
    const moduleAddress = "0x1";
    const provider = getWalletNetwork(getState().account.network);
    try {
      const coinResource: any = await provider.getAccountResource(
        address,
        `${moduleAddress}::coin::CoinStore<${moduleAddress}::aptos_coin::AptosCoin>`
      );
      dispatch(setBalanceDetails(coinResource));
    } catch (e) {
      console.log(e);
    }
  };

export const fetchSpecificTransactionAction =
  (transactionVersion: number) =>
  (dispatch: any, getState: () => RootState) => {
    const transactions = getState().account.transactions;
    if (!transactionVersion) {
      return;
    }
    try {
      const specificTransactionResponse = transactions.find(
        (transaction: any) => transaction?.version === transactionVersion
      );
      dispatch(setSpecificTransaction(specificTransactionResponse));
    } catch (e) {
      console.log(e);
    }
  };

export const fetchNftImgAction =
  (tokenUri: string, tokenId: number) => async (dispatch: any) => {
    if (isValidUrl(tokenUri) === false) {
      return;
    }
    try {
      const { data } = await axios.get(`/api/image?tokenUrl=${tokenUri}`);
      dispatch(
        setSpecificTokenNftImg({
          tokenId,
          image: data.image,
          attributes: data.attributes,
        })
      );
    } catch (error) {
      console.error(">> Error fetching nft imgs :", error);
    }
  };

export const fetchTransactionsBlockAction =
  (version: number) => async (dispatch: any, getState: () => RootState) => {
    if (!version) {
      return;
    }

    const provider = getWalletNetwork(getState().account.network);
    try {
      const transactionBlockResponse: any = await provider.getBlockByVersion(
        version
      );
      dispatch(setTransactionBlock(transactionBlockResponse));
    } catch (e) {
      console.log(e);
    }
  };
