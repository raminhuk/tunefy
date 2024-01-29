import { Metadata } from "next";
import Recently from "../../components/recently/Recently";

export const metadata: Metadata = {
    title: 'Recently Listened - Tunefy',
    description: 'The latest tracks listened to by you on Spotify',
}

export default function Page() {
    return <><Recently/></>
}