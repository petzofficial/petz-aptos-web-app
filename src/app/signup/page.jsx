"use client";
import { useEffect, useState } from "react";
import { AptosClient } from "aptos";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

const Page = () => {
  const [data, setData] = useState({
    username: "",
    name: "",
    email: "",
  });
  const NODE_URL = "https://fullnode.testnet.aptoslabs.com";
  const client = new AptosClient(NODE_URL);
  const moduleAddress =
    "0x82afe3de6e9acaf4f2de72ae50c3851a65bb86576198ef969937d59190873dfd";
  const [transactionInProgress, setTransactionInProgress] = useState(false);
  const [accountHasProfile, setAccountHasProfile] = useState(false);
  const { account, signAndSubmitTransaction } = useWallet();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const getProfile = async () => {
    if (!account) return;
    try {
      const payload = {
        function: `${moduleAddress}::user::get_profile`,
        type_arguments: [],
        arguments: [account.address],
      };

      const response = await client.view(payload);
      if (response.length > 0) {
        setData({
          username: response[0].username,
          name: response[0].name,
          email: response[0].email,
        });
        setAccountHasProfile(true);
      } else {
        setAccountHasProfile(false);
      }
    } catch (error) {}
  };

  const signUp = async (e) => {
    e.preventDefault();
    if (!account) return;
    setTransactionInProgress(true);
    const payload = {
      data: {
        type: "entry_function_payload",
        function: `${moduleAddress}::user::signup`,
        type_arguments: [],
        functionArguments: [data.username, data.email, data.name],
      },
    };
    try {
      const response = await signAndSubmitTransaction(payload);
      await client.waitForTransaction(response.hash);
      setAccountHasProfile(true);
    } catch (error) {
      setAccountHasProfile(false);
    } finally {
      setTransactionInProgress(false);
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    if (!account) return;
    setTransactionInProgress(true);
    const payload = {
      type: "entry_function_payload",
      function: `${moduleAddress}::user::update_profile`,
      arguments: [data.name, data.email, data.username],
      type_arguments: [],
    };
    try {
      const response = await signAndSubmitTransaction(payload);
      await client.waitForTransaction(response.hash);
      setAccountHasProfile(true);
    } catch (error) {
      setAccountHasProfile(false);
    } finally {
      setTransactionInProgress(false);
    }
  };

  useEffect(() => {
    if (account?.address) {
      getProfile();
    }
  }, [account?.address]);

  return (
    <div className="h-screen pt-32 flex justify-center">
      <form
        className="flex flex-col gap-2"
        onSubmit={accountHasProfile ? updateProfile : signUp}
      >
        <input
          onChange={handleChange}
          type="text"
          placeholder="username"
          name="username"
          value={data.username}
          className="border p-2"
        />
        <input
          onChange={handleChange}
          type="email"
          placeholder="email"
          name="email"
          value={data.email}
          className="border p-2"
        />
        <input
          onChange={handleChange}
          type="text"
          name="name"
          placeholder="name"
          value={data.name}
          className="border p-2"
        />
        <button type="submit" className="border p-2 bg-blue-500 text-white">
          {transactionInProgress
            ? accountHasProfile
              ? "Updating..."
              : "Signing up..."
            : accountHasProfile
            ? "Update Profile"
            : "Signup"}
        </button>
      </form>
    </div>
  );
};

export default Page;
