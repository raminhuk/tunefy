import { Metadata } from "next";
import Recently from "../../components/recently/Recently";

export const metadata: Metadata = {
    title: 'Últimas ouvidas - Tunefy',
    description: 'As últimas ouvidas por você no Spotify',
}

export default function Page() {
    return <><Recently/></>
}