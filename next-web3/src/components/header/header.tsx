import {AiOutlineExport} from 'react-icons/ai';
import {useThemeContext} from "@/Context/TransactionContext";
import {SiTailwindcss} from "react-icons/si";

export default function Header() {
    return (
        <header className='min-w-full p-5 text-white'>
            <nav className='2xl mx-auto flex justify-between'>
                <div className='flex-1 flex items-center'>
                    <SiTailwindcss className='text-4xl text-blue-600'/>
                </div>
                <div className='flex-1 md:flex hidden gap-14'>
                    <button className='hover:text-blue-500'>首页</button>
                    <button className='hover:text-blue-500'>列表</button>
                    <button className='hover:text-blue-500'>商品</button>
                </div>
                <div className='flex-1 md:flex hidden justify-end'>
                    <button className='flex items-center'>
                        登录
                        &nbsp;
                        <AiOutlineExport/>
                    </button>
                </div>
            </nav>
        </header>
    )
}
