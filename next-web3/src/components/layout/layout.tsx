import {Footer, Header, Welcome} from "@/components";


export default function Layout({ children }: any) {
    return (
        <main className='min-h-screen'>
            {children}
            <Footer />
        </main>
    )
}
