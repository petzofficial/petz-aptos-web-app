// ****************************

export interface CurrentTokenData {
  token_name: string;
  current_collection: CurrentCollection;
}

export interface CurrentCollection {
  collection_name: string;
}

export interface TokenTypes {
  property_version_v1: number;
  table_type_v1: string;
  amount: number;
  current_token_data: CurrentCollection;
}
