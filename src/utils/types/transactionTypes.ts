// ********************************
export interface Payload {
  function: string;
}
export interface TransactionType {
  version: string;
  timestamp: string;
  hash: string;
  payload: Payload;
}
// ********************************
