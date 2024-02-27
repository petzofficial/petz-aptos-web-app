import { Box } from "@mui/material";
import { negativeColor } from "./colors";
import APTCurrencyValue from "./currentValue";
function getAptChangeData(change) {
  console.log("this is change");
  console.log(change);
  if (
    "address" in change &&
    "data" in change &&
    "type" in change.data &&
    change.data.type === "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>" &&
    "data" in change.data
  ) {
    return JSON.parse(JSON.stringify(change.data.data));
  } else {
    return undefined;
  }
}
function isAptEvent(event, transaction) {
  const changes = "changes" in transaction ? transaction.changes : [];

  const aptEventChange = changes.filter((change) => {
    if ("address" in change && change.address === event.guid.account_address) {
      const data = getAptChangeData(change);
      if (data !== undefined) {
        const eventCreationNum = event.guid.creation_number;
        let changeCreationNum;
        if (event.type === "0x1::coin::DepositEvent") {
          changeCreationNum = data.deposit_events.guid.id.creation_num;
        } else if (event.type === "0x1::coin::WithdrawEvent") {
          changeCreationNum = data.withdraw_events.guid.id.creation_num;
        }
        if (eventCreationNum === changeCreationNum) {
          return change;
        }
      }
    }
  });

  return aptEventChange.length > 0;
}
export function normalizeAddress(address) {
  return "0x" + address.substring(2).padStart(64, "0");
}

function getBalanceMap(transaction) {
  const events = "events" in transaction ? transaction.events : [];

  const accountToBalance = events.reduce((balanceMap, event) => {
    const addr = normalizeAddress(event.guid.account_address);

    if (
      event.type === "0x1::coin::DepositEvent" ||
      event.type === "0x1::coin::WithdrawEvent"
    ) {
      // deposit and withdraw events could be other coins
      // here we only care about APT events
      if (isAptEvent(event, transaction)) {
        if (!balanceMap[addr]) {
          balanceMap[addr] = { amount: BigInt(0), amountAfter: "" };
        }

        const amount = BigInt(event.data.amount);

        if (event.type === "0x1::coin::DepositEvent") {
          balanceMap[addr].amount += amount;
        } else {
          balanceMap[addr].amount -= amount;
        }
      }
    }

    return balanceMap;
  }, {});

  return accountToBalance;
}
export function getTransactionAmount(transaction) {
  console.log(transaction);
  if (transaction.type !== "user_transaction") {
    return undefined;
  }

  const accountToBalance = getBalanceMap(transaction);
  console.log(accountToBalance);
  const [totalDepositAmount, totalWithdrawAmount] = Object.values(
    accountToBalance
  ).reduce(
    ([totalDepositAmount, totalWithdrawAmount], value) => {
      if (value.amount > 0) {
        totalDepositAmount += value.amount;
      }
      if (value.amount < 0) {
        totalWithdrawAmount -= value.amount;
      }
      return [totalDepositAmount, totalWithdrawAmount];
    },
    [BigInt(0), BigInt(0)]
  );

  return totalDepositAmount > totalWithdrawAmount
    ? totalDepositAmount
    : totalWithdrawAmount;
}
export function TransactionAmountRow({ transaction }) {
  const amount = getTransactionAmount(transaction);

  return (
    <span>
      <APTCurrencyValue amount={amount.toString()} />
    </span>
  );
}
export function getCoinBalanceChangeForAccount(transaction, address) {
  const accountToBalance = getBalanceMap(transaction);
  console.log(accountToBalance);
  if (!accountToBalance.hasOwnProperty(address)) {
    return BigInt(0);
  }
  const accountBalance = accountToBalance[address];
  console.log(accountBalance.amount);
  return accountBalance.amount;
}

export function TransactionAmount({ transaction, address }) {
  const isAccountTransactionTable = typeof address === "string";

  if (isAccountTransactionTable) {
    const amount = getCoinBalanceChangeForAccount(transaction, address);
    if (amount !== undefined) {
      let amountAbs = amount;
      let color = undefined;
      if (amount > 0) {
        color = aptosColor;
      } else if (amount < 0) {
        color = negativeColor;
        amountAbs = -amount;
      }

      return (
        <Box sx={{ color: color }}>
          {amount > 0 && <>+</>}
          {amount < 0 && <>-</>}
          <APTCurrencyValue amount={amountAbs.toString()} />
        </Box>
      );
    }
  } else {
    const amount = getTransactionAmount(transaction);
    if (amount !== undefined) {
      return (
        <Box>
          <APTCurrencyValue amount={amount.toString()} />
        </Box>
      );
    }
  }

  return null;
}
