import { WebBundlr } from '@bundlr-network/client';
import { useToast } from '@chakra-ui/react';
import BigNumber from 'bignumber.js';
import { providers, utils } from 'ethers';
import React, { createContext, useContext, useEffect, useState } from 'react';

const BundlrContext = createContext({
    initialiseBundlr: async () => { },
    fundWallet: (_) => { },
    balance: '',
    uploadFile: async (_file) => { },
    bundlrInstance: null
});

const BundlrContextProvider = ({ children }) => {
    const toast = useToast()
    //const [bundlrInstance, setBundlrInstance] = useState<WebBundlr>();
    const [bundlrInstance, setBundlrInstance] = useState();
    //const [balance, setBalance] = useState<string>('');
    const [balance, setBalance] = useState("");
    
    useEffect(() => {
        if (bundlrInstance) {
            fetchBalance();
        }
    }, [bundlrInstance])

    /*
    useEffect(async () => {
        if (!bundlrInstance) {
            await initializeBundlr();
        } else {
            fetchBalance();
        }
    }, [bundlrInstance])*/

    const initializeBundlr = async () => {
        const provider = new providers.Web3Provider(window.ethereum);
        await provider._ready();
        const bundlr = new WebBundlr(
            "https://devnet.bundlr.network",
            "matic",
            provider,
            {
                providerUrl:
                    process.env.ALCHEMY_MUMBAI_URL,
            }
        );
        await bundlr.ready();
        setBundlrInstance(bundlr);
    }

    async function fundWallet(amount) {
        try {
            if (bundlrInstance) {
                if (!amount) return
                const amountParsed = parseInput(amount)
                if (amountParsed) {
                    toast({
                        title: "Adding funds please wait",
                        status: "loading"
                    })
                    let response = await bundlrInstance.fund(amountParsed)
                    console.log('Wallet funded: ', response)
                    toast({
                        title: "Funds added",
                        status: "success"
                    })
                }
                fetchBalance()
            }
        } catch (error) {
            console.log("error", error);
            toast({
                title: error.message || "Something went wrong!",
                status: "error"
            })
        }
    }
    
    function parseInput(input) {
        const conv = new BigNumber(input).multipliedBy(bundlrInstance.currencyConfig.base[1])
        if (conv.isLessThan(1)) {
            console.log('error: value too small');
            toast({
                title: "Error: value too small",
                status: "error"
            })
            return
        } else {
            return conv
        }
    }

    async function fetchBalance() {
        if (bundlrInstance) {
            const bal = await bundlrInstance.getLoadedBalance();
            console.log("bal: ", utils.formatEther(bal.toString()));
            setBalance(utils.formatEther(bal.toString()));
        }
    }

    async function uploadFile(file) {
        try {
            let tx = await bundlrInstance.uploader.upload(file, [{ name: "Content-Type", value: "image/png" }])
            return tx;
        } catch (error) {
            toast({
                title: error.message || "Something went wrong!",
                status: "error"
            })
        }
    }
    return (
        <BundlrContext.Provider value={{ initializeBundlr, fundWallet, balance, uploadFile, bundlrInstance }}>
            {children}
        </BundlrContext.Provider>
    )
}
export default BundlrContextProvider;
export const useBundler = () => {
    return useContext(BundlrContext);
}