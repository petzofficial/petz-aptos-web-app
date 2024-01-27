import { HexString, MaybeHexString } from "aptos";

// export interface Root {
//   data: Data;
// }

// export interface Data {
//   current_fungible_asset_balances: CurrentFungibleAssetBalance[];
// }

// export interface CurrentFungibleAssetBalance {
//   current_fungible_asset_balances: any;
//   amount: number;
//   asset_type: string;
//   is_frozen: boolean;
//   is_primary: boolean;
//   last_transaction_timestamp: string;
//   last_transaction_version: number;
//   owner_address: string;
//   storage_id: string;
//   token_standard: string;
//   metadata: Metadata;
//   address: HexString;
// }

// export interface GetAccountCoinsDataQuery {
//   __typename?: "current_fungible_asset_balances";
//   amount: any;
//   asset_type: string;
//   is_frozen: boolean;
//   is_primary: boolean;
//   last_transaction_timestamp: any;
//   last_transaction_version: any;
//   owner_address: string;
//   storage_id: string;
//   token_standard: string;
//   metadata?: Metadata;
// }
// *************Types Being used***************

export interface Metadata {
  symbol: string;
  name: string;
  icon_uri: string
  // asset_type: string;
}

export interface CoinsTypes {
  amount: number;
  asset_type: string;
  metadata: Metadata;
}
