'use client';
import Link from 'next/link'
import { useState, useEffect } from 'react';
import { getLocalStorage, setLocalStorage } from './analytics/storageHelper';

export default function CookieBanner() {
    const [cookieConsent, setCookieConsent] = useState(false);

    useEffect(() => {
        const storedCookieConsent = getLocalStorage("cookie_consent", null)

        setCookieConsent(storedCookieConsent)
    }, [setCookieConsent])


    useEffect(() => {
        const newValue = cookieConsent ? 'granted' : 'denied'

        window.gtag("consent", 'update', {
            'analytics_storage': newValue
        });

        setLocalStorage("cookie_consent", cookieConsent)

    }, [cookieConsent]);

    return (
        <div className={`my-8 text-xs md:text-sm w-11/12 max-w-max      md:max-w-screen-md
                        fixed bottom-0 left-0 right-0 m-auto
                        px-3 md:px-5 py-4 justify-between items-center flex-col sm:flex-row gap-5  
                         bg-gray-800 rounded-lg shadow ${cookieConsent != null ? "hidden" : "flex"}` }>

            <div className='flex flex-1 '>
                <div>
                    Accept cookies and have a better experience on our website, please refer to our <Link className="text-sky-400 font-semibold" href="/privacy ">Privacy Policy.</Link>
                </div>
            </div>


            <div className='flex gap-2'>
                <button className='px-5 py-2 text-gray-300 rounded-md border border-gray-700 hover:bg-gray-700' onClick={() => setCookieConsent(false)}>Decline</button>
                <button className='bg-gray-900 px-5 py-2 text-white rounded-lg hover:bg-gray-950' onClick={() => setCookieConsent(true)}>Allow Cookies</button>
            </div>
        </div>
    )
}