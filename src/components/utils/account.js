export const getStoredAccountFromLocalStorage = () => {
  const storedAccount = localStorage?.getItem("account");
  if (storedAccount) {
    return JSON.parse(storedAccount);
  }
  return null;
};
export const storeAccountInLocalStorage = (account, connected) => {
  const modifiedAccount = { ...account, connected: connected }; // or false, depending on your requirement
  localStorage?.setItem("account", JSON.stringify(modifiedAccount));
};
