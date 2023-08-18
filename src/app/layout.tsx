import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import Header from '../components/Header'

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
                <Header/>
                {children}
            </body>
        </html>
    )
}
