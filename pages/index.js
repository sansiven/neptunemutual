import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useEffect, useRef, useState } from "react";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import { metamask } from "./connectors/Connector";
import ModalForWallet from "./components/Modal";
import Converter from "./components/Converter";

export default function Home() {

    //destructuring objects from useWeb3React library
    const { account, library, chainId, activate, deactivate, error } = useWeb3React();
    const nepref = useRef(null);

    const isUnsupportedChainIdError = error instanceof UnsupportedChainIdError

    //connecting to  a metamsk wallet
    async function connect() {
        try {
            await activate(metamask);
        } catch (error) {
            console.log(error);
        }
    }
    //disconnect from  a metamask wallet
    async function disconnect() {
        try {
            deactivate();
        } catch (error) {
            console.log(error);
        }
    }

    //state to keep track of NEP and BUSD 
    const [nep, setNep] = useState("");
    const [busd, setBusd] = useState("");
    //state to keep track of modal state shown or hidden
    const [isOpen, setIsOpen] = useState(false);
    //state to get the balance
    const [balance, setBalance] = useState();

    //if account and library is present, get balance
    useEffect(() => {

        if(nepref.current){
            nepref.current.focus()
        }
        if (!!account && !!library) {
            let stale = false;
            library.eth
                .getBalance(account)
                .then((balance) => {
                    if (!stale) setBalance(balance);
                })
                .catch(() => {
                    if (!stale) setBalance(null);
                });
            return () => {
                stale = true;
                setBalance(undefined);
            };
        }
    }, [account, library, chainId]);

    const showModal = () => {
        setIsOpen(true);
    };

    const hideModal = () => {
        setIsOpen(false);
    };

    //function to keep track of inputs and convert them to corresponding currencies
    const handleChange = (e) => {
        let target = e.target;
        let id = target.getAttribute("id");

        if (id === "nep") {
            setNep(e.target.value);
            let busd = target.value * 3;
            setBusd(busd.toFixed(2));
        }
        if (id === "busd") {
            setBusd(e.target.value);
            let nep = target.value / 3;
            setNep(nep.toFixed(2));
        }
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Neptune Mutual Assignment</title>
                <meta
                    name="description"
                    content="This app has a converter from NEP to BUSD and vice-versa. It can also connect to your metamask wallet"
                />
                <link rel="icon" href="/favicon.ico" />
                <link
                    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
                    rel="stylesheet"
                    integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
                    crossOrigin="anonymous"
                ></link>
            </Head>
            
            <div className="background">
                <Converter 
                    nepref={nepref}
                    nep={nep}
                    busd={busd}
                    showModal={showModal}
                    handleChange={handleChange}
                />
            </div>
            <ModalForWallet 
                isOpen={isOpen} 
                hideModal={hideModal}
                account={account} 
                chainId={chainId}
                balance={balance}
                connect={connect}
                disconnect={disconnect} 
                errorType={isUnsupportedChainIdError}  
            />
        </div>
    );
}
