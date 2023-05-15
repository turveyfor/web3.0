import {createContext, useContext, useEffect, useState} from "react";

import {ethers} from "ethers";
import {ConstantAbi, ConstantAddress} from "@/Utils/Constant";

// @ts-ignore
export const TransactionContext = createContext();


// 获取以太坊合约
function getEthereumConstant() {
    if (window) {
        const {ethereum} = window as any;

    }

    const provider = new ethers.providers.Web3Provider((window as any).ethereum);
    const signer = provider.getSigner();
    const transaction = new ethers.Contract(ConstantAddress, ConstantAbi, signer);
    console.log({
        provider,
        signer,
        transaction
    })
    return transaction;
}

function setCurrentAccount(data: string) {

}

export function ThemeProvider({children}: { children: any }) {
    // const {ethereum} = window as any;
    const [transactionCount, setTransactionCount] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const [Loading, setLoading] = useState(false);
    const [currentAccount, setCurrentAccount] = useState<string | null>('');
    const [formData, serFormData] = useState({
        addressTo: '',
        amount: '',
        keyword: '',
        message: ''
    })
    const handleChange = (e: any, name: string) => {
        serFormData(prevState => ({...prevState, [name]: e.target.value}));
    }

    // 获取所有交易
    const getAllTransactions = async () => {
        try {
            if (!(window as any).ethereum) return console.log('请安装metamask');
            const transaction = getEthereumConstant();
            const availableTransactions = await transaction.getAllTransactions();
            console.log(availableTransactions);
            const structAvailableTransactions = availableTransactions.map((transaction: any) => {
                return {
                    addressTo: transaction.receiver,
                    addressFrom: transaction.sender,
                    message: transaction.message,
                    keyword: transaction.keyword,
                    amount: parseInt(transaction.amount._hex) / (10 ** 18),
                    timestamp: new Date(transaction.timestamp * 1000).toLocaleString()
                }
            });
            console.log(structAvailableTransactions);
            setTransactions(structAvailableTransactions);
        } catch (e) {
            console.log(e);
        }
    }

    // 检查钱包是否连接 以及是否有交易 以及获取所有交易
    const checkIfWalletIsConnected = async () => {
        try {
            if (!(window as any).ethereum) return console.log('请安装metamask');
            const accounts = await (window as any).ethereum.request({method: 'eth_accounts'});
            console.log(accounts);
            if (accounts.length) {
                setCurrentAccount(accounts[0]);
                getAllTransactions();
            } else {
                console.log('no account found');
            }
        } catch (e) {
            console.log(e);
            throw new Error('no ethereum object');
        }

    };

    // 检查是否有交易 以及获取交易数量 以及设置交易数量
    const checkIfTransactionExist = async () => {
        try {
            const transaction = getEthereumConstant();
            const transactionCount = await transaction.getAllTransactionCount();
            localStorage.setItem('transactionCount', transactionCount.toString());
        } catch (e) {
            console.log(e);
            throw new Error('no ethereum object');
        }
    }

    // 连接钱包 以及设置当前钱包地址
    const connectWallet = async () => { // 连接钱包
        console.log(1);
        try {
            if (!(window as any).ethereum) return console.log('请安装metamask');
            const accounts = await (window as any).ethereum.request({method: 'eth_requestAccounts'});
            console.log(accounts);

            setCurrentAccount(accounts[0]);
        } catch (e) {
            console.log(e);
            throw new Error('no ethereum object');
        }
    };

    // 交易 以及设置交易数量 以及获取所有交易
    const sendTransaction = async () => {
        try {
            console.log(currentAccount)
            const {ethereum} = window as any;
            if (!ethereum) return console.log('请安装metamask');
            const { addressTo, amount, keyword, message } = formData;
            console.log(addressTo);
            const transaction = getEthereumConstant();
            const parsedAmount = ethers.utils.parseEther(amount);
            console.log(parsedAmount);
            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: '0x5208',
                    value: parsedAmount._hex,
                }]
            });
            const transactionHash = await transaction.addToBlockchain(addressTo, parsedAmount, message, keyword);
            setLoading(true);
            console.log(`loading ${transactionHash.hash}`);
            await transactionHash.wait();
            setLoading(false);
            console.log(`success ${transactionHash.hash}`);
            const transactionCount = await transaction.getAllTransactionCount();
            setTransactionCount(transactionCount.toNumber());
            getAllTransactions();
        } catch (e) {
            console.log(e);
            throw new Error('no ethereum object');
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
        checkIfTransactionExist();
    }, [])

    const [theme, setTheme] = useState("light");
    const [themeColor, setThemeColor] = useState("#fff");
    return (
        <TransactionContext.Provider value={{
            theme,
            themeColor,
            connectWallet,
            currentAccount,
            handleChange,
            formData,
            setFormData: serFormData,
            sendTransaction,
            transactions,
            Loading
        }}>{children}</TransactionContext.Provider>
    );
}

export function useThemeContext() {
    return useContext(TransactionContext);
}
