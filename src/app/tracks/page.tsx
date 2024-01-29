import { Metadata } from "next";
import Tracks from "../../components/track/Tracks";

export const metadata: Metadata = {
    title: 'Top Songs - Tunefy',
    description: 'The most listened to by you on Spotify',
}

export default function Page() {

    return <><Tracks/></>;
}
