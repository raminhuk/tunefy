import { Metadata } from "next";
import Artists from "../../components/artist/Artists";

export const metadata: Metadata = {
    title: 'Top Artists - Tunefy',
    description: 'Your most listened to artists on Spotify',
}

export default function Page() {
    
  return <><Artists/></>
}
