import {SiEthereum} from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import {shortenAddress} from "@/Utils/shortenAddress";
import {Loader} from "@/components";
import {TransactionContext} from "@/Context/TransactionContext";
import {useContext} from "react";

const commonStyle = 'min-h-[70px] sm:p-0 px-2 sm:min-w[120px] flex justify-center  items-center border-[0.5px] border-gray-400 text-sm font-light text-white'

const Input = ({placeholder, name, type, handleChange, value}: {placeholder: string, name: string, type: string, handleChange: Function, value?: any}) => (
    <input
        step="0.0001"
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => handleChange(e, name)}
        name={name}
        className='my-2 w-full rounded-sm p-2 outline-none focus:outline-none bg-transparent text-white border-none text-sm white-glassmorphism'
    />
)

const Welcome = () => {
    const { connectWallet, currentAccount, formData, handleChange, sendTransaction, Loading } = useContext(TransactionContext) as any;

    const getconnectWallet = async () => {
        console.log(1);
        connectWallet()
    }


    const handlessubmit = async (event: any) => {
        const {addressTo, amount, keyword, message } = formData;
        event.preventDefault();
        if (!addressTo || !amount || !keyword || !message) return console.log('Please fill in all fields');
        sendTransaction()
    }

    const isLoading = false;


    return(
        <div className='flex w-full justify-center items-center'>
            <div className='flex mf:flex-row flex-col items-start justify-between md:p-20 py-2 px-4'>
                <div className='flex flex-1 justify-start flex-col mf:mr-10'>
                    <h1 className='text-3xl sm:text-5xl text-white text-gradient py-1'>
                        Send Crypto
                        <br/>across the world
                    </h1>
                    <p className='text-left mt-5 text-white font-light md:9/12 w-11/12 text-base'>
                        Explore the crypto world. By and sell cryptocurrency easily and Krypto.
                    </p>
                    {!currentAccount && (<button
                        className='flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full  cursor-pointer'
                        type='button'
                        onClick={() => getconnectWallet()}>
                        <p className='text-white text-base font-semibold'>Connect Wallet</p>
                    </button>)}
                    <div className='grid sm:grid-cols-3 grid-cols-2 w-full mt-10'>
                        <div className={`rounded-tl-2xl ${commonStyle}`}>
                            Reliability
                        </div>
                        <div className={commonStyle}>
                            Security
                        </div>
                        <div className={`rounded-tr-2xl ${commonStyle}`}>
                            Ethereum
                        </div>
                        <div className={`rounded-bl-2xl ${commonStyle}`}>
                            Web 3.0
                        </div>
                        <div className={commonStyle}>
                            Low Fees
                        </div>
                        <div className={`rounded-br-2xl ${commonStyle}`}>
                            Blockchain
                        </div>
                    </div>
                </div>

                <div className='flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10'>
                    <div className='p-3 justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card white-glassmorphism'>
                        <div className='flex justify-between flex-col w-full  h-full'>
                            <div className='flex justify-between items-start'>
                                <div className='w-10 h-10 rounded-full border-2 border-white flex justify-center items-center'>
                                    <SiEthereum fontSize={21} color={'#fff'} />
                                </div>
                                <BsInfoCircle fontSize={17} color={'#fff'} />
                            </div>
                            <div>
                                <p className='text-white font-light text-sm'>
                                    {shortenAddress(currentAccount)}
                                </p>
                                <p className='text-white font-semibold text-lg mt-1'>
                                    Ethereum
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className='p-5 sm:w-96 w-full flex flex-col justify-center blue-glassmorphism'>
                        <Input placeholder='Address To' name='addressTo' type={'text'} handleChange={handleChange}/>
                        <Input placeholder='Amount (ETH)' name='amount' type={'number'} handleChange={handleChange}/>
                        <Input placeholder='Keyword (Gif)' name='keyword' type={'text'} handleChange={handleChange}/>
                        <Input placeholder='Enter Message' name='message' type={'text'} handleChange={handleChange}/>
                        <div className='h-[1px] w-full bg-gray-400 my-2'/>
                        {
                            Loading ? (
                                <Loader/>
                            ) : (
                                <button
                                    type='button'
                                    className='text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer'
                                    onClick={handlessubmit}>
                                    Send Now
                                </button>
                            )
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Welcome;
