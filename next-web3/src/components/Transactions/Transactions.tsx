import {useContext} from "react";

import {TransactionContext} from "@/Context/TransactionContext";
import {shortenAddress} from "@/Utils/shortenAddress";
import useFetch from "@/hooks/useFetch";

import dummyData from "@/Utils/dummyData";

const TransactionsCard = ({addressTo, addressFrom, timestamp, message, amount, keyword}: any) => {
    const gifUrl: string = useFetch({keyword});
    return (
        <div className='bg-[#181918] m-4 flex flex-1
        2xl:min-w-[450px]
        2xl:max-w-[500px]
        sm:min-w-[270px]
        sm:max-w-[300px]
        flex-col p-3 rounded-md hover:shadow-2xl
        '>
            <div className='flex flex-col items-center w-full mt-3'>
                <div className='w-full mb-6 p-2'>
                    <a href={`https://sepolia.etherscan.io/tx/${addressFrom}`} target='_blank' rel='noreferrer'>
                        <p className='text-white text-base'>Form: {shortenAddress(addressFrom)}</p>
                    </a>
                    <a href={`https://sepolia.etherscan.io/tx/${addressTo}`} target='_blank' rel='noreferrer'>
                        <p className='text-white text-base'>To: {shortenAddress(addressTo)}</p>
                    </a>
                    <p className='text-white text-base'>Amount: {amount}ETH</p>
                    {
                        message && (
                            <>
                                <br/>
                                <p className='text-white text-base'>Message: {message}</p>
                            </>
                        )
                    }
                    <div>
                        <img src={gifUrl} className='w-full h-64 2x:h-96 rounded-md shadow-lg object-cover' alt="gif"/>
                        <div className='bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl mx-auto'>
                            <p className='text-[#37c7da] font-bold'>{timestamp}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


const Transactions = () => {
    const { connectWallet, currentAccount, formData, handleChange, sendTransaction, transactions } = useContext(TransactionContext) as any;

    return(
        <div className='flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions'>
            <div className='flex flex-col md:p-12 py-12 px-4'>

                <h3 className='text-white text-3xl text-center my-2'>
                    {
                        currentAccount ? 'LeaTest  Transactions' : 'Connect your account to see latest transactions'
                    }
                </h3>
              {/*LeaTest  Transactions*/}
              {/*Connect your account to see latest transactions */}
                <div className='flex flex-wrap justify-center items-center mt-10'>
                    {
                        transactions.reverse().map((item: any, i: number) => (
                            <TransactionsCard key={i} {...item}/>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Transactions;
