'use client';
import React, { useEffect } from 'react';

type CallbackPageProps = {
    setAccessToken: React.Dispatch<React.SetStateAction<string>>;
};

const CallbackPage = ({ setAccessToken }: CallbackPageProps) => {

    useEffect(() => {
        const hashParams = new URLSearchParams(window.location.hash.substr(1));
        const token = hashParams.get('access_token');

        if (token) {
            localStorage.setItem("access_token", token);
        }
        window.location.href = 'tracks'
    }, []);

    return (
        <div>Autenticando...</div>
    );
};

export default CallbackPage;