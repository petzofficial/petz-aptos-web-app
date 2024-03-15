"use client"
import { Aptos, AptosConfig, Network, } from "@aptos-labs/ts-sdk";
import {
    useWallet, InputTransactionData,

} from "@aptos-labs/wallet-adapter-react";
import { AptosClient } from "aptos";

import { useEffect, useState } from "react";
export const NODE_URL = "https://fullnode.testnet.aptoslabs.com";
export const client = new AptosClient(NODE_URL);
console.log(client)
// change this to be your module account address
export const moduleAddress =
    "0x8cb5e9980ab5dc8abc45edcfac0e46cdcbead3e7ec9661a4a464fa7091c5f77a";

const Page = () => {
    const { account, signAndSubmitTransaction, } = useWallet();
    const [transactionInProgress, setTransactionInProgress] = useState(false)
    console.log("having account ok done")
    console.log(account)
    const aptosConfig = new AptosConfig({ network: Network.TESTNET });
    const [accountHasList, setAccountHasList] = useState<boolean>(false);
    const aptos = new Aptos(aptosConfig);

    const fetchTasks = async () => {
        if (!account) return [];
        try {
            const todoListResource = await client.getAccountResource(
                account?.address,
                `${moduleAddress}::task3::TaskManager`
            );
            setAccountHasList(true);
            console.log(todoListResource)
            // tasks table handle
            const tableHandle = (todoListResource as any).data.tasks.handle;
            // tasks table counter
            const taskCounter = (todoListResource as any).data.set_task_event.counter;

            //const eventResource = await client.getEventsByEventHandle(tableHandle);

            console.log(taskCounter)
            /*   const tableItem = {
                key_type: "u64",
                value_type: `${moduleAddress}::todolist::Task`,
                key: "0x49d2b46aeb9d79937334cbd5c8c3847c1aa0a11a7a4d74a82a12b94661dc2a4c",
              };
              const taskResource = await client.getTableItem(tableHandle, tableItem);
              console.log(taskResource) */

            let tasks = [];
            let counter = 1;
            while (counter <= taskCounter) {
                console.log(counter)
                const tableItem = {
                    key_type: "u64",
                    value_type: `${moduleAddress}::task3::Task`,
                    key: `${counter}`,
                };
                // console.log(tableHandle,"task tableHandle")
                // console.log(tableItem,"task item")
                const task = await client.getTableItem(tableHandle, tableItem);

                console.log(task, "task")
                tasks.push(task);
                console.log("these are tasks")
                console.log(tasks)
                counter++;
            }
            // set tasks in local state
            //setTasks(tasks);
        } catch (e: any) {
            setAccountHasList(false);
        }
    };
    useEffect(() => {
        console.log("use effect is called")
        fetchTasks()
    }, [account?.address])

    const addTask = async () => {
        if (!account) return [];
        setTransactionInProgress(true);
        // build a transaction payload to be submited
        const payload = {
            type: "entry_function_payload",
            function: `${moduleAddress}::task3::add_task`,
            type_arguments: [],
            arguments: ["hello", "world", 1, 1],
        };
        try {
            // sign and submit transaction to chain
            console.log("add task function is called ")
            const response = await signAndSubmitTransaction(payload);
            console.log("this is response")
            // wait for transaction
            console.log(response)
            const transaction = await client.waitForTransaction(response.hash);
            console.log("this is transaction")
            console.log(transaction)
            setAccountHasList(true);
        } catch (error: any) {
            setAccountHasList(false);
        } finally {
            setTransactionInProgress(false);
        }
    };
    return (
        <div className="h-screen pt-32">
            <p className="text-black">hallo wolrd</p>
            <h2>this is my app</h2>
            <button onClick={addTask} className=" border border-black">submit transaction</button>
        </div>
    )
}
export default Page