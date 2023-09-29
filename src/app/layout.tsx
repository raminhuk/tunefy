import './globals.css'
import type { Metadata } from 'next'
import { Poppins, Nunito_Sans } from 'next/font/google'
import Header from '../components/Header'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../components/Footer'

const poppins = Poppins({
    weight: ['200', '400', '600', '800'],
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: 'Tunefy',
    description: 'Tunefy',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={`min-h-screen ${poppins.className}`}>
                <ToastContainer />
                <Header />
                <div className="min-h-[calc(100vh_-_88px)]">
                    {children}
                </div>
                <Footer/>
            </body>
        </html>
    )
}
