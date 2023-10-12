import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import Header from '../components/Header'
import Footer from '../components/Footer'
import GoogleAnalytics from '../components/GoogleAnalytics'
// import { CookieBanner } from '../components/CookieBanner'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export const GA_TRACKING_ID: string | undefined = process.env.NEXT_PUBLIC_GOOGLE_ID;

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
            {GA_TRACKING_ID && (
                <GoogleAnalytics GA_MEASUREMENT_ID={GA_TRACKING_ID}/>
            )}
            <body className={`min-h-screen ${poppins.className}`}>
                <ToastContainer />
                <Header />
                <div className="min-h-[calc(100vh_-_88px)]">
                    {children}
                </div>
                <Footer/>
                {/* <CookieBanner/> */}
            </body>
        </html>
    )
}
