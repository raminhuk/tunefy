'use client';

import Image from "next/image";
import { useUserStore } from "../../store/userStore";


export default function Dashboard() {
    const { user } = useUserStore();


    return (
        <>
            <div className="max-w-5xl w-11/12 mx-auto mt-8">
                <div className="flex justify-center">
                    {user && (
                        <div className="flex flex-col items-center">
                            <div className="flex rounded-full overflow-hidden items-center gap-3 text-xs bg-gradient-to-r from-customPink to-customBlue p-0.5">
                                <div className="lg:w-40 lg:h-40 w-40 h-40 rounded-full overflow-hidden">

                                    <Image
                                        src={user.images[1].url}
                                        alt={user.display_name}
                                        width={160}
                                        height={160}
                                        className="w-full h-full object-cover cursor-pointer"
                                    />
                                </div>
                            </div>
                            <span className="lg:text-4xl text-lg font-semi tracking-wide pt-4">{ user.display_name }</span>
                            <span className="lg:text-xl text-gray-400">#{ user.id }</span>
                        </div>
                    )}
                </div>
                
            </div>
        </>
    )
}