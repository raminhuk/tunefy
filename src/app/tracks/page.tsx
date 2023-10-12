import { Metadata } from "next";
import Tracks from "../../components/track/Tracks";

export const metadata: Metadata = {
    title: 'Top Músicas - Tunefy',
    description: 'As mais ouvidas por você no Spotify',
}

export default function Page() {

    return <><Tracks/></>;
}
