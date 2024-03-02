import './globals.css'
import type { Metadata } from 'next'
import { Montserrat, Poppins, Roboto_Condensed } from 'next/font/google'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import CookieBanner from '../components/BannerCookies'
import GoogleAnalytics from '../components/analytics/GoogleAnalytics'

export const GA_TRACKING_ID: string | undefined = process.env.NEXT_PUBLIC_GOOGLE_ID;

const poppins = Poppins({
    weight: ['200', '400', '600', '800'],
    subsets: ['latin'],
})

const roboto = Montserrat({
    weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: 'Tunefy',
    description: 'Discover your top songs, artists, and genres on Tunefy, your personalized guide to the best of music on Spotify',
    icons: {
        icon: [
            {
                media: '(prefers-color-scheme: light)',
                url: '/favicon.ico',
                href: '/favicon.ico',
            },
            {
                media: '(prefers-color-scheme: dark)',
                url: '/favicon.ico',
                href: '/favicon.ico',
            },
        ],
    },
    creator: 'Fabio J Raminhuk',
    twitter: {
        site: '@fabio_rmk',
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="pt-BR">
            {GA_TRACKING_ID && (
                <GoogleAnalytics GA_MEASUREMENT_ID={GA_TRACKING_ID}/>
            )}
            <meta name="theme-color" content="#080010"/>
            <body className={`min-h-screen ${roboto.className}`}>
                <ToastContainer />
                <Header />
                <div className="min-h-[calc(100vh_-_88px)]">
                    {children}
                </div>
                <Footer/>
                <CookieBanner/>
            </body>
        </html>
    )
}
