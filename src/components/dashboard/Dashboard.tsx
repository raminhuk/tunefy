'use client';

import { useUserStore } from "../../store/userStore";


export default function Dashboard() {
    const { user } = useUserStore();


    return (
        <>
            <div className="max-w-5xl w-11/12 mx-auto mt-8">
                {user && (
                    <>{user.display_name}</>
                )}
            </div>
        </>
    )
}