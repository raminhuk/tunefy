'use client'
import { useEffect, useState } from "react";
import api from "../services/api/api";
import Image from "next/image";

export default function User() {
    const [user, setUser] = useState<any>();
    useEffect(() => {
        const getUser = async () => {

            const response = await api.get('me');
            const { data } = response;
            setUser(data);
        }
        getUser();
        console.log(user);
    }, []);
    return (
        <>
            {user && (
                <div className="flex items-center gap-3 text-xs">
                    <span>Olá, {user?.display_name}</span>
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                        <Image 
                            src={user?.images[0].url} 
                            alt="Fabio"
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <p className="text-lg"></p>
                </div>
            )}
        </>
        
    )
}