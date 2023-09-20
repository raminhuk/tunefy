'use client'
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { } from "react-icons";
import { BiUser } from "react-icons/bi";
import Link from "next/link";
import { getSpotifyAccessToken } from "../auth/spotifyToken";
import { useUserStore } from "../store/userStore";
import api from "../libs/api";

export default function User() {
    const { user, setUser } = useUserStore();

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);


    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const closeDropdown = () => {
        setIsDropdownOpen(false);
    };


    useEffect(() => {
        const token = getSpotifyAccessToken();

        if (token) {
            const getUserData = async () => {
                try {
                    const response = await api(`me`);
                    setUser(response.data);
                } catch (error: any) {
                    localStorage.removeItem('access_token');
                    console.log(error)
                }
            };
            getUserData();
        }
    }, []);
    return (
        <>
            <div className="cursor-pointer relative rounded-full -outline-offset-1 hover:outline-2 hover:outline hover:outline-gray-400 " onMouseEnter={toggleDropdown} onMouseLeave={closeDropdown}>
                <div className="flex rounded-full overflow-hidden items-center gap-3 text-xs">
                    <div className="w-10 h-10">
                        {user ? (
                            <Image
                                src={user.images[0].url}
                                alt={user.display_name}
                                width={64}
                                height={64}
                                className="w-full h-full object-cover cursor-pointer"
                            />
                        ) : (
                            <div className="w-10 h-10 flex justify-center items-center bg-gray-200 rounded-full">
                                <BiUser size={20} color="#333333" />
                            </div>
                        )}
                    </div>
                </div>

                {isDropdownOpen && (
                    <div className="absolute top-0 right-0 pt-14">
                        <div className="relative text-black w-48 text-xs bg-white border border-gray-200 rounded shadow-md">
                            <span className="rounded-sm absolute rotate-45 -top-1 right-1.5 w-6 h-6 bg-white"></span>
                            <p className="font-semibold p-3">Olá, {user?.display_name}</p>
                            <hr />
                            <ul>
                                <li>
                                    <Link className="flex px-3 py-2 hover:bg-gray-200" href="/dashboard">Dashboard</Link>
                                </li>
                                <li>
                                    {user ? (
                                        <a className="flex px-3 py-2 hover:bg-gray-200" href="/" onClick={() => { localStorage.removeItem('access_token') }}>
                                            Logout
                                        </a>
                                    ) : (
                                        <Link className="flex px-3 py-2 hover:bg-gray-200" href="/tracks">
                                            Login
                                        </Link>
                                    )}
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>


        </>

    )
}